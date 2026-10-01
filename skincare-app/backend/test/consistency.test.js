const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildConsistency, dateKey, sessionsForLog } = require('../src/services/consistency');
const now = new Date('2026-10-01T12:00:00Z');
const log = (date, slot, products = []) => ({ createdAt: `${date}T06:00:00Z`, timeOfDay: slot, productsUsed: JSON.stringify(products) });

test('combined Flutter logs count morning plus evening/night; repeated entries do not inflate completion', () => {
  const value = buildConsistency([
    log('2026-10-01', 'combined', ['Morning: Cleanser', 'Night: Moisturiser', 'Evening: Product']),
    log('2026-10-01', 'morning'),
  ], 2026, 10, { now });
  assert.equal(value.heatmapData[0].status, 2);
  assert.equal(value.currentStreak, 1);
  assert.equal(value.completedDays, 1);
});

test('yesterday streak persists until today ends; gaps still end a streak', () => {
  const value = buildConsistency([log('2026-09-30', 'morning'), log('2026-09-29', 'night'), log('2026-09-27', 'morning')], 2026, 9, { now });
  assert.equal(value.currentStreak, 2);
});

test('empty month produces a calendar, not an error; leap years and future days are handled', () => {
  const value = buildConsistency([], 2024, 2, { now });
  assert.equal(value.heatmapData.length, 29);
  assert.equal(value.currentStreak, 0);
  assert.ok(value.heatmapData.every(d => d.status === 0));
  const future = buildConsistency([log('2026-10-02', 'morning')], 2026, 10, { now });
  assert.equal(future.heatmapData[1].status, 0);
});

test('Australian timezone uses historical daylight-saving offsets', () => {
  assert.equal(dateKey('2026-10-03T13:30:00Z', 'Australia/Melbourne'), '2026-10-03');
  assert.equal(dateKey('2026-10-04T13:30:00Z', 'Australia/Melbourne'), '2026-10-05');
  assert.equal(dateKey('2026-10-01T23:00:00Z', undefined, 120), '2026-10-02');
});

test('legacy malformed and unrecognised sessions do not crash the chart', () => {
  assert.deepEqual(sessionsForLog({ timeOfDay: null }), []);
  assert.deepEqual(sessionsForLog({ timeOfDay: 'combined', productsUsed: 'broken json' }), []);
  const value = buildConsistency([{ createdAt: 'bad date', timeOfDay: null }], 2026, 10, { now });
  assert.equal(value.currentStreak, 0);
});
