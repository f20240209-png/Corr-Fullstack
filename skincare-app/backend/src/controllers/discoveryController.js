const prisma = require('../services/prisma');
const { validateDiscovery } = require('../services/discoveryData');
const { prepareDiscoveryImage } = require('../services/discoveryImage');
const fields = { id: true, productName: true, brand: true, review: true, rating: true, discoveredOn: true, version: true, createdAt: true, updatedAt: true };
const problem = (status, message) => Object.assign(new Error(message), { status });
const idFrom = value => { const id = Number(value); if (!Number.isSafeInteger(id) || id <= 0) throw problem(400, 'Invalid discovery.'); return id; };
function report(res, error) {
  if (error.code === 'P2002') return res.status(409).json({ message: 'This product or photo is already in your collection. Edit its existing card instead.' });
  if (error.status) return res.status(error.status).json({ message: error.message });
  console.error('Discovery request failed:', error.code || error.name);
  return res.status(503).json({ message: 'Your collection is temporarily unavailable. Please try again.' });
}
const decorate = item => ({ ...item, imagePath: `/discoveries/${item.id}/photo?v=${item.version}`, thumbnailPath: `/discoveries/${item.id}/photo?size=thumbnail&v=${item.version}` });
async function listDiscoveries(req, res) {
  try {
    const limit = req.query.limit === undefined ? 24 : Number(req.query.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw problem(400, 'Invalid collection page size.');
    const before = req.query.before === undefined ? undefined : idFrom(req.query.before);
    const result = await prisma.$transaction(async tx => {
      const count = await tx.productDiscovery.count({ where: { userId: req.userId } });
      const rows = await tx.productDiscovery.findMany({ where: { userId: req.userId, ...(before ? { id: { lt: before } } : {}) }, select: fields, orderBy: { id: 'desc' }, take: limit + 1 });
      const more = rows.length > limit;
      const items = rows.slice(0, limit);
      return { discoveries: items.map(decorate), count, score: count, nextCursor: more ? items[items.length - 1].id : null };
    });
    res.json(result);
  } catch (error) { report(res, error); }
}
async function createDiscovery(req, res) {
  try {
    const data = validateDiscovery(req.body);
    const { bytes, thumbnail, imageHash } = await prepareDiscoveryImage(req.file);
    const item = await prisma.productDiscovery.create({ data: { ...data, imageHash, userId: req.userId, image: { create: { bytes, thumbnail } } }, select: fields });
    res.status(201).json({ discovery: decorate(item) });
  } catch (error) { report(res, error); }
}
async function updateDiscovery(req, res) {
  try {
    const id = idFrom(req.params.id);
    const owned = await prisma.productDiscovery.findFirst({ where: { id, userId: req.userId }, select: { id: true } });
    if (!owned) throw problem(404, 'Discovery not found.');
    const data = validateDiscovery(req.body), version = idFrom(req.body.version);
    const image = req.file ? await prepareDiscoveryImage(req.file) : null;
    const item = await prisma.$transaction(async tx => {
      const updated = await tx.productDiscovery.updateMany({ where: { id, userId: req.userId, version }, data: { ...data, ...(image ? { imageHash: image.imageHash } : {}), version: { increment: 1 } } });
      if (!updated.count) throw problem(409, 'This card changed. Refresh your collection before editing again.');
      if (image) await tx.productDiscoveryImage.update({ where: { discoveryId: id }, data: { bytes: image.bytes, thumbnail: image.thumbnail } });
      return tx.productDiscovery.findFirst({ where: { id, userId: req.userId }, select: fields });
    });
    res.json({ discovery: decorate(item) });
  } catch (error) { report(res, error); }
}
async function deleteDiscovery(req, res) {
  try {
    const id = idFrom(req.params.id), version = idFrom(req.query.version);
    await prisma.$transaction(async tx => {
      const item = await tx.productDiscovery.findFirst({ where: { id, userId: req.userId }, select: { version: true } });
      if (!item) throw problem(404, 'Discovery not found.');
      if (item.version !== version) throw problem(409, 'This card changed. Refresh your collection before deleting again.');
      const removed = await tx.productDiscovery.deleteMany({ where: { id, userId: req.userId, version } });
      if (!removed.count) throw problem(409, 'This card changed. Please refresh.');
      // Explicit cleanup also covers relationMode=prisma where deleteMany does not emulate cascades.
      await tx.productDiscoveryImage.deleteMany({ where: { discoveryId: id } });
    });
    res.json({ deleted: true });
  } catch (error) { report(res, error); }
}
async function getDiscoveryPhoto(req, res) {
  try {
    const id = idFrom(req.params.id);
    const item = await prisma.productDiscovery.findFirst({ where: { id, userId: req.userId }, select: { image: { select: req.query.size === 'thumbnail' ? { thumbnail: true } : { bytes: true } } } });
    if (!item?.image) throw problem(404, 'Photo not found.');
    res.set('Cache-Control', 'private, no-store');
    res.type('image/webp').send(Buffer.from(req.query.size === 'thumbnail' ? item.image.thumbnail : item.image.bytes));
  } catch (error) { report(res, error); }
}
module.exports = { listDiscoveries, createDiscovery, updateDiscovery, deleteDiscovery, getDiscoveryPhoto };
