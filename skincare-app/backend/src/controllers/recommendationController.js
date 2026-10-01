const prisma = require('../services/prisma');
const { generateSkincareRecommendation } = require('../services/aiService');
const { serializeRecommendation, deserializeRecommendation } = require('../services/recommendationData');
// Select only the original columns so partially migrated deployments remain readable.
const selection = { id: true, profileId: true, routine: true, products: true, createdAt: true, updatedAt: true };
const inFlight = new Map();

async function generateAndSave(profile) {
  const key = `${profile.id}:${new Date(profile.updatedAt).toISOString()}`;
  if (inFlight.has(key)) return inFlight.get(key);
  const work = (async () => {
    const value = await generateSkincareRecommendation(profile);
    const data = serializeRecommendation(value, profile);
    return prisma.$transaction(async tx => {
      const current = await tx.profile.findUnique({ where: { id: profile.id }, select: { updatedAt: true } });
      if (!current || new Date(current.updatedAt).getTime() !== new Date(profile.updatedAt).getTime()) {
        const error = new Error('Your profile changed during generation. Please generate again.');
        error.status = 409; error.publicMessage = error.message; throw error;
      }
      return tx.recommendation.upsert({ where: { profileId: profile.id },
        create: { profileId: profile.id, ...data }, update: data, select: selection });
    });
  })();
  inFlight.set(key, work);
  try { return await work; } finally { inFlight.delete(key); }
}
const handle = refresh => async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { userId: req.userId } });
    if (!profile) return res.status(404).json({ message: 'Please create your profile first.' });
    if (!refresh) {
      const existing = await prisma.recommendation.findUnique({ where: { profileId: profile.id }, select: selection });
      if (existing && new Date(existing.updatedAt) >= new Date(profile.updatedAt)) {
        try {
          return res.json({ recommendation: deserializeRecommendation(existing) });
        } catch { /* Regenerate a malformed legacy record without losing the profile. */ }
      }
    }
    const saved = await generateAndSave(profile);
    res.json({ message: 'Routine saved successfully.', recommendation: deserializeRecommendation(saved) });
  } catch (error) {
    console.error('Routine request failed:', error.code || error.status || error.name);
    const status = [409, 429, 502, 503].includes(error.status) ? error.status : error.status ? 503 : 500;
    const message = [409, 502, 503].includes(status) ? (error.publicMessage || 'The AI service is temporarily unavailable or misconfigured. Please try again or contact the app owner.')
      : status === 429 ? 'The AI service is busy. Please wait a moment and try again.'
      : 'Unable to load your routine. Please try again; contact the app owner if this continues.';
    res.status(status).json({ message, code: 'ROUTINE_UNAVAILABLE' });
  }
};
module.exports = { getRecommendation: handle(false), refreshRecommendation: handle(true) };
