const { createHash } = require('node:crypto');
const { PRODUCT_TYPES } = require('./collectionQuery');
const normalise = value => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const fail = message => { throw Object.assign(new Error(message), { status: 400 }); };
function validateDiscovery(body) {
  const productName = typeof body.productName === 'string' ? body.productName.trim() : '';
  const brand = typeof body.brand === 'string' ? body.brand.trim() : '';
  const review = typeof body.review === 'string' ? body.review.trim() : '';
  if (productName.length < 2 || productName.length > 120 || !normalise(productName)) fail('Product name must be 2–120 characters.');
  if (!brand || brand.length > 80 || !normalise(brand)) fail('Add the brand (at most 80 characters).');
  if (review.length < 10 || review.length > 2000) fail('Write a review of 10–2000 characters.');
  const rating = body.rating === undefined || body.rating === null || body.rating === '' ? null : Number(body.rating);
  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) fail('Rating must be 1–5 stars.');
  const productType = body.productType ?? 'other';
  if (!PRODUCT_TYPES.includes(productType)) fail('Choose a valid product type.');
  const discoveredOn = body.discoveredOn;
  if (typeof discoveredOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(discoveredOn)) fail('Choose a valid discovery date.');
  const date = new Date(discoveredOn + 'T00:00:00Z');
  // Allow today's local date anywhere in the world, including ahead-of-UTC timezones.
  const latest = new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== discoveredOn || discoveredOn < '2000-01-01' || discoveredOn > latest) fail('Choose a valid date that is not in the future.');
  return { productName, brand, productType, review, rating, discoveredOn,
    productKey: createHash('sha256').update(JSON.stringify([normalise(brand), normalise(productName)])).digest('hex') };
}
module.exports = { validateDiscovery, normalise };
