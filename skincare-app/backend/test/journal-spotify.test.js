const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const express = require('express');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { store, controller, response } = require('./support/privateStore');
const { journalSpotifyTrackId } = require('../src/services/journalData');
const { protect } = require('../src/middleware/authMiddleware');
const upload = require('../src/middleware/journalUpload');
const track = '4uLU6hMCjMI75M1A2tKUQC', otherTrack = '0Lr4kGOYn9l83EjuK6cZFQ';
const songUrl = `https://open.spotify.com/track/${track}`;
async function save(c, overrides = {}, userId = 1) {
  const res = response();
  await c.saveJournal({ userId, params: { date: '2026-10-02' }, body: { title: '', body: '', version: '0', spotifyUrl: songUrl, ...overrides } }, res);
  return res;
}

test('Spotify song links normalize share queries, locale paths and Spotify track URIs', () => {
  for (const link of [songUrl, ` ${songUrl}?si=abc&utm_source=copy#section `, `https://open.spotify.com/intl-en/track/${track}`, songUrl + '/', `spotify:track:${track}`, `https://OPEN.SPOTIFY.COM:443/track/${track}`]) {
    assert.equal(journalSpotifyTrackId(link), track);
  }
  assert.equal(journalSpotifyTrackId('  '), null);
});

test('Spotify validation rejects other domains, playlists, scripts, HTML and malformed IDs', () => {
  for (const link of [undefined, null, [], 'javascript:alert(1)', '<iframe src="' + songUrl + '"></iframe>', songUrl.replace('https:', 'http:'), songUrl.replace('track/', 'playlist/'), songUrl.replace('open.spotify.com', 'open.spotify.com.evil.example'), songUrl.replace('open.spotify.com', 'user@open.spotify.com'), songUrl.replace('open.spotify.com', 'open.spotify.com:444'), 'https://spotify.link/short', songUrl + '/extra', songUrl.slice(0, -1), songUrl + 'x', 'x'.repeat(2049), songUrl.replace('spotify', 'spoti\nfy'), 'https://open.spotify.com/track/%34uLU6hMCjMI75M1A2tKUQC']) {
    assert.throws(() => journalSpotifyTrackId(link), { status: 400 });
  }
});

test('a song-only page saves, reloads and remains private to its owner', async () => {
  const db = store(), c = controller('journalController', db);
  const created = await save(c);
  assert.equal(created.statusCode, 200); assert.equal(created.body.entry.spotifyTrackId, track);
  assert.equal(created.body.entry.spotifyUrl, songUrl); assert.equal(created.body.entry.hasPhoto, false);
  const own = response(); await c.getJournal({ userId: 1, params: { date: '2026-10-02' } }, own);
  assert.equal(own.body.entry.spotifyUrl, songUrl); assert.equal(own.headers['Cache-Control'], 'private, no-store');
  const other = response(); await c.getJournal({ userId: 2, params: { date: '2026-10-02' }, query: { userId: 1 } }, other);
  assert.equal(other.body.entry, null);
  const month = response(); await c.listJournal({ userId: 1, query: { month: '2026-10' } }, month);
  assert.equal(month.body.entries.length, 1); assert.equal(month.body.entries[0].spotifyTrackId, undefined);
});

test('older clients preserve songs; explicit replacement and removal persist without accepting stale edits', async () => {
  const db = store(), c = controller('journalController', db);
  await save(c, { body: 'A good day.' });
  const legacy = await save(c, { version: '1', body: 'An older client can edit.' , spotifyUrl: undefined });
  // An explicitly invalid field is rejected; true legacy requests omit it entirely.
  assert.equal(legacy.statusCode, 400);
  const legacyResponse = response();
  await c.saveJournal({ userId: 1, params: { date: '2026-10-02' }, body: { title: '', body: 'An older client can edit.', version: '1' } }, legacyResponse);
  assert.equal(legacyResponse.body.entry.spotifyTrackId, track);
  const replaced = await save(c, { version: '2', body: 'A good day.', spotifyUrl: `https://open.spotify.com/track/${otherTrack}?si=share` });
  assert.equal(replaced.body.entry.spotifyTrackId, otherTrack);
  assert.equal((await save(c, { version: '2', spotifyUrl: '' })).statusCode, 409);
  assert.equal(db.rows[0].spotifyTrackId, otherTrack);
  const removed = await save(c, { version: '3', body: 'Keep my writing.', spotifyUrl: '' });
  assert.equal(removed.body.entry.spotifyTrackId, null); assert.equal(removed.body.entry.spotifyUrl, null);
});

test('invalid links and removal of the sole content leave the saved page unchanged', async () => {
  const db = store(), c = controller('journalController', db); await save(c);
  assert.equal((await save(c, { version: '1', spotifyUrl: 'https://example.com' })).statusCode, 400);
  assert.equal((await save(c, { version: '1', spotifyUrl: '' })).statusCode, 400);
  assert.equal(db.rows[0].spotifyTrackId, track); assert.equal(db.rows[0].version, 1);
});

test('Spotify multipart saves work with a photo and return the persisted song on authenticated reload', async t => {
  const previous = process.env.JWT_SECRET; process.env.JWT_SECRET = 'spotify-journal-test-only';
  t.after(() => { if (previous === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previous; });
  const db = store(), c = controller('journalController', db), app = express();
  const handler = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
  app.put('/journal/:date', protect, upload, handler(c.saveJournal)); app.get('/journal/:date', protect, handler(c.getJournal));
  const server = await new Promise(resolve => { const server = app.listen(0, '127.0.0.1', () => resolve(server)); });
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}/journal/2026-10-02`;
  const headers = { Authorization: 'Bearer ' + jwt.sign({ userId: 1 }, process.env.JWT_SECRET) };
  const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: 'blue' } }).png().toBuffer();
  const page = new FormData();
  for (const [name, value] of Object.entries({ title: '', body: 'A photo and a song.', version: '0', removePhoto: 'false', spotifyUrl: songUrl + '?si=share' })) page.set(name, value);
  page.set('photo', new Blob([png], { type: 'image/png' }), 'moment.png');
  const saved = await fetch(url, { method: 'PUT', headers, body: page });
  assert.equal(saved.status, 200); const entry = (await saved.json()).entry;
  assert.equal(entry.spotifyUrl, songUrl); assert.equal(entry.hasPhoto, true);
  assert.equal((await (await fetch(url, { headers })).json()).entry.spotifyTrackId, track);
});

test('journal preparation adds the Spotify column once on both new and previously prepared databases', async () => {
  const filename = path.resolve(__dirname, '../scripts/prepare-journal.js');
  for (const alreadyPrepared of [false, true]) {
    let songExists = alreadyPrepared, productTypeExists = alreadyPrepared;
    const statements = [], errors = [];
    const run = async () => {
      let done; const completed = new Promise(resolve => { done = resolve; });
      class PrismaClient {
        async $queryRawUnsafe(query) { return (query.includes("TABLE_NAME = 'JournalEntry'") ? songExists : productTypeExists) ? [{ COLUMN_NAME: 'present' }] : []; }
        async $executeRawUnsafe(sql) {
          statements.push(sql);
          if (sql.startsWith('ALTER TABLE `JournalEntry`')) { assert.equal(songExists, false); songExists = true; }
          if (sql.startsWith('ALTER TABLE `ProductDiscovery`')) { assert.equal(productTypeExists, false); productTypeExists = true; }
        }
        async $disconnect() { done(); }
      }
      vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
        __dirname: path.dirname(filename), process: { execPath: process.execPath },
        console: { log() {}, error(...args) { errors.push(args); } },
        require(name) { return name === 'dotenv' ? { config() {} } : name === 'node:child_process' ? { spawnSync() { return { status: 0 }; } } : name === '../prisma/generated/prisma' ? { PrismaClient } : require(name); },
      }, { filename });
      await completed;
    };
    await run(); await run();
    assert.equal(errors.length, 0); assert.equal(songExists, true);
    assert.equal(statements.filter(sql => sql.startsWith('ALTER TABLE `JournalEntry`')).length, alreadyPrepared ? 0 : 1);
    assert.equal(statements.some(sql => /\b(DROP|TRUNCATE|DELETE)\b/i.test(sql)), false);
  }
});
