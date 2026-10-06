const { test } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { createApp } = require('../src/app');
const { loadSource, serve } = require('./support/loadSource');
const { store } = require('./support/privateStore');
process.env.JWT_SECRET = 'privacy-http-test-only-secret-at-least-32-characters';
const auth = id => ({ Authorization: 'Bearer ' + jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1h' }) });

function matches(row, where) {
  return Object.entries(where).every(([key, value]) => {
    if (key === 'OR') return value.some(part => matches(row, part));
    if (value && typeof value === 'object') {
      if (Object.hasOwn(value, 'not')) return row[key] !== value.not;
      if (Object.hasOwn(value, 'contains')) return String(row[key]).includes(value.contains);
    }
    return row[key] === value;
  });
}
function friendsStore() {
  const users = [1, 2, 3].map(id => ({ id, name: 'Friend ' + id, username: 'friend' + id,
    email: 'PRIVATE_EMAIL', profile: { skinType: 'PRIVATE_SKIN', budget: 123456, skinGoals: '["PRIVATE_GOAL"]' },
    skincareLogs: [{ notes: 'PRIVATE_NOTE', photo: 'PRIVATE_PHOTO' }], journalEntries: [{ body: 'PRIVATE_DIARY' }] }));
  let requests = [{ id: 10, senderId: 1, receiverId: 2, status: 'ACCEPTED' },
    { id: 11, senderId: 3, receiverId: 2, status: 'PENDING', createdAt: new Date() }];
  const identity = (id, select) => {
    assert.deepEqual(Object.keys(select).sort(), ['id', 'name', 'username']);
    const user = users.find(user => user.id === id);
    return user && { id: user.id, name: user.name, username: user.username };
  };
  return {
    user: {
      async findUnique({ where, select }) { return identity(where.id, select); },
      async findMany({ where, select }) { return users.filter(user => matches(user, where)).map(user => identity(user.id, select)); },
    },
    friendRequest: {
      async findFirst({ where }) { return requests.find(request => matches(request, where)) || null; },
      async findUnique({ where }) { return requests.find(request => request.id === where.id) || null; },
      async findMany({ where, include }) {
        return requests.filter(request => matches(request, where)).map(request => ({ ...request,
          ...(include.sender ? { sender: identity(request.senderId, include.sender.select) } : {}),
          ...(include.receiver ? { receiver: identity(request.receiverId, include.receiver.select) } : {}),
        }));
      },
      async deleteMany({ where }) { const before = requests.length; requests = requests.filter(request => !matches(request, where)); return { count: before - requests.length }; },
      async updateMany({ where, data }) { let count = 0; for (const request of requests) if (matches(request, where)) { Object.assign(request, data); count++; } return { count }; },
    },
    get requests() { return requests; },
  };
}

test('search, friend lists, requests and accepted profiles query only public identity; either friend can disconnect', async t => {
  const db = friendsStore();
  const controller = loadSource('controllers/friendController.js', { '../services/prisma': db });
  const router = loadSource('routes/friendRoutes.js', { '../controllers/friendController': controller });
  const url = await serve(t, createApp({ env: { NODE_ENV: 'production' }, routes: { '/': router } }));
  for (const path of ['/api/users/search?username=friend', '/api/friends', '/api/friends/requests', '/api/friends/1/profile']) {
    assert.equal((await fetch(url + path)).status, 401);
    const response = await fetch(url + path, { headers: auth(2) });
    assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'private, no-store');
    const data = await response.json();
    assert.ok(!JSON.stringify(data).includes('PRIVATE_')); assert.ok(!JSON.stringify(data).includes('123456'));
    if (path.endsWith('/profile')) {
      assert.equal(data.name, 'Friend 1'); assert.equal(data.profile, null);
      assert.deepEqual(data.skincareLogs, []); assert.equal(data.visibility, 'private');
    }
  }
  assert.equal((await fetch(url + '/api/friends/1/profile?userId=2', { headers: auth(3) })).status, 403);
  // A third person cannot delete the relationship between accounts 1 and 2.
  assert.equal((await fetch(url + '/api/friends/1', { method: 'DELETE', headers: auth(3) })).status, 200);
  assert.equal(db.requests.find(request => request.id === 10).status, 'ACCEPTED');
  assert.equal((await fetch(url + '/api/friends/1', { method: 'DELETE', headers: auth(2) })).status, 200);
  assert.ok(!db.requests.some(request => request.id === 10));
  assert.equal((await fetch(url + '/api/friends/1/profile', { headers: auth(2) })).status, 403);
});

test('malformed friend IDs and array search input are rejected before querying private records', async t => {
  const controller = loadSource('controllers/friendController.js', { '../services/prisma': {} });
  const router = loadSource('routes/friendRoutes.js', { '../controllers/friendController': controller });
  const url = await serve(t, createApp({ env: {}, routes: { '/': router } }));
  for (const [path, method] of [['/friends/2junk/profile', 'GET'], ['/friends/request/-1', 'POST'],
    ['/friends/accept/0', 'POST'], ['/friends/reject/1.5', 'POST'], ['/friends/request/12tail', 'DELETE'], ['/friends/2147483648', 'DELETE']]) {
    assert.equal((await fetch(url + '/api' + path, { method, headers: auth(9) })).status, 400);
  }
  assert.equal((await fetch(url + '/api/users/search?username=one&username=two', { headers: auth(9) })).status, 400);
});

test('only the current receiver can accept/reject a pending request; a legacy cancel cannot remove an accepted friendship', async t => {
  const db = friendsStore();
  const controller = loadSource('controllers/friendController.js', { '../services/prisma': db });
  const router = loadSource('routes/friendRoutes.js', { '../controllers/friendController': controller });
  const url = await serve(t, createApp({ env: {}, routes: { '/': router } }));
  for (const [path, method] of [['/friends/accept/11', 'POST'], ['/friends/reject/11', 'POST'], ['/friends/request/11', 'DELETE']]) {
    assert.equal((await fetch(url + '/api' + path, { method, headers: auth(1) })).status, 404);
    assert.equal(db.requests.find(request => request.id === 11).status, 'PENDING');
  }
  assert.equal((await fetch(url + '/api/friends/accept/11', { method: 'POST', headers: auth(2) })).status, 200);
  assert.equal(db.requests.find(request => request.id === 11).status, 'ACCEPTED');
  assert.equal((await fetch(url + '/api/friends/request/11', { method: 'DELETE', headers: auth(3) })).status, 400);
  assert.equal((await fetch(url + '/api/friends/reject/11', { method: 'POST', headers: auth(2) })).status, 400);
  assert.equal(db.requests.find(request => request.id === 11).status, 'ACCEPTED');
});

test('friend acceptance rechecks ownership and pending status atomically when a request changes during the operation', async () => {
  const controller = loadSource('controllers/friendController.js', { '../services/prisma': { friendRequest: {
    findFirst: async ({ where }) => { assert.equal(where.receiverId, 2); return { id: 11, status: 'PENDING' }; },
    updateMany: async ({ where }) => {
      assert.deepEqual({ ...where }, { id: 11, receiverId: 2, status: 'PENDING' });
      return { count: 0 }; // The row has been reversed, deleted or already handled.
    },
  } } });
  const res = { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
  await controller.acceptRequest({ userId: 2, params: { requestId: '11' } }, res);
  assert.equal(res.statusCode, 409);
});

test('older auth, profile, username, friend and community controllers redact database errors in responses and logs', async t => {
  const output = []; t.mock.method(console, 'error', line => output.push(String(line)));
  const fail = async () => { throw new Error('PRIVATE_DIARY database password=PRIVATE_KEY'); };
  const db = { user: { findUnique: fail }, profile: { findUnique: fail }, friendRequest: { findMany: fail },
    communityPost: { findMany: fail, count: fail } };
  for (const [file, method] of [['authController', 'login'], ['profileController', 'getProfile'],
    ['usernameController', 'checkUsername'], ['friendController', 'getFriends'], ['communityController', 'getPosts']]) {
    const controller = loadSource('controllers/' + file + '.js', { '../services/prisma': db, '../services/firebaseAdmin': {} });
    const res = { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
    await controller[method]({ userId: 2, body: { email: 'test@example.com', password: 'password' }, query: { username: 'testname' }, requestId: 'test-request' }, res);
    assert.equal(res.statusCode, 500); assert.equal(res.body.code, 'REQUEST_FAILED');
    assert.ok(!JSON.stringify(res.body).includes('PRIVATE_')); assert.equal(res.body.error, undefined);
  }
  assert.ok(!JSON.stringify(output).includes('PRIVATE_'));
});

test('two authenticated accounts cannot read, overwrite or delete each other’s journal, collection or photo thumbnails', async t => {
  const journal = store(), discoveries = store('productDiscovery');
  const journalController = loadSource('controllers/journalController.js', { '../services/prisma': journal });
  const discoveryController = loadSource('controllers/discoveryController.js', { '../services/prisma': discoveries });
  const journalRouter = loadSource('routes/journalRoutes.js', { '../controllers/journalController': journalController });
  const discoveryRouter = loadSource('routes/discoveryRoutes.js', { '../controllers/discoveryController': discoveryController });
  const url = await serve(t, createApp({ env: {}, routes: { '/journal': journalRouter, '/discoveries': discoveryRouter } }));
  const png = await sharp({ create: { width: 12, height: 12, channels: 3, background: 'pink' } }).png().toBuffer();
  const page = new FormData(); page.set('title', 'My day'); page.set('body', 'PRIVATE_DIARY'); page.set('version', '0');
  page.set('photo', new Blob([png], { type: 'image/png' }), 'moment.png');
  const saved = await fetch(url + '/api/journal/2026-10-03', { method: 'PUT', headers: auth(1001), body: page });
  assert.equal(saved.status, 200);
  const card = new FormData(); card.set('productName', 'My cleanser'); card.set('brand', 'My brand');
  card.set('review', 'This is my private review.'); card.set('rating', '4'); card.set('discoveredOn', '2026-10-03');
  card.set('photo', new Blob([png], { type: 'image/png' }), 'cleanser.png');
  const created = await fetch(url + '/api/discoveries', { method: 'POST', headers: auth(1001), body: card });
  assert.equal(created.status, 201); const id = (await created.json()).discovery.id;
  for (const photo of ['/journal/2026-10-03/photo', '/journal/2026-10-03/photo?size=thumbnail',
    `/discoveries/${id}/photo`, `/discoveries/${id}/photo?size=thumbnail`]) {
    assert.equal((await fetch(url + '/api' + photo)).status, 401);
    const owner = await fetch(url + '/api' + photo, { headers: auth(1001) });
    assert.equal(owner.status, 200); assert.equal(owner.headers.get('cache-control'), 'private, no-store');
    assert.equal((await fetch(url + '/api' + photo, { headers: auth(1002) })).status, 404);
  }
  const otherPage = await fetch(url + '/api/journal/2026-10-03?userId=1001', { headers: auth(1002) });
  assert.equal((await otherPage.json()).entry, null);
  const month = await fetch(url + '/api/journal?month=2026-10&userId=1001', { headers: auth(1002) });
  assert.deepEqual((await month.json()).entries, []);
  const collection = await fetch(url + '/api/discoveries?userId=1001', { headers: auth(1002) });
  assert.equal(collection.headers.get('cache-control'), 'private, no-store');
  assert.equal((await collection.json()).count, 0);
  assert.equal((await fetch(url + '/api/journal/2026-10-03?version=1&userId=1001', { method: 'DELETE', headers: auth(1002) })).status, 404);
  const attempted = new FormData(); attempted.set('title', 'Another day'); attempted.set('body', 'Overwrite another account'); attempted.set('version', '1'); attempted.set('userId', '1001');
  assert.equal((await fetch(url + '/api/journal/2026-10-03', { method: 'PUT', headers: auth(1002), body: attempted })).status, 409);
  const edit = new FormData(); edit.set('productName', 'Changed cleanser'); edit.set('review', 'Changed private review'); edit.set('version', '1');
  assert.equal((await fetch(url + `/api/discoveries/${id}`, { method: 'PUT', headers: auth(1002), body: edit })).status, 404);
  assert.equal((await fetch(url + `/api/discoveries/${id}?version=1&userId=1001`, { method: 'DELETE', headers: auth(1002) })).status, 404);
  assert.equal(journal.rows[0].body, 'PRIVATE_DIARY'); assert.equal(journal.rows[0].version, 1);
  assert.equal(discoveries.rows[0].productName, 'My cleanser'); assert.equal(discoveries.rows[0].version, 1);
  assert.equal(journal.photos.size, 1); assert.equal(discoveries.photos.size, 1);
});

test('routine photos are decoded and stripped of metadata; fake images and oversized text never write', async t => {
  const rows = [];
  const controller = loadSource('controllers/skincareLogController.js', { '../services/prisma': { skincareLog: {
    async create({ data }) { const row = { id: rows.length + 1, ...data }; rows.push(row); return row; },
    async findMany({ where }) { return rows.filter(row => row.userId === where.userId); },
  } } });
  const router = loadSource('routes/skincareLogRoutes.js', { '../controllers/skincareLogController': controller });
  const url = await serve(t, createApp({ env: {}, routes: { '/logs': router } }));
  const headers = { ...auth(1101), 'Content-Type': 'application/json' };
  const input = { timeOfDay: 'morning', productsUsed: ['Cleanser'], notes: 'A private note', userId: 1102 };
  for (const bad of [{ ...input, photo: Buffer.from('<svg><script>bad</script></svg>').toString('base64') },
    { ...input, photo: 'invalid image' }, { ...input, notes: 'x'.repeat(10001) }]) {
    assert.equal((await fetch(url + '/api/logs', { method: 'POST', headers, body: JSON.stringify(bad) })).status, 400);
  }
  assert.equal(rows.length, 0);
  const jpeg = await sharp({ create: { width: 12, height: 12, channels: 3, background: 'blue' } }).jpeg().withMetadata().toBuffer();
  assert.ok((await sharp(jpeg).metadata()).exif);
  const result = await fetch(url + '/api/logs', { method: 'POST', headers, body: JSON.stringify({ ...input, photo: jpeg.toString('base64') }) });
  assert.equal(result.status, 201); assert.equal(rows[0].userId, 1101);
  const output = await sharp(Buffer.from(rows[0].photo, 'base64')).metadata();
  assert.equal(output.format, 'webp'); assert.equal(output.exif, undefined);
  const other = await fetch(url + '/api/logs?userId=1101', { headers: auth(1102) });
  assert.deepEqual((await other.json()).logs, []);
  const multipart = new FormData(); multipart.set('timeOfDay', 'evening'); multipart.set('productsUsed', '["Cleanser"]');
  multipart.set('photo', new Blob([jpeg], { type: 'image/jpeg' }), 'photo.jpg');
  assert.equal((await fetch(url + '/api/logs', { method: 'POST', headers: auth(1101), body: multipart })).status, 201);
  assert.equal(rows.length, 2); assert.ok(rows[1].photo);
});
