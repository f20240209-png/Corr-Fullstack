const multer = require('multer');
// Routine photos remain inside owner-scoped database records. Actual image
// decoding in the controller validates their format and strips metadata.
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 5, parts: 6, fieldSize: 100000 },
});
