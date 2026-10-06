const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const { createApp } = require('../src/app');
const { loadSource, serve } = require('./support/loadSource');
const { createLimiter } = require('../src/middleware/rateLimits');
const { protect } = require('../src/middleware/authMiddleware');
const { createUploadWorkGuard } = require('../src/middleware/uploadWorkGuard');

process.env.JWT_SECRET = 'security-http-test-only-secret-at-least-32-characters';
const token = id => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
const auth = id => ({ Authorization: `Bearer ${token(id)}` });
const trusted = { NODE_ENV: 'production', TRUST_PROXY_HOPS: '1' };
function ping() {
  const router = express.Router(); router.get('/ping', (req, res) => res.json({ ok: true }));
  return router;
}

test('production security headers and exact CORS allow the app, deny localhost and keep native authentication required', async t => {
  const router = ping(); router.get('/private', protect, (req, res) => res.json({ userId: req.userId }));
  const url = await serve(t, createApp({ env: { NODE_ENV: 'production', CORS_ORIGINS: 'https://corr.example' }, routes: { '/': router } }));
  const response = await fetch(url + '/api/ping', { headers: { Origin: 'https://inquisitive-clafoutis-600746.netlify.app' } });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://inquisitive-clafoutis-600746.netlify.app');
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('cross-origin-opener-policy'), 'same-origin-allow-popups');
  assert.equal(response.headers.get('cross-origin-embedder-policy'), null);
  assert.equal(response.headers.get('x-powered-by'), null);
  assert.match(response.headers.get('strict-transport-security'), /max-age=/);
  assert.match(response.headers.get('x-request-id'), /^[0-9a-f-]{36}$/);
  for (const origin of ['http://localhost:3000', 'https://inquisitive-clafoutis-600746.netlify.app.evil.example', 'null']) {
    const denied = await fetch(url + '/api/ping', { headers: { Origin: origin } });
    assert.equal(denied.status, 403); assert.equal(denied.headers.get('access-control-allow-origin'), null);
    assert.equal((await denied.json()).code, 'ORIGIN_DENIED');
  }
  assert.equal((await fetch(url + '/api/ping', { headers: { Origin: 'https://corr.example' } })).status, 200);
  assert.equal((await fetch(url + '/api/private')).status, 401);
  assert.equal((await fetch(url + '/api/private', { headers: auth(501) })).status, 200);
  const preflight = await fetch(url + '/api/private', { method: 'OPTIONS', headers: {
    Origin: 'https://corr.example', 'Access-Control-Request-Method': 'GET', 'Access-Control-Request-Headers': 'authorization',
  } });
  assert.equal(preflight.status, 204);
  assert.match(preflight.headers.get('access-control-allow-headers'), /Authorization/);
});

test('local development permits localhost but rejects wildcard origins and unlimited proxy trust', async t => {
  const url = await serve(t, createApp({ env: { NODE_ENV: 'development' }, routes: { '/': ping() } }));
  const response = await fetch(url + '/api/ping', { headers: { Origin: 'http://localhost:57500' } });
  assert.equal(response.status, 200); assert.equal(response.headers.get('strict-transport-security'), null);
  for (const env of [{ TRUST_PROXY_HOPS: 'true' }, { TRUST_PROXY_HOPS: '-1' }, { CORS_ORIGINS: '*' },
    { CORS_ORIGINS: 'https://corr.example/path' }, { NODE_ENV: 'production', CORS_ORIGINS: 'http://localhost:3000' }]) {
    assert.throws(() => createApp({ env, routes: {} }));
  }
});

test('untrusted forwarded IPs cannot bypass rate limits; a trusted hop ignores spoofed leftmost values', async t => {
  for (const [env, forwarded] of [[{ TRUST_PROXY_HOPS: '0' }, i => `198.51.100.${i}`],
    [trusted, i => `198.51.100.${i}, 203.0.113.20`]]) {
    const url = await serve(t, createApp({ env, routes: { '/': ping() }, apiLimit: { limit: 2, windowMs: 60000 } }));
    for (let i = 1; i <= 3; i++) {
      const response = await fetch(url + '/api/ping', { headers: { 'X-Forwarded-For': forwarded(i) } });
      assert.equal(response.status, i < 3 ? 200 : 429);
      if (i === 3) {
        assert.ok(Number(response.headers.get('retry-after')) > 0);
        assert.equal((await response.json()).code, 'RATE_LIMITED');
      }
    }
  }
});

test('IPv6 address rotation within a subnet does not evade limits; mapped IPv4 clients keep separate counters', async t => {
  const url = await serve(t, createApp({ env: trusted, routes: { '/': ping() }, apiLimit: { limit: 1, windowMs: 60000 } }));
  for (const [ip, expected] of [['2001:db8:abcd:1::1', 200], ['2001:db8:abcd:2::2', 429],
    ['::ffff:198.51.100.21', 200], ['::ffff:198.51.100.22', 200], ['::ffff:198.51.100.21', 429]]) {
    assert.equal((await fetch(url + '/api/ping', { headers: { 'X-Forwarded-For': ip } })).status, expected);
  }
});

test('authentication throttles stop before provider calls; reading a session remains available', async t => {
  let calls = 0;
  const controller = Object.fromEntries(['register', 'login', 'googleLogin', 'firebaseLogin', 'phoneLogin', 'getSession']
    .map(name => [name, (req, res) => { calls++; res.json({ ok: true }); }]));
  const routes = loadSource('routes/authRoutes.js', { '../controllers/authController': controller });
  const url = await serve(t, createApp({ env: trusted, routes: { '/auth': routes } }));
  const headers = { 'X-Forwarded-For': '203.0.113.31', 'Content-Type': 'application/json' };
  for (let i = 1; i <= 31; i++) {
    const response = await fetch(url + '/api/auth/' + (i % 2 ? 'login' : 'google'), { method: 'POST', headers, body: '{}' });
    assert.equal(response.status, i <= 30 ? 200 : 429);
  }
  assert.equal(calls, 30);
  assert.equal((await fetch(url + '/api/auth/session', { headers: { ...headers, ...auth(503) } })).status, 200);
  const signupHeaders = { ...headers, 'X-Forwarded-For': '203.0.113.32' };
  for (let i = 1; i <= 9; i++) {
    assert.equal((await fetch(url + '/api/auth/register', { method: 'POST', headers: signupHeaders, body: '{}' })).status, i <= 8 ? 200 : 429);
  }
  assert.equal(calls, 39);
});

test('JSON size limits are scoped; logs authenticate before parsing and preserve larger photo requests', async t => {
  const router = express.Router(); router.post('/', (req, res) => res.json({ length: req.body.photo?.length || 0 }));
  const url = await serve(t, createApp({ env: trusted, routes: { '/profile': router, '/auth': router, '/logs': router } }));
  const headers = { ...auth(510), 'Content-Type': 'application/json', 'X-Forwarded-For': '203.0.113.33' };
  const invalid = await fetch(url + '/api/profile', { method: 'POST', headers, body: '{private content' });
  assert.equal(invalid.status, 400); assert.deepEqual(await invalid.json(), { message: 'Send valid JSON.', code: 'INVALID_JSON' });
  const body = JSON.stringify({ photo: 'x'.repeat(130 * 1024) });
  assert.equal((await fetch(url + '/api/profile', { method: 'POST', headers, body })).status, 413);
  assert.equal((await fetch(url + '/api/auth', { method: 'POST', headers, body })).status, 413);
  assert.equal((await fetch(url + '/api/logs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 401);
  const accepted = await fetch(url + '/api/logs', { method: 'POST', headers, body });
  assert.equal(accepted.status, 200); assert.equal((await accepted.json()).length, 130 * 1024);
});

test('private uploads are not served publicly; unexpected errors and logs never echo sensitive content', async t => {
  const directory = path.resolve(__dirname, '../uploads'); fs.mkdirSync(directory, { recursive: true });
  const name = 'security-test-' + randomUUID() + '.txt', file = path.join(directory, name);
  fs.writeFileSync(file, 'private photo fixture'); t.after(() => fs.unlinkSync(file));
  const logs = []; t.mock.method(console, 'error', entry => logs.push(String(entry)));
  const router = express.Router();
  router.get('/failure', (req, res) => { throw new Error('PRIVATE_DIARY database://password token=SECRET'); });
  const url = await serve(t, createApp({ env: trusted, routes: { '/': router } }));
  assert.equal((await fetch(url + '/uploads/' + name)).status, 404);
  const response = await fetch(url + '/api/failure?note=PRIVATE_DIARY', { headers: { 'X-Request-Id': 'attacker-id' } });
  const data = await response.json();
  assert.equal(response.status, 500); assert.equal(data.code, 'REQUEST_FAILED');
  assert.equal(data.requestId, response.headers.get('x-request-id')); assert.notEqual(data.requestId, 'attacker-id');
  assert.ok(!JSON.stringify([data, logs]).includes('PRIVATE_DIARY')); assert.ok(!JSON.stringify([data, logs]).includes('SECRET'));
  assert.equal(logs.length, 1);
});

test('account upload budgets are shared across photo routes and cannot be changed by body userId', async t => {
  const limiter = createLimiter({ limit: 1, windowMs: 60000, scope: 'test-upload', account: true });
  const router = express.Router();
  router.post(['/journal', '/discoveries'], protect, limiter, (req, res) => res.json({ userId: req.userId }));
  const url = await serve(t, createApp({ env: trusted, routes: { '/': router } }));
  const headers = { ...auth(520), 'Content-Type': 'application/json' };
  assert.equal((await fetch(url + '/api/journal', { method: 'POST', headers, body: '{"userId":999}' })).status, 200);
  assert.equal((await fetch(url + '/api/discoveries', { method: 'POST', headers, body: '{"userId":998}' })).status, 429);
  assert.equal((await fetch(url + '/api/discoveries', { method: 'POST', headers: { ...headers, ...auth(521) }, body: '{}' })).status, 200);
});

test('actual AI generation is limited per account across GET and refresh, while cached routine reads stay available', async t => {
  let calls = 0, cached = null;
  const profile = { id: 601, updatedAt: new Date('2026-10-01T00:00:00Z') };
  const controller = loadSource('controllers/recommendationController.js', {
    '../services/prisma': { profile: { findUnique: async () => profile }, recommendation: { findUnique: async () => cached } },
    '../services/aiService': { generateSkincareRecommendation: async () => { calls++; throw Object.assign(new Error('provider failure'), { status: 503 }); } },
  });
  t.mock.method(console, 'error', () => {});
  const router = loadSource('routes/recommendationRoutes.js', { '../controllers/recommendationController': controller });
  const url = await serve(t, createApp({ env: trusted, routes: { '/recommendations': router } }));
  for (let i = 0; i < 7; i++) {
    const response = await fetch(url + '/api/recommendations' + (i % 2 ? '/refresh' : ''), { method: i % 2 ? 'POST' : 'GET', headers: auth(601) });
    assert.equal(response.status, i < 6 ? 503 : 429);
  }
  assert.equal(calls, 6);
  cached = { id: 1, profileId: 601, updatedAt: new Date('2026-10-02T00:00:00Z'), products: '[]',
    routine: JSON.stringify({ morning: [{ action: 'Cleanse' }], evening: [{ action: 'Cleanse' }], weekly: [] }) };
  assert.equal((await fetch(url + '/api/recommendations', { headers: auth(601) })).status, 200);
  assert.equal(calls, 6);
  cached = null;
  assert.equal((await fetch(url + '/api/recommendations', { headers: auth(602) })).status, 503);
  assert.equal(calls, 7);
});

test('photo admission bounds concurrent work and releases slots when a client disconnects', async t => {
  const waiting = new Map(), entered = new Map(), closed = new Map();
  const signal = (map, id) => {
    if (!map.has(id)) { let resolve; const promise = new Promise(r => { resolve = r; }); map.set(id, { promise, resolve }); }
    return map.get(id);
  };
  const router = express.Router();
  router.post('/photo', protect, createUploadWorkGuard(2), async (req, res) => {
    res.once('close', () => signal(closed, req.userId).resolve());
    signal(entered, req.userId).resolve();
    if (!req.query.fast) await signal(waiting, req.userId).promise;
    if (!res.destroyed) res.json({ saved: true });
  });
  const url = await serve(t, createApp({ env: {}, routes: { '/': router } }));
  const first = fetch(url + '/api/photo', { method: 'POST', headers: auth(701) });
  await signal(entered, 701).promise;
  const second = fetch(url + '/api/photo', { method: 'POST', headers: auth(702) });
  await signal(entered, 702).promise;
  for (const id of [701, 703]) assert.equal((await fetch(url + '/api/photo?fast=1', { method: 'POST', headers: auth(id) })).status, 429);
  signal(waiting, 701).resolve(); signal(waiting, 702).resolve();
  assert.equal((await first).status, 200); assert.equal((await second).status, 200);
  const abort = new AbortController();
  const abandoned = fetch(url + '/api/photo', { method: 'POST', headers: auth(704), signal: abort.signal });
  const rejected = assert.rejects(abandoned, error => error.name === 'AbortError');
  await signal(entered, 704).promise; abort.abort(); await rejected; await signal(closed, 704).promise;
  assert.equal((await fetch(url + '/api/photo?fast=1', { method: 'POST', headers: auth(704) })).status, 200);
  signal(waiting, 704).resolve();
});
