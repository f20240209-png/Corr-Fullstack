const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, searchProducts } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { checkUsername, setUsername } = require('../controllers/usernameController');


router.post('/', protect, createProfile);
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.get('/search-products', searchProducts);
router.get('/check-username', (req, res, next) => req.headers.authorization ? protect(req, res, next) : next(), checkUsername);
router.post('/username',      protect, setUsername);

module.exports = router;