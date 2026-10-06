// Bound memory use while reading and decoding photos. Rate limits alone cannot
// prevent a burst of simultaneous large uploads from exhausting a small server.
function createUploadWorkGuard(maxActive = 2) {
  const active = new Set();
  return (req, res, next) => {
    if (!Number.isInteger(req.userId)) return res.status(401).json({ message: 'Please sign in.' });
    if (active.has(req.userId) || active.size >= maxActive) {
      res.set('Retry-After', '3');
      return res.status(429).json({ message: 'Another save is in progress. Please wait a moment.', code: 'UPLOAD_BUSY', retryAfterSeconds: 3 });
    }
    active.add(req.userId);
    const release = () => {
      active.delete(req.userId); res.off('finish', release); res.off('close', release);
    };
    res.once('finish', release); res.once('close', release);
    next();
  };
}
module.exports = { createUploadWorkGuard, uploadWorkGuard: createUploadWorkGuard() };
