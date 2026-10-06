const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { request } = require('gaxios');
const { defineConfig } = require('@prisma/config');
const { serve } = require('./support/loadSource');
test('the patched Prisma merge dependency preserves ordinary schema configuration', () => {
  const config = defineConfig({ schema: 'prisma/schema.prisma' });
  assert.equal(config.schema, 'prisma/schema.prisma');
});
test('the patched CommonJS UUID dependency still generates valid multipart requests through Gaxios', async t => {
  const app = express();
  app.post('/', express.raw({ type: '*/*' }), (req, res) => {
    assert.match(req.headers['content-type'], /^multipart\/related; boundary=[0-9a-f-]{36}$/);
    assert.ok(req.body.toString().includes('compatibility fixture'));
    res.json({ accepted: true });
  });
  const url = await serve(t, app);
  const result = await request({ url, method: 'POST', multipart: [{ headers: { 'Content-Type': 'text/plain' }, content: 'compatibility fixture' }] });
  assert.equal(result.status, 200); assert.equal(result.data.accepted, true);
});
