const { logServerError } = require('../services/errors');
const prisma = require('../services/prisma');
const { prepareDiscoveryImage } = require('../services/discoveryImage');
const { problem, journalDate, journalMonth, journalVersion, journalText } = require('../services/journalData');
const fields = { id: true, entryDate: true, title: true, body: true, spotifyTrackId: true, version: true, createdAt: true, updatedAt: true, image: { select: { entryId: true } } };
const decorate = entry => {
  if (!entry) return null;
  const { image, ...data } = entry;
  const spotifyTrackId = entry.spotifyTrackId ?? null;
  return { ...data, spotifyTrackId, spotifyUrl: spotifyTrackId ? `https://open.spotify.com/track/${spotifyTrackId}` : null,
    hasPhoto: Boolean(image), photoPath: image ? `/journal/${entry.entryDate}/photo?v=${entry.version}` : null };
};
function report(req, res, error) {
  if (error.code === 'P2002') return res.status(409).json({ message: 'A page was just saved for this date. Reload the saved page before editing.' });
  if ([400, 404, 409, 413].includes(error.status)) return res.status(error.status).json({ message: error.message });
  logServerError(req, error);
  return res.status(503).json({ message: 'Your journal is temporarily unavailable. Please try again.' });
}
async function listJournal(req, res) {
  try {
    const entryDate = journalMonth(req.query.month);
    const entries = await prisma.journalEntry.findMany({ where: { userId: req.userId, entryDate },
      select: { entryDate: true, title: true, version: true, image: { select: { entryId: true } } }, orderBy: { entryDate: 'asc' } });
    res.json({ entries: entries.map(({ image, ...entry }) => ({ ...entry, hasPhoto: Boolean(image) })) });
  } catch (error) { report(req, res, error); }
}
async function getJournal(req, res) {
  try {
    const entryDate = journalDate(req.params.date);
    const entry = await prisma.journalEntry.findFirst({ where: { userId: req.userId, entryDate }, select: fields });
    res.set('Cache-Control', 'private, no-store');
    res.json({ entry: decorate(entry) });
  } catch (error) { report(req, res, error); }
}
async function saveJournal(req, res) {
  try {
    const entryDate = journalDate(req.params.date), version = journalVersion(req.body.version, true);
    const { removePhoto, ...data } = journalText(req.body);
    if (removePhoto && req.file) throw problem(400, 'Choose either a replacement photo or remove photo.');
    let image = null;
    if (req.file) {
      try { image = await prepareDiscoveryImage(req.file); }
      catch (error) { if (error.status) error.message = error.message.replace(/product photo/g, 'journal photo').replace(/add a discovery/g, 'save this photo'); throw error; }
    }
    const entry = await prisma.$transaction(async tx => {
      const owned = await tx.journalEntry.findFirst({ where: { userId: req.userId, entryDate }, select: fields });
      if ((owned?.version ?? 0) !== version) throw problem(409, 'This page changed in another tab. Reload the saved page before editing. Your draft is still here.');
      const hasPhoto = Boolean(image || (!removePhoto && owned?.image));
      const hasSong = Boolean(Object.hasOwn(data, 'spotifyTrackId') ? data.spotifyTrackId : owned?.spotifyTrackId);
      if (!data.title && !data.body.trim() && !hasPhoto && !hasSong) throw problem(400, 'Write a little, add a photo or choose a song before saving this page.');
      if (!owned) return tx.journalEntry.create({ data: { userId: req.userId, entryDate, ...data, ...(image ? { image: { create: { bytes: image.bytes, thumbnail: image.thumbnail } } } : {}) }, select: fields });
      const changed = await tx.journalEntry.updateMany({ where: { id: owned.id, userId: req.userId, version }, data: { ...data, version: { increment: 1 } } });
      if (!changed.count) throw problem(409, 'This page changed. Reload it before saving. Your draft is still here.');
      if (removePhoto) await tx.journalEntryImage.deleteMany({ where: { entryId: owned.id } });
      if (image) await tx.journalEntryImage.upsert({ where: { entryId: owned.id }, create: { entryId: owned.id, bytes: image.bytes, thumbnail: image.thumbnail }, update: { bytes: image.bytes, thumbnail: image.thumbnail } });
      return tx.journalEntry.findFirst({ where: { id: owned.id, userId: req.userId }, select: fields });
    });
    res.json({ entry: decorate(entry) });
  } catch (error) { report(req, res, error); }
}
async function deleteJournal(req, res) {
  try {
    const entryDate = journalDate(req.params.date), version = journalVersion(req.query.version);
    await prisma.$transaction(async tx => {
      const owned = await tx.journalEntry.findFirst({ where: { userId: req.userId, entryDate }, select: { id: true, version: true } });
      if (!owned) throw problem(404, 'Journal page not found.');
      if (owned.version !== version) throw problem(409, 'This page changed. Reload before deleting.');
      const removed = await tx.journalEntry.deleteMany({ where: { id: owned.id, userId: req.userId, version } });
      if (!removed.count) throw problem(409, 'This page changed. Please reload.');
      await tx.journalEntryImage.deleteMany({ where: { entryId: owned.id } });
    });
    res.json({ deleted: true });
  } catch (error) { report(req, res, error); }
}
async function getJournalPhoto(req, res) {
  try {
    const entryDate = journalDate(req.params.date);
    const entry = await prisma.journalEntry.findFirst({ where: { userId: req.userId, entryDate }, select: { image: { select: req.query.size === 'thumbnail' ? { thumbnail: true } : { bytes: true } } } });
    if (!entry?.image) throw problem(404, 'Journal photo not found.');
    res.set('Cache-Control', 'private, no-store');
    res.type('image/webp').send(Buffer.from(req.query.size === 'thumbnail' ? entry.image.thumbnail : entry.image.bytes));
  } catch (error) { report(req, res, error); }
}
module.exports = { listJournal, getJournal, saveJournal, deleteJournal, getJournalPhoto };
