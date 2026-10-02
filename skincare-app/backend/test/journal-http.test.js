const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { protect } = require('../src/middleware/authMiddleware');
const upload = require('../src/middleware/journalUpload');
const { store, controller } = require('./support/privateStore');
test('journal HTTP authenticates every route and supports multipart writing and optional private photos', async t => {
  const previous = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'journal-test-only-secret';
  t.after(() => { if (previous === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previous; });
  const db = store(), c = controller('journalController', db), app = express();
  app.use('/journal', protect, (req, res, next) => { res.set('Cache-Control', 'private, no-store'); next(); });
  const handler = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
  app.get('/journal', handler(c.listJournal)); app.get('/journal/:date/photo', handler(c.getJournalPhoto));
  app.get('/journal/:date', handler(c.getJournal)); app.put('/journal/:date', upload, handler(c.saveJournal)); app.delete('/journal/:date', handler(c.deleteJournal));
  const server = await new Promise(resolve => { const server = app.listen(0, '127.0.0.1', () => resolve(server)); });
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}/journal`;
  const headers = id => ({ Authorization: 'Bearer ' + jwt.sign({ userId: id }, process.env.JWT_SECRET) });
  for (const [path, method] of [['?month=2026-10', 'GET'], ['/2026-10-02', 'GET'], ['/2026-10-02/photo', 'GET'], ['/2026-10-02', 'PUT'], ['/2026-10-02?version=1', 'DELETE']]) {
    assert.equal((await fetch(url + path, { method })).status, 401);
  }
  const page = new FormData(); page.set('title', 'A free day'); page.set('body', '字'.repeat(9000)); page.set('version', '0');
  const created = await fetch(url + '/2026-10-02', { method: 'PUT', headers: headers(1), body: page });
  assert.equal(created.status, 200); assert.equal((await created.json()).entry.body.length, 9000);
  const other = await fetch(url + '/2026-10-02?userId=1', { headers: headers(2) });
  assert.equal((await other.json()).entry, null);
  const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: 'green' } }).png().toBuffer();
  const replacement = new FormData(); replacement.set('title', 'A free day'); replacement.set('body', 'A photo of a moment.'); replacement.set('version', '1');
  replacement.set('photo', new Blob([png], { type: 'image/png' }), 'moment.png');
  assert.equal((await fetch(url + '/2026-10-02', { method: 'PUT', headers: headers(1), body: replacement })).status, 200);
  const image = await fetch(url + '/2026-10-02/photo', { headers: headers(1) });
  assert.equal(image.status, 200); assert.equal(image.headers.get('cache-control'), 'private, no-store');
  assert.equal((await fetch(url + '/2026-10-02/photo', { headers: headers(2) })).status, 404);
});
