const text = (value, fallback = '') => typeof value === 'string' ? value.trim() : fallback;
const list = value => Array.isArray(value) ? value : [];
const stringList = value => list(value).filter(v => typeof v === 'string').slice(0, 20);
const parseJson = value => {
  if (typeof value !== 'string') return value;
  return JSON.parse(value.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim());
};

function normalizeRecommendation(raw, catalogue, profile) {
  const input = parseJson(raw);
  if (!input || typeof input !== 'object' || Array.isArray(input) || !input.routine || !Array.isArray(input.products)) {
    throw new Error('The AI returned an incomplete routine.');
  }
  const owned = new Set(list(parseJson(profile.currentProducts || '[]')).map(p => text(p).toLowerCase()));
  const byId = new Map(catalogue.map(p => [p.id, p]));
  const byName = new Map(catalogue.map(p => [p.name.toLowerCase(), p]));
  const seen = new Set();
  const products = input.products.map(item => {
    if (!item || typeof item !== 'object') throw new Error('Invalid product selection.');
    const product = byId.get(Number(item.id)) || byName.get(text(item.name).toLowerCase());
    if (!product) throw new Error('The AI selected a product outside the available catalogue.');
    if (seen.has(product.id)) return null;
    seen.add(product.id);
    const isCurrentProduct = owned.has(product.name.toLowerCase());
    return { ...product, reason: text(item.reason),
      howToUse: text(product.howToUse, text(item.howToUse)),
      ingredients: typeof product.ingredients === 'string' ? product.ingredients : '',
      ingredientSource: 'catalogue-unverified',
      recommended_to_buy: !isCurrentProduct, isCurrentProduct };
  }).filter(Boolean);
  const totalCost = Math.round(products.filter(p => p.recommended_to_buy)
    .reduce((sum, p) => sum + Number(p.price), 0) * 100) / 100;
  if (!Number.isFinite(totalCost) || totalCost > Number(profile.budget)) {
    throw new Error('The suggested products exceed your budget.');
  }
  const allowedNames = new Set([...owned, ...products.map(p => p.name.toLowerCase())]);
  const routine = {};
  for (const slot of ['morning', 'evening', 'weekly']) {
    const steps = input.routine[slot];
    if (!Array.isArray(steps) || (slot !== 'weekly' && steps.length === 0)) {
      throw new Error('The AI did not provide both morning and evening routines.');
    }
    routine[slot] = steps.slice(0, 12).map((step, index) => {
      if (!step || !text(step.action) || !text(step.instruction)) throw new Error('An AI routine step is incomplete.');
      const product = text(step.product);
      if (product && !allowedNames.has(product.toLowerCase())) throw new Error('A routine step references an unavailable product.');
      return { step: index + 1, action: text(step.action), instruction: text(step.instruction),
        product, duration: text(step.duration), frequency: text(step.frequency),
        isCurrentProduct: product ? owned.has(product.toLowerCase()) : false };
    });
  }
  return { routine, products, tips: stringList(input.tips), dietAdvice: text(input.dietAdvice),
    warnings: text(input.warnings), goodFoods: list(input.goodFoods).filter(f => f && typeof f.name === 'string'),
    avoidFoods: list(input.avoidFoods).filter(f => f && typeof f.name === 'string'), totalCost,
    budget: Number(profile.budget), currency: 'INR', hasCurrentProducts: owned.size > 0,
    isEffective: false, productAnalysis: null };
}

// Use the existing LONGTEXT JSON column: no new production column is required.
function serializeRecommendation(value, profile) {
  const { routine, products, ...metadata } = value;
  return {
    routine: JSON.stringify({ ...routine, _corr: { version: 1, ...metadata,
      profileUpdatedAt: new Date(profile.updatedAt).toISOString() } }),
    products: JSON.stringify(products),
  };
}
function deserializeRecommendation(row) {
  const stored = parseJson(row.routine);
  const products = parseJson(row.products);
  if (!stored || typeof stored !== 'object' || !Array.isArray(stored.morning) || !stored.morning.length ||
      !Array.isArray(stored.evening) || !stored.evening.length || !Array.isArray(products)) {
    throw new Error('Stored routine is incomplete.');
  }
  const { _corr = {}, ...routine } = stored;
  const metadata = typeof _corr === 'object' && _corr !== null ? _corr : {};
  return { id: row.id, profileId: row.profileId, createdAt: row.createdAt, updatedAt: row.updatedAt,
    tips: [], warnings: '', dietAdvice: '', goodFoods: [], avoidFoods: [],
    hasCurrentProducts: false, isEffective: false, productAnalysis: null,
    ...metadata, routine, products };
}
module.exports = { parseJson, normalizeRecommendation, serializeRecommendation, deserializeRecommendation };
