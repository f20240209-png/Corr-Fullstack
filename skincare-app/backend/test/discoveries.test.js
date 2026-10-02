const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const sharp = require('sharp');
const { validateDiscovery } = require('../src/services/discoveryData');
const { prepareDiscoveryImage } = require('../src/services/discoveryImage');
const base = { productName: 'Daily Cleanser', brand: 'CeraVe', review: 'Easy to use and felt comfortable.', discoveredOn: '2026-01-01', rating: '4' };
const png = colour => sharp({ create: { width: 20, height: 20, channels: 3, background: colour } }).png().toBuffer();
const photo = async colour => ({ buffer: await png(colour) });
const response = () => ({ statusCode: 200, status(n) { this.statusCode = n; return this; }, json(body) { this.body = body; return this; }, set() { return this; }, type() { return this; }, send(bytes) { this.bytes = bytes; return this; } });
function database() {
  let rows = [], images = new Map(), next = 1;
  const matches = (row, where) => Object.entries(where).every(([key, value]) => {
    if (key === 'AND') return value.every(item => matches(row, item));
    if (key === 'OR') return value.some(item => matches(row, item));
    if (value && typeof value === 'object') return Object.entries(value).every(([op, term]) => {
      if (op === 'lt') return row[key] !== null && row[key] < term;
      if (op === 'gt') return row[key] !== null && row[key] > term;
      if (op === 'gte') return row[key] !== null && row[key] >= term;
      if (op === 'contains') return String(row[key]).toLowerCase().includes(term.toLowerCase());
      return false;
    });
    return row[key] === value;
  });
  const unique = (data, except) => {
    if (rows.some(row => row.id !== except && row.userId === data.userId && (row.productKey === data.productKey || row.imageHash === data.imageHash))) throw Object.assign(new Error('duplicate'), { code: 'P2002' });
  };
  const db = {
    productDiscovery: {
      async create({ data }) { unique(data); const { image, ...rest } = data;
        const row = { id: next++, version: 1, createdAt: new Date(), updatedAt: new Date(), ...rest };
        rows.push(row); images.set(row.id, image.create); return { ...row }; },
      async count({ where }) { return rows.filter(row => matches(row, where)).length; },
      async findMany({ where, take }) { return rows.filter(row => matches(row, where)).sort((a, b) => b.id - a.id).slice(0, take).map(row => ({ ...row })); },
      async findFirst({ where, select }) { const row = rows.find(row => matches(row, where)); return row ? { ...row, ...(select.image ? { image: images.get(row.id) } : {}) } : null; },
      async updateMany({ where, data }) { const row = rows.find(row => matches(row, where)); if (!row) return { count: 0 };
        unique({ ...row, ...data }, row.id); Object.assign(row, { ...data, version: row.version + 1 }); return { count: 1 }; },
      async deleteMany({ where }) { const old = rows.length; rows = rows.filter(row => !matches(row, where)); return { count: old - rows.length }; },
    },
    productDiscoveryImage: {
      async update({ where, data }) { if (!images.has(where.discoveryId)) throw new Error('missing image'); images.set(where.discoveryId, data); },
      async deleteMany({ where }) { images.delete(where.discoveryId); },
    },
    async $transaction(fn) { const snapshot = rows.map(row => ({ ...row })), oldImages = new Map(images), oldNext = next;
      try { return await fn(db); } catch (error) { rows = snapshot; images = oldImages; next = oldNext; throw error; } },
    get rows() { return rows; }, get images() { return images; },
  };
  return db;
}
function load(db) {
  const filename = path.resolve(__dirname, '../src/controllers/discoveryController.js');
  const realRequire = createRequire(filename), module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), { module, exports: module.exports, Buffer, console: { error() {} }, require(name) {
    return name === '../services/prisma' ? db : realRequire(name);
  } }, { filename }); return module.exports;
}
async function add(controller, overrides = {}, colour = 'red', userId = 1) {
  const res = response(); await controller.createDiscovery({ userId, body: { ...base, ...overrides }, file: await photo(colour) }, res); return res;
}
test('discovery identity ignores case, accents and extra punctuation; ratings/dates/reviews validate', () => {
  assert.equal(validateDiscovery(base).productKey, validateDiscovery({ ...base, brand: ' CÉRAVE ', productName: 'daily-cleanser' }).productKey);
  for (const change of [{ review: 'short' }, { rating: '6' }, { rating: '2.5' }, { discoveredOn: '2026-02-30' }, { discoveredOn: '2999-01-01' }, { productName: '!' }, { brand: '' }]) {
    assert.throws(() => validateDiscovery({ ...base, ...change }), { status: 400 });
  }
});
test('photo is required, actual content is decoded and output strips image metadata', async () => {
  await assert.rejects(prepareDiscoveryImage(null), { status: 400 });
  await assert.rejects(prepareDiscoveryImage({ buffer: Buffer.from('not an image'), mimetype: 'image/jpeg' }), { status: 400 });
  await assert.rejects(prepareDiscoveryImage({ buffer: Buffer.alloc(5 * 1024 * 1024 + 1) }), { status: 413 });
  const result = await prepareDiscoveryImage(await photo('blue'));
  const metadata = await sharp(result.bytes).metadata();
  assert.equal(metadata.format, 'webp'); assert.equal(metadata.exif, undefined);
  assert.ok(result.thumbnail.length > 0); assert.equal(result.imageHash.length, 64);
});
test('creation without photo or invalid review never writes a discovery', async () => {
  const db = database(), controller = load(db);
  const res = response(); await controller.createDiscovery({ userId: 1, body: base }, res);
  assert.equal(res.statusCode, 400); assert.equal(db.rows.length, 0);
  const bad = await add(controller, { review: '' }); assert.equal(bad.statusCode, 400); assert.equal(db.rows.length, 0);
});
test('duplicate product and duplicate photo do not increase the collection score', async () => {
  const db = database(), controller = load(db);
  assert.equal((await add(controller)).statusCode, 201);
  assert.equal((await add(controller, { productName: ' daily-cleanser ' }, 'blue')).statusCode, 409);
  assert.equal((await add(controller, { productName: 'Different product' }, 'red')).statusCode, 409);
  assert.equal(db.rows.length, 1); assert.equal(db.images.size, 1);
});
test('same product is allowed in another user collection; pages and counts stay user-scoped', async () => {
  const db = database(), controller = load(db);
  await add(controller); await add(controller, {}, 'red', 2);
  await add(controller, { productName: 'Moisturiser' }, 'blue');
  const first = response(); await controller.listDiscoveries({ userId: 1, query: { limit: '1' } }, first);
  assert.equal(first.body.count, 2); assert.equal(first.body.score, 2);
  assert.equal(first.body.discoveries.length, 1); assert.ok(first.body.nextCursor);
  const second = response(); await controller.listDiscoveries({ userId: 1, query: { limit: '1', before: first.body.nextCursor } }, second);
  assert.equal(second.body.discoveries[0].id, 1); assert.equal(second.body.nextCursor, null);
  assert.equal(second.body.discoveries[0].image, undefined);
});
test('another user cannot fetch the photo, edit or delete a discovery', async () => {
  const db = database(), controller = load(db); await add(controller);
  for (const method of ['getDiscoveryPhoto', 'updateDiscovery', 'deleteDiscovery']) {
    const res = response(); await controller[method]({ userId: 2, params: { id: '1' }, query: { version: '1' }, body: { ...base, version: '1' } }, res);
    assert.equal(res.statusCode, 404);
  }
  assert.equal(db.rows.length, 1); assert.equal(db.images.size, 1);
});
test('review edit preserves photo; stale updates are rejected', async () => {
  const db = database(), controller = load(db); await add(controller);
  const original = db.images.get(1).bytes;
  const res = response(); await controller.updateDiscovery({ userId: 1, params: { id: '1' }, body: { ...base, review: 'Updated personal experience.', version: '1' } }, res);
  assert.equal(res.statusCode, 200); assert.equal(res.body.discovery.version, 2); assert.equal(db.images.get(1).bytes, original);
  const stale = response(); await controller.updateDiscovery({ userId: 1, params: { id: '1' }, body: { ...base, version: '1' } }, stale);
  assert.equal(stale.statusCode, 409); assert.equal(db.rows[0].review, 'Updated personal experience.');
});
test('image replacement updates full photo and thumbnail together', async () => {
  const db = database(), controller = load(db); await add(controller);
  const original = db.images.get(1).bytes;
  const res = response(); await controller.updateDiscovery({ userId: 1, params: { id: '1' }, body: { ...base, version: '1' }, file: await photo('blue') }, res);
  assert.equal(res.statusCode, 200); assert.notDeepEqual(db.images.get(1).bytes, original);
  assert.ok(db.images.get(1).thumbnail.length); assert.equal(res.body.discovery.version, 2);
});
test('delete rejects stale versions and removes the photo and collection entry', async () => {
  const db = database(), controller = load(db); await add(controller);
  const stale = response(); await controller.deleteDiscovery({ userId: 1, params: { id: '1' }, query: { version: '2' } }, stale);
  assert.equal(stale.statusCode, 409); assert.equal(db.rows.length, 1);
  const res = response(); await controller.deleteDiscovery({ userId: 1, params: { id: '1' }, query: { version: '1' } }, res);
  assert.equal(res.body.deleted, true); assert.equal(db.rows.length, 0); assert.equal(db.images.size, 0);
});
test('image write failure rolls back the review/version update', async () => {
  const db = database(), controller = load(db); await add(controller);
  db.productDiscoveryImage.update = async () => { throw new Error('Storage unavailable'); };
  const res = response(); await controller.updateDiscovery({ userId: 1, params: { id: '1' }, body: { ...base, review: 'Should not be saved.', version: '1' }, file: await photo('green') }, res);
  assert.equal(res.statusCode, 503); assert.equal(db.rows[0].version, 1); assert.equal(db.rows[0].review, base.review);
});
test('product types validate and legacy edits preserve the existing category', async () => {
  assert.throws(() => validateDiscovery({ ...base, productType: 'unknown' }), { status: 400 });
  assert.equal(validateDiscovery(base).productType, 'other');
  const db = database(), c = load(db);
  assert.equal((await add(c, { productType: 'serum' })).body.discovery.productType, 'serum');
  const res = response(); await c.updateDiscovery({ userId: 1, params: { id: '1' }, body: { ...base, version: '1' } }, res);
  assert.equal(res.statusCode, 200); assert.equal(res.body.discovery.productType, 'serum');
});
