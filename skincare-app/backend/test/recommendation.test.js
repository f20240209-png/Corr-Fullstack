const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeRecommendation, serializeRecommendation, deserializeRecommendation } = require('../src/services/recommendationData');
const catalogue = [{ id: 1, name: 'Catalogue Cleanser', brand: 'Actual Brand', price: 250,
  originalPrice: 300, ingredients: 'Ingredients in catalogue', howToUse: 'Catalogue instructions' }];
const profile = { id: 2, budget: 300, currentProducts: '[]', updatedAt: new Date('2026-10-01T00:00:00Z') };
const input = () => ({ routine: {
  morning: [{ action: 'Cleanse', instruction: 'Use as labelled.', product: 'Catalogue Cleanser' }],
  evening: [{ action: 'Cleanse', instruction: 'Use as labelled.', product: 'Catalogue Cleanser' }], weekly: [],
}, products: [{ id: 1, name: 'AI wrong name', brand: 'AI wrong brand', price: 1, reason: 'Selected for routine' }],
 tips: ['One tip'], warnings: 'One warning', dietAdvice: 'One note', goodFoods: [{ name: 'Example', benefit: 'Example' }] });

test('catalogue replaces hallucinated names, prices and ingredient fields; costs are counted once', () => {
  const raw = input(); raw.products.push({ id: 1 });
  const result = normalizeRecommendation(raw, catalogue, profile);
  assert.equal(result.products[0].name, 'Catalogue Cleanser');
  assert.equal(result.products[0].price, 250);
  assert.equal(result.products[0].brand, 'Actual Brand');
  assert.equal(result.totalCost, 250);
  assert.equal(result.products.length, 1);
});

test('budget violations, unknown products, incomplete steps and broken JSON are rejected', () => {
  assert.throws(() => normalizeRecommendation(input(), catalogue, { ...profile, budget: 200 }), /budget/);
  const unknown = input(); unknown.products = [{ id: 99, name: 'Invented' }];
  assert.throws(() => normalizeRecommendation(unknown, catalogue, profile), /catalogue/);
  const missing = input(); missing.routine.evening = [];
  assert.throws(() => normalizeRecommendation(missing, catalogue, profile), /morning and evening/);
  assert.throws(() => normalizeRecommendation('invalid json', catalogue, profile));
});

test('owned products are not counted as a new purchase', () => {
  const result = normalizeRecommendation(input(), catalogue, { ...profile, budget: 0, currentProducts: '["Catalogue Cleanser"]' });
  assert.equal(result.totalCost, 0);
  assert.equal(result.products[0].recommended_to_buy, false);
});

test('all tips, warnings, costs and analysis metadata survive storage and reload', () => {
  const result = normalizeRecommendation(input(), catalogue, profile);
  result.productAnalysis = { verdict: 'UNKNOWN', analysis: [], summary: 'Not enough information' };
  const stored = serializeRecommendation(result, profile);
  const loaded = deserializeRecommendation({ id: 3, profileId: 2, ...stored });
  assert.deepEqual(loaded.tips, result.tips);
  assert.deepEqual(loaded.goodFoods, result.goodFoods);
  assert.deepEqual(loaded.productAnalysis, result.productAnalysis);
  assert.equal(loaded.warnings, result.warnings);
  assert.equal(loaded.dietAdvice, result.dietAdvice);
  assert.equal(loaded.totalCost, 250);
  assert.equal(loaded.routine._corr, undefined);
});

test('legacy routine JSON remains readable', () => {
  const loaded = deserializeRecommendation({ id: 1, routine: JSON.stringify(input().routine), products: '[]' });
  assert.ok(loaded.routine.morning.length);
  assert.deepEqual(loaded.tips, []);
});

test('incomplete cached JSON is rejected so the controller can regenerate it', () => {
  assert.throws(() => deserializeRecommendation({ routine: '{}', products: '[]' }), /incomplete/);
});
