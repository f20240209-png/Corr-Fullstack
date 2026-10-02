const { test } = require('node:test');
const assert = require('node:assert/strict');
const { store, controller, response } = require('./support/privateStore');
const fixtures = [
  { id: 1, userId: 1, productName: 'Zeta Cleanser', brand: 'Glow', productType: 'cleanser', rating: 4 },
  { id: 2, userId: 1, productName: 'Alpha Serum', brand: 'Glow', productType: 'serum', rating: 5 },
  { id: 3, userId: 1, productName: 'Beta Serum', brand: 'Other', productType: 'serum', rating: 5 },
  { id: 4, userId: 1, productName: 'Gamma Cream', brand: 'Glow', productType: 'moisturiser', rating: null },
  { id: 5, userId: 2, productName: 'Private Serum', brand: 'Glow', productType: 'serum', rating: 5 },
];
async function page(c, query) { const res = response(); await c.listDiscoveries({ userId: 1, query }, res); return res; }
test('search, type and rating operate across the collection while the score remains the full distinct count', async () => {
  const c = controller('discoveryController', store('productDiscovery', fixtures));
  const res = await page(c, { q: 'glow', type: 'serum', minRating: '4' });
  assert.equal(res.statusCode, 200); assert.equal(res.body.count, 4); assert.equal(res.body.score, 4);
  assert.equal(res.body.filteredCount, 1); assert.deepEqual(Array.from(res.body.discoveries, row => row.id), [2]);
});
test('each sort paginates without gaps or duplicated ties and keeps other users out', async () => {
  const c = controller('discoveryController', store('productDiscovery', fixtures));
  for (const [sort, expected] of [['newest', [4, 3, 2, 1]], ['oldest', [1, 2, 3, 4]], ['rating', [3, 2, 1, 4]], ['name', [2, 3, 4, 1]]]) {
    const ids = []; let before;
    do {
      const res = await page(c, { sort, limit: '1', ...(before ? { before } : {}) });
      assert.equal(res.statusCode, 200); ids.push(...res.body.discoveries.map(row => row.id)); before = res.body.nextCursor;
    } while (before);
    assert.deepEqual(ids, expected);
  }
});
test('invalid filters and foreign sort anchors fail without exposing other account cards', async () => {
  const c = controller('discoveryController', store('productDiscovery', fixtures));
  for (const query of [{ sort: 'bad' }, { type: 'bad' }, { minRating: '6' }, { q: 'x'.repeat(121) }, { sort: 'rating', before: '5' }]) {
    assert.equal((await page(c, query)).statusCode, 400);
  }
});
