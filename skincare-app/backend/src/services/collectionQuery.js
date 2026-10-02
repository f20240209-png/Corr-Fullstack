const PRODUCT_TYPES = ['cleanser', 'toner', 'serum', 'moisturiser', 'sunscreen', 'mask', 'exfoliant', 'other'];
const fail = message => { throw Object.assign(new Error(message), { status: 400 }); };
function collectionQuery(query, userId) {
  const sort = query.sort ?? 'newest';
  if (!['newest', 'oldest', 'rating', 'name'].includes(sort)) fail('Choose a valid collection order.');
  const q = query.q ?? '';
  if (typeof q !== 'string' || q.length > 120) fail('Search must be at most 120 characters.');
  const type = query.type ?? '';
  if (type && !PRODUCT_TYPES.includes(type)) fail('Choose a valid product type.');
  const minRating = query.minRating === undefined ? undefined : Number(query.minRating);
  if (minRating !== undefined && (!Number.isInteger(minRating) || minRating < 1 || minRating > 5)) fail('Choose a valid rating filter.');
  const where = { userId,
    ...(q.trim() ? { OR: [{ productName: { contains: q.trim() } }, { brand: { contains: q.trim() } }] } : {}),
    ...(type ? { productType: type } : {}), ...(minRating ? { rating: { gte: minRating } } : {}) };
  const orderBy = sort === 'rating' ? [{ rating: 'desc' }, { id: 'desc' }]
    : sort === 'name' ? [{ productName: 'asc' }, { id: 'asc' }]
    : { id: sort === 'oldest' ? 'asc' : 'desc' };
  return { where, orderBy, sort };
}
function afterCard(sort, id, anchor) {
  if (sort === 'newest') return { id: { lt: id } };
  if (sort === 'oldest') return { id: { gt: id } };
  if (!anchor) fail('This collection changed. Refresh the collection to continue.');
  if (sort === 'name') return { OR: [{ productName: { gt: anchor.productName } }, { productName: anchor.productName, id: { gt: id } }] };
  if (anchor.rating === null) return { rating: null, id: { lt: id } };
  return { OR: [{ rating: { lt: anchor.rating } }, { rating: null }, { rating: anchor.rating, id: { lt: id } }] };
}
module.exports = { PRODUCT_TYPES, collectionQuery, afterCard };
