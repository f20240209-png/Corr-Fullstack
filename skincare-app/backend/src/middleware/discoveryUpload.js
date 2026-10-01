const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 8, fieldSize: 12000, parts: 9 } }).single('photo');
module.exports = (req, res, next) => upload(req, res, error => {
  if (!error) return next();
  const tooLarge = error.code === 'LIMIT_FILE_SIZE';
  res.status(tooLarge ? 413 : 400).json({ message: tooLarge ? 'Choose a photo smaller than 5 MB.' : 'Upload one product photo and valid discovery details.' });
});
