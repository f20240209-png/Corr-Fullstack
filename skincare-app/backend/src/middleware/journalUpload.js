const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 6, fieldSize: 50000, parts: 7 } }).single('photo');
module.exports = (req, res, next) => upload(req, res, error => {
  if (!error) return next();
  res.status(error.code === 'LIMIT_FILE_SIZE' ? 413 : 400).json({ message: error.code === 'LIMIT_FILE_SIZE' ? 'Choose a photo smaller than 5 MB.' : 'Upload one photo and valid journal text.' });
});
