const sharp = require('sharp');
const { createHash } = require('node:crypto');
async function prepareDiscoveryImage(file) {
  if (!file?.buffer?.length) throw Object.assign(new Error('Upload a product photo to add a discovery.'), { status: 400 });
  if (file.buffer.length > 5 * 1024 * 1024) throw Object.assign(new Error('Choose a photo smaller than 5 MB.'), { status: 413 });
  try {
    const input = sharp(file.buffer, { limitInputPixels: 16000000, failOn: 'warning' });
    const meta = await input.metadata();
    if (!['jpeg', 'png', 'webp'].includes(meta.format) || (meta.pages || 1) > 1) throw new Error('Unsupported image');
    const bytes = await input.rotate().resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    const thumbnail = await sharp(bytes).resize(420, 420, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
    return { bytes, thumbnail, imageHash: createHash('sha256').update(bytes).digest('hex') };
  } catch (_) {
    throw Object.assign(new Error('Upload a readable JPG, PNG or WebP product photo (up to 16 megapixels).'), { status: 400 });
  }
}
module.exports = { prepareDiscoveryImage };
