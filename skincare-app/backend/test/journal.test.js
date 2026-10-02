const { test } = require('node:test');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const { store, controller, response } = require('./support/privateStore');
const { journalDate, journalMonth, journalVersion } = require('../src/services/journalData');
const body = { title: 'A little day', body: 'Not about skin.\nA walk, a coffee, a thought.', version: '0', removePhoto: 'false' };
const photo = async color => ({ buffer: await sharp({ create: { width: 12, height: 12, channels: 3, background: color } }).png().toBuffer() });
async function save(c, overrides = {}, userId = 1, file, date = '2026-10-02') {
  const res = response(); await c.saveJournal({ userId, params: { date }, body: { ...body, ...overrides }, file }, res); return res;
}
test('journal dates reject impossible dates and support leap years, historical and future pages', () => {
  for (const date of ['2026-02-30', '1900-02-29', '1899-12-31', '2101-01-01', 'not-a-date']) assert.throws(() => journalDate(date), { status: 400 });
  for (const date of ['1900-01-01', '2000-02-29', '2028-02-29', '2100-12-31']) assert.equal(journalDate(date), date);
  assert.deepEqual(journalMonth('2028-02'), { gte: '2028-02-01', lt: '2028-03-01' });
  for (const value of ['', '-1', '1.5', undefined, 'NaN']) assert.throws(() => journalVersion(value, true), { status: 400 });
});
test('free-form writing saves without a photo, preserves lines and creates only one page per date', async () => {
  const db = store(), c = controller('journalController', db);
  const first = await save(c); assert.equal(first.statusCode, 200); assert.equal(first.body.entry.body, body.body);
  assert.equal(first.body.entry.hasPhoto, false); assert.equal(first.body.entry.photoPath, null);
  const duplicate = await save(c); assert.equal(duplicate.statusCode, 409); assert.equal(db.rows.length, 1);
  const update = await save(c, { version: '1', body: 'A different thought.' }); assert.equal(update.body.entry.version, 2);
});
test('empty pages, oversized text and invalid photos never create records', async () => {
  const db = store(), c = controller('journalController', db);
  for (const data of [{ title: '', body: '   ' }, { title: 'x'.repeat(121) }, { body: 'x'.repeat(10001) }, { removePhoto: 'yes' }]) {
    assert.equal((await save(c, data)).statusCode, 400);
  }
  assert.equal((await save(c, {}, 1, { buffer: Buffer.from('fake JPG') })).statusCode, 400);
  assert.equal(db.rows.length, 0);
});
test('journal pages, calendar metadata, photos and deletes are scoped to the session owner', async () => {
  const db = store(), c = controller('journalController', db);
  await save(c, {}, 1, await photo('red'));
  const res = response(); await c.getJournal({ userId: 2, params: { date: '2026-10-02' }, query: { userId: '1' } }, res);
  assert.equal(res.body.entry, null);
  const month = response(); await c.listJournal({ userId: 2, query: { month: '2026-10', userId: '1' } }, month);
  assert.equal(month.body.entries.length, 0);
  const image = response(); await c.getJournalPhoto({ userId: 2, params: { date: '2026-10-02' }, query: {} }, image);
  assert.equal(image.statusCode, 404);
  const remove = response(); await c.deleteJournal({ userId: 2, params: { date: '2026-10-02' }, query: { version: '1' } }, remove);
  assert.equal(remove.statusCode, 404);
  // Writing to the same date from another account creates that account's own page.
  await save(c, { body: 'User two private page.' }, 2);
  assert.equal(db.rows.length, 2); assert.equal(db.rows.find(row => row.userId === 1).body, body.body);
  const own = response(); await c.listJournal({ userId: 1, query: { month: '2026-10' } }, own);
  assert.equal(own.body.entries[0].body, undefined); assert.equal(own.body.entries[0].image, undefined);
  assert.equal(own.body.entries[0].hasPhoto, true);
});
test('photo-only pages are accepted; saved photos require auth and private cache headers', async () => {
  const db = store(), c = controller('journalController', db);
  const saved = await save(c, { title: '', body: '' }, 1, await photo('green'));
  assert.equal(saved.statusCode, 200); assert.equal(saved.body.entry.hasPhoto, true);
  const res = response(); await c.getJournalPhoto({ userId: 1, params: { date: '2026-10-02' }, query: {} }, res);
  assert.equal(res.headers['Cache-Control'], 'private, no-store'); assert.equal(res.mime, 'image/webp');
  assert.equal((await sharp(res.bytes).metadata()).exif, undefined);
});
test('edits preserve or remove photos explicitly and do not overwrite newer versions', async () => {
  const db = store(), c = controller('journalController', db);
  await save(c, {}, 1, await photo('red')); const original = db.photos.get(1).bytes;
  const edit = await save(c, { version: '1', body: 'Edited freely.' });
  assert.equal(edit.body.entry.version, 2); assert.equal(db.photos.get(1).bytes, original);
  assert.equal((await save(c, { version: '1', body: 'An old draft.' })).statusCode, 409);
  assert.equal(db.rows[0].body, 'Edited freely.');
  const removed = await save(c, { version: '2', removePhoto: 'true' });
  assert.equal(removed.body.entry.hasPhoto, false); assert.equal(db.photos.size, 0);
});
test('photo write failure rolls back the writing and version; stale deletes retain the page', async () => {
  const db = store(), c = controller('journalController', db); await save(c);
  db.journalEntryImage.upsert = async () => { throw new Error('Photo storage failed'); };
  const failed = await save(c, { version: '1', body: 'Must roll back.' }, 1, await photo('blue'));
  assert.equal(failed.statusCode, 503); assert.equal(db.rows[0].body, body.body); assert.equal(db.rows[0].version, 1);
  const stale = response(); await c.deleteJournal({ userId: 1, params: { date: '2026-10-02' }, query: { version: '2' } }, stale);
  assert.equal(stale.statusCode, 409); assert.equal(db.rows.length, 1);
});
test('deleting a page removes its photo and only the selected owner/date', async () => {
  const db = store(), c = controller('journalController', db); await save(c, {}, 1, await photo('red'));
  await save(c, {}, 1, undefined, '2026-10-03');
  const res = response(); await c.deleteJournal({ userId: 1, params: { date: '2026-10-02' }, query: { version: '1' } }, res);
  assert.equal(res.body.deleted, true); assert.equal(db.photos.size, 0); assert.equal(db.rows[0].entryDate, '2026-10-03');
});
