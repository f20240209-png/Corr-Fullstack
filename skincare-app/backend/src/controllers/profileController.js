const prisma = require('../services/prisma');

const validProfile = (body) => {
  const { age, gender, skinType, skinGoals, budget, currentProducts, currentRoutine } = body;
  return Number.isInteger(age) && age > 0 && age <= 120 &&
    typeof gender === 'string' && gender.length > 0 && gender.length <= 30 &&
    ['oily', 'dry', 'combination', 'sensitive', 'normal'].includes(skinType) &&
    Array.isArray(skinGoals) && skinGoals.length > 0 && skinGoals.length <= 20 &&
    skinGoals.every(g => typeof g === 'string' && g.length <= 100) &&
    Number.isFinite(budget) && budget >= 0 &&
    (currentProducts == null || (Array.isArray(currentProducts) && currentProducts.length <= 50 &&
      currentProducts.every(p => typeof p === 'string' && p.length <= 200) && JSON.stringify(currentProducts).length <= 10000)) &&
    (currentRoutine == null || (typeof currentRoutine === 'string' && currentRoutine.length <= 10000));
};

// ─── Create / Update Profile (upsert) ─────────────────────────────────────
const createProfile = async (req, res) => {
  try {
    const { age, gender, skinType, skinGoals, budget, currentProducts, currentRoutine } = req.body;
    const userId = req.userId;
    if (!validProfile(req.body)) {
      return res.status(400).json({ message: 'Provide a valid age, skin type, goals and non-negative budget. Keep routine notes and the combined product names under 10,000 characters.' });
    }

    const profile = await prisma.$transaction(async (tx) => {
      const saved = await tx.profile.upsert({
      where: { userId },
      update: {
        age, gender, skinType,
        skinGoals:       JSON.stringify(skinGoals),
        budget,
        currentProducts: currentProducts ? JSON.stringify(currentProducts) : '[]',
        currentRoutine:  currentRoutine || null,
      },
      create: {
        userId, age, gender, skinType,
        skinGoals:       JSON.stringify(skinGoals),
        budget,
        currentProducts: currentProducts ? JSON.stringify(currentProducts) : '[]',
        currentRoutine:  currentRoutine || null,
      },
      });
      await tx.recommendation.deleteMany({ where: { profileId: saved.id } });
      return saved;
    });

    res.status(201).json({
      message: 'Profile saved successfully',
      profile: {
        ...profile,
        skinGoals:       JSON.parse(profile.skinGoals),
        currentProducts: profile.currentProducts ? JSON.parse(profile.currentProducts) : [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── Get Profile ───────────────────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    // DO NOT include recommendation here — it has new fields that may not
    // be migrated on production DB yet. Recommendation is fetched separately.
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      ...profile,
      skinGoals:       JSON.parse(profile.skinGoals),
      currentProducts: profile.currentProducts
          ? JSON.parse(profile.currentProducts)
          : [],
    });
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── Update Profile ────────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
  try {
    const { age, gender, skinType, skinGoals, budget, currentProducts, currentRoutine } = req.body;
    const userId = req.userId;
    if (!validProfile(req.body)) {
      return res.status(400).json({ message: 'Provide a valid age, skin type, goals and non-negative budget. Keep routine notes and the combined product names under 10,000 characters.' });
    }

    const profile = await prisma.$transaction(async (tx) => {
      const saved = await tx.profile.upsert({
      where: { userId },
      update: {
        age, gender, skinType,
        skinGoals:       JSON.stringify(skinGoals),
        budget,
        currentProducts: currentProducts ? JSON.stringify(currentProducts) : '[]',
        currentRoutine:  currentRoutine || null,
      },
      create: {
        userId, age, gender, skinType,
        skinGoals:       JSON.stringify(skinGoals),
        budget,
        currentProducts: currentProducts ? JSON.stringify(currentProducts) : '[]',
        currentRoutine:  currentRoutine || null,
      },
      });
      await tx.recommendation.deleteMany({ where: { profileId: saved.id } });
      return saved;
    });

    res.json({
      message: 'Profile updated successfully',
      profile: {
        ...profile,
        skinGoals:       JSON.parse(profile.skinGoals),
        currentProducts: profile.currentProducts
            ? JSON.parse(profile.currentProducts)
            : [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── Search Products ───────────────────────────────────────────────────────
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.json({ products: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { brand: { contains: query } },
          { category: { contains: query } },
        ],
      },
      select: { id: true, name: true, brand: true, category: true, price: true },
      take: 10,
    });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createProfile, getProfile, updateProfile, searchProducts };