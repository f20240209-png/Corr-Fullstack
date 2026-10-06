const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generateKeyPairSync } = require('node:crypto');
const { getApps, deleteApp } = require('firebase-admin/app');
const { loadSource } = require('./support/loadSource');
test('the installed modular Firebase SDK initializes the auth adapter and rejects malformed credentials without network access', async t => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
  const adapter = loadSource('services/firebaseAdmin.js', {}, { process: { env: {
    FIREBASE_PROJECT_ID: 'corr-offline-test', FIREBASE_CLIENT_EMAIL: 'test@corr-offline-test.iam.gserviceaccount.com',
    FIREBASE_PRIVATE_KEY: privateKey.replace(/\n/g, '\\n'),
  } } });
  t.after(async () => { for (const app of getApps()) await deleteApp(app); });
  assert.equal(typeof adapter.auth().verifyIdToken, 'function');
  await assert.rejects(adapter.auth().verifyIdToken('invalid-token'), error => error.code === 'auth/argument-error');
});
