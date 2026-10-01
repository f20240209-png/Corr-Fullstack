const prisma = require('../services/prisma');
const parseProducts = value => {
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; }
  catch { return []; }
};

// ─── Existing: Create Log ───────────────────────────────────────────────────
const createLog = async (req, res) => {
  try {
    const userId = req.userId;
    const { timeOfDay, productsUsed, notes, photo } = req.body;

    if (!['morning', 'evening', 'night', 'combined'].includes(timeOfDay) ||
        !Array.isArray(productsUsed) || !productsUsed.length || productsUsed.length > 100 ||
        !productsUsed.every(p => typeof p === 'string' && p.trim() && p.length <= 250) ||
        (notes != null && typeof notes !== 'string') || (photo != null && typeof photo !== 'string')) {
      return res.status(400).json({ message: 'Provide valid session products, notes and photo.' });
    }
    if (timeOfDay === 'combined' && !productsUsed.every(p => /^(morning|evening|night)\s*:/i.test(p))) {
      return res.status(400).json({ message: 'Combined logs must label each product with its session.' });
    }
    const log = await prisma.skincareLog.create({
      data: {
        userId,
        timeOfDay,
        productsUsed: JSON.stringify(productsUsed),
        notes: notes || null,
        photo: photo || null,
      },
    });

    res.status(201).json({
      message: 'Skincare log saved!',
      log: { ...log, productsUsed: parseProducts(log.productsUsed) },
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save or load skincare logs. Please try again.' });
  }
};

// ─── Existing: Get All Logs ─────────────────────────────────────────────────
const getLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const logs = await prisma.skincareLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      logs: logs.map((log) => ({
        ...log,
        productsUsed: parseProducts(log.productsUsed),
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save or load skincare logs. Please try again.' });
  }
};

const { buildConsistency } = require('../services/consistency');
const getMonthlyHeatmap = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const offsetMinutes = Number(req.query.offsetMinutes || 0);
    const timeZone = typeof req.query.timeZone === 'string' ? req.query.timeZone : undefined;
    if (!Number.isInteger(year) || year < 2000 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12 ||
        !Number.isInteger(offsetMinutes) || offsetMinutes < -840 || offsetMinutes > 840) {
      return res.status(400).json({ message: 'Provide a valid year, month and timezone.' });
    }
    if (timeZone) {
      try { new Intl.DateTimeFormat('en', { timeZone }); }
      catch { return res.status(400).json({ message: 'Invalid timezone.' }); }
    }
    const logs = await prisma.skincareLog.findMany({ where: { userId: req.userId },
      select: { createdAt: true, timeOfDay: true, productsUsed: true } });
    res.json(buildConsistency(logs, year, month, { timeZone, offsetMinutes }));
  } catch (error) {
    console.error('Consistency request failed:', error.code || error.name);
    res.status(500).json({ message: 'Unable to load consistency data. Please try again.', code: 'CONSISTENCY_UNAVAILABLE' });
  }
};
module.exports = { createLog, getLogs, getMonthlyHeatmap };
