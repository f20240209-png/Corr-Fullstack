const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'corr-regression-test-secret-at-least-32-characters';

function load(relative, prisma = {}, firebase = {}) {
  const filename = path.resolve(__dirname, '../src', relative);
  const realRequire = createRequire(filename);
  const module = { exports: {} };
  const requireMock = (name) => {
    if (name.endsWith('/services/prisma') || name === './prisma') return prisma;
    if (name.includes('generated/prisma')) return { PrismaClient: function () { return prisma; } };
    if (name.endsWith('firebaseAdmin')) return firebase;
    return realRequire(name);
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
    module, exports: module.exports, require: requireMock, process, console, Buffer,
  }, { filename });
  return module.exports;
}

function response() {
  return { statusCode: 200, body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('protected routes accept valid app JWTs and reject expired, Firebase-like and malformed tokens', () => {
  const { protect } = load('middleware/authMiddleware.js');
  const cases = [
    [jwt.sign({ userId: 7 }, process.env.JWT_SECRET, { expiresIn: '1h' }), 200],
    [jwt.sign({ userId: 7 }, process.env.JWT_SECRET, { expiresIn: -1 }), 401],
    [jwt.sign({ uid: 'firebase-user' }, process.env.JWT_SECRET), 401],
    [jwt.sign({ userId: 7 }, 'wrong-secret'), 401],
    ['broken', 401],
  ];
  for (const [token, expected] of cases) {
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = response();
    let passed = false;
    protect(req, res, () => { passed = true; });
    assert.equal(res.statusCode, expected);
    assert.equal(passed, expected === 200);
    if (passed) assert.equal(req.userId, 7);
  }
  const res = response();
  protect({ headers: { authorization: 'Basic anything' } }, res, () => assert.fail());
  assert.equal(res.statusCode, 401);
});

test('register/login roundtrip normalizes email while preserving password spaces', async () => {
  let saved;
  const prisma = { user: {
    findUnique: async ({ where }) => saved?.email === where.email ? saved : null,
    create: async ({ data }) => (saved = { id: 9, ...data }),
  } };
  const { register, login } = load('controllers/authController.js', prisma);
  const password = '  password with spaces  ';
  let res = response();
  await register({ body: { name: ' Adarsh ', email: ' TEST@example.com ', password } }, res);
  assert.equal(res.statusCode, 201);
  assert.equal(saved.email, 'test@example.com');
  assert.equal(saved.name, 'Adarsh');
  assert.ok(await bcrypt.compare(password, saved.password));
  res = response();
  await login({ body: { email: ' TEST@EXAMPLE.COM ', password } }, res);
  assert.equal(jwt.verify(res.body.token, process.env.JWT_SECRET).userId, 9);
  res = response();
  await login({ body: { email: saved.email, password: password.trim() } }, res);
  assert.equal(res.statusCode, 401);
});

test('bad registration input never writes to the database', async () => {
  const { register } = load('controllers/authController.js', {
    user: { findUnique: () => assert.fail('must validate first') },
  });
  for (const body of [{}, { name: 'A', email: 'invalid', password: '12345678' },
    { name: 'A', email: 'a@b.com', password: 'short' },
    { name: 'A', email: 'a@b.com', password: 'x'.repeat(73) }]) {
    const res = response();
    await register({ body }, res);
    assert.equal(res.statusCode, 400);
  }
});

test('session endpoint verifies that the account still exists', async () => {
  const { getSession } = load('controllers/authController.js', { user: {
    findUnique: async () => null,
  } });
  const res = response();
  await getSession({ userId: 4 }, res);
  assert.equal(res.statusCode, 401);
});

test('Google sign-in rejects unverified emails before account linking', async () => {
  const { googleLogin } = load('controllers/authController.js', {}, { auth: () => ({
    verifyIdToken: async () => ({ email: 'a@b.com', email_verified: false,
      firebase: { sign_in_provider: 'google.com' } }),
  }) });
  const res = response();
  await googleLogin({ body: { idToken: 'test' } }, res);
  assert.equal(res.statusCode, 401);
});

test('profile updates invalidate cached routines in the same transaction', async () => {
  const events = [];
  const tx = {
    profile: { upsert: async ({ create }) => {
      events.push('save'); return { id: 15, ...create };
    } },
    recommendation: { deleteMany: async ({ where }) => {
      assert.equal(where.profileId, 15); events.push('invalidate');
    } },
  };
  const { updateProfile } = load('controllers/profileController.js', {
    $transaction: async (callback) => callback(tx),
  });
  const body = { age: 20, gender: 'male', skinType: 'oily', skinGoals: ['oil-control'], budget: 500 };
  const res = response();
  await updateProfile({ userId: 2, body }, res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(events, ['save', 'invalidate']);
  const invalid = response();
  await updateProfile({ userId: 2, body: { ...body, budget: -1 } }, invalid);
  assert.equal(invalid.statusCode, 400);
  assert.equal(events.length, 2);
});

test('Google token exchange issues an app JWT accepted by protected routes', async () => {
  const { googleLogin } = load('controllers/authController.js', { user: {
    findFirst: async () => ({ id: 21, googleId: 'google-uid', name: 'Adarsh', email: 'a@b.com' }),
  } }, { auth: () => ({ verifyIdToken: async () => ({
    uid: 'google-uid', name: 'Adarsh', email: 'a@b.com', email_verified: true,
    firebase: { sign_in_provider: 'google.com' },
  }) }) });
  const res = response();
  await googleLogin({ body: { idToken: 'firebase-id-token' } }, res);
  assert.equal(res.statusCode, 200);
  const { protect } = load('middleware/authMiddleware.js');
  const req = { headers: { authorization: `Bearer ${res.body.token}` } };
  let accepted = false;
  protect(req, response(), () => { accepted = true; });
  assert.ok(accepted);
  assert.equal(req.userId, 21);
});

test('Firebase credential failure is reported as server configuration, not invalid login', async () => {
  const { googleLogin } = load('controllers/authController.js', {}, { auth: () => ({
    verifyIdToken: async () => { throw Object.assign(new Error('test credential failure'), { code: 'auth/invalid-credential' }); },
  }) });
  const res = response();
  await googleLogin({ body: { idToken: 'test' } }, res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.code, 'FIREBASE_CONFIGURATION_ERROR');
});
