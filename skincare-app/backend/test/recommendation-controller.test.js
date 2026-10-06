const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
function load(prisma, generate) {
  const filename = path.resolve(__dirname, '../src/controllers/recommendationController.js');
  const realRequire = createRequire(filename), module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), { module, exports: module.exports,
    console: { error() {} }, require(name) {
      if (name === '../services/prisma') return prisma;
      if (name === '../services/aiService') return { generateSkincareRecommendation: generate };
      if (name === '../middleware/rateLimits') return { allowGeneration: async () => true };
      return realRequire(name);
    } }, { filename });
  return module.exports;
}
const response = () => ({ statusCode: 200, status(n) { this.statusCode = n; return this; }, json(body) { this.body = body; return this; } });
const profile = { id: 1, updatedAt: new Date('2026-10-01T10:00:00Z') };
test('AI provider authentication failure is not a Corr session failure', async () => {
  for (const providerStatus of [401, 403]) {
    const controller = load({ profile: { findUnique: async () => profile } }, async () => { throw Object.assign(new Error('Provider secret failure'), { status: providerStatus }); });
    const res = response();
    await controller.refreshRecommendation({ userId: 1 }, res);
    assert.equal(res.statusCode, 503);
    assert.ok(!res.body.message.includes('secret'));
  }
});
test('profile edits during AI generation prevent saving a stale routine', async () => {
  let saved = false;
  const prisma = { profile: { findUnique: async () => profile }, $transaction: async fn => fn({
    profile: { findUnique: async () => ({ updatedAt: new Date('2026-10-01T11:00:00Z') }) },
    recommendation: { upsert: async () => { saved = true; } },
  }) };
  const controller = load(prisma, async () => ({ routine: { morning: [], evening: [], weekly: [] }, products: [] }));
  const res = response();
  await controller.refreshRecommendation({ userId: 1 }, res);
  assert.equal(res.statusCode, 409);
  assert.equal(saved, false);
});
