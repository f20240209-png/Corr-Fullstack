const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { protect } = require('../src/middleware/authMiddleware');
const upload = require('../src/middleware/discoveryUpload');
const { prepareDiscoveryImage } = require('../src/services/discoveryImage');

test('HTTP uploads authenticate first, parse multipart and reject missing/fake/oversize photos', async t => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'discovery-test-only-secret';
  t.after(() => { if (previousSecret === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previousSecret; });
  const app = express(); let writes = 0;
  app.post('/discoveries', protect, upload, async (req, res) => {
    try { const image = await prepareDiscoveryImage(req.file); writes++;
      res.status(201).json({ userId: req.userId, review: req.body.review, bytes: image.bytes.length });
    } catch (error) { res.status(error.status || 500).json({ message: error.message }); }
  });
  const server = await new Promise(resolve => { const server = app.listen(0, '127.0.0.1', () => resolve(server)); });
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}/discoveries`;
  const headers = { Authorization: 'Bearer ' + jwt.sign({ userId: 7 }, process.env.JWT_SECRET) };
  assert.equal((await fetch(url, { method: 'POST' })).status, 401);
  const missing = new FormData(); missing.set('review', 'My own experience');
  assert.equal((await fetch(url, { method: 'POST', headers, body: missing })).status, 400);
  const fake = new FormData(); fake.set('photo', new Blob(['not a photo'], { type: 'image/jpeg' }), 'photo.jpg');
  assert.equal((await fetch(url, { method: 'POST', headers, body: fake })).status, 400);
  const huge = new FormData(); huge.set('photo', new Blob([Buffer.alloc(5 * 1024 * 1024 + 1)]), 'photo.jpg');
  assert.equal((await fetch(url, { method: 'POST', headers, body: huge })).status, 413);
  const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: 'green' } }).png().toBuffer();
  const valid = new FormData(); valid.set('review', 'My own experience'); valid.set('photo', new Blob([png], { type: 'image/png' }), 'product.png');
  const res = await fetch(url, { method: 'POST', headers, body: valid });
  assert.equal(res.status, 201); assert.equal((await res.json()).userId, 7); assert.equal(writes, 1);
});
