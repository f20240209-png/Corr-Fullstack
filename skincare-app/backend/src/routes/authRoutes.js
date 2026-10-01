const express = require('express');
const router = express.Router();
const { register, login, googleLogin, firebaseLogin, phoneLogin, getSession } = require('../controllers/authController');

router.get('/session', require('../middleware/authMiddleware').protect, getSession);

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/firebase-login', firebaseLogin);
router.post('/phone-login', phoneLogin);

module.exports = router;