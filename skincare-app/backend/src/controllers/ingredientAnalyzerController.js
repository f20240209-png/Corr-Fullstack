const prisma = require('../services/prisma');
const aliases = { 'ascorbic acid': 'vitamin c', 'salicylic acid': 'bha', 'glycolic acid': 'aha', 'lactic acid': 'aha' };
const normalize = value => {
  const clean = value.toLowerCase().replace(/\([^)]*\)/g, '').trim().replace(/\s+/g, ' ');
  return aliases[clean] || clean;
};
const analyzeRoutine = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || !ingredients.length || ingredients.length > 200 ||
        !ingredients.every(i => typeof i === 'string' && i.trim() && i.length <= 200)) {
      return res.status(400).json({ message: 'Provide non-empty ingredient names.' });
    }
    const terms = new Set(ingredients.map(normalize).filter(Boolean));
    const all = await prisma.ingredient_Conflict.findMany();
    const found = all.filter(c => terms.has(normalize(c.ingredientA)) && terms.has(normalize(c.ingredientB)) &&
      normalize(c.ingredientA) !== normalize(c.ingredientB));
    const rank = { high: 3, medium: 2, low: 1 };
    found.sort((a, b) => (rank[b.severityLevel.toLowerCase()] || 0) - (rank[a.severityLevel.toLowerCase()] || 0));
    res.json({ totalIngredients: terms.size, totalConflicts: found.length, conflicts: found,
      safe: null, coverage: 'known-database-pairs',
      message: 'This checks listed database pairs only. No detected conflict does not establish product safety or compatibility.' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to check ingredients. Please try again.' });
  }
};
module.exports = { analyzeRoutine };
