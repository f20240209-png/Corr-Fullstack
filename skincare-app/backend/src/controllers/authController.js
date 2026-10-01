const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../services/prisma');
const admin = require('../services/firebaseAdmin');


const firebaseVerificationError = (res, error) => {
  console.error('Firebase verification failed:', error.code || 'unknown');
  if (['auth/invalid-credential', 'app/invalid-credential', 'auth/internal-error'].includes(error.code)) {
    return res.status(503).json({
      message: 'Google/phone sign-in is temporarily unavailable. Please contact the app owner.',
      code: 'FIREBASE_CONFIGURATION_ERROR',
    });
  }
  return res.status(401).json({
    message: error.code === 'auth/id-token-expired'
      ? 'Your Google/phone sign-in expired. Please try signing in again.'
      : 'Unable to verify your Google/phone sign-in. Please try again.',
    code: 'INVALID_FIREBASE_TOKEN',
  });
};

// ── REGISTER (email/password) ────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (typeof name !== 'string' || !name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(400).json({ message: 'Provide a name, valid email, and a password of at least 8 characters (at most 72 bytes).' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name.trim(), email, password: hashedPassword }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── LOGIN (email/password) ───────────────────────────────────
const login = async (req, res) => {
  try {
    const { password } = req.body;
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!email || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid email or password. If you registered with Google or phone, use that sign-in method.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password. If you registered with Google or phone, use that sign-in method.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── GOOGLE LOGIN ─────────────────────────────────────────────
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'No token provided' });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);

    } catch (verifyError) {
      return firebaseVerificationError(res, verifyError);
    }

    if (decodedToken.firebase?.sign_in_provider !== 'google.com' || !decodedToken.email_verified || !decodedToken.email) {
      return res.status(401).json({ message: 'A verified Google sign-in is required.' });
    }
    const { uid: googleId, name } = decodedToken;
    const email = decodedToken.email.trim().toLowerCase();

    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] }
    });

    if (user) {
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId }
        });
      }
    } else {
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          googleId,
          password: null
        }
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Google login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.log('Google login server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── FIREBASE EMAIL LOGIN ─────────────────────────────────────
const firebaseLogin = async (req, res) => {
  try {
    const { idToken, email, name } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'No token provided' });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (verifyError) {
      return firebaseVerificationError(res, verifyError);
    }

    if (!decodedToken.email || !decodedToken.email_verified) {
      return res.status(401).json({
        message: 'Email not verified. Please check your inbox.'
      });
    }

    let user = await prisma.user.findUnique({
      where: { email: decodedToken.email.trim().toLowerCase() }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || decodedToken.name || decodedToken.email.split('@')[0],
          email: decodedToken.email.trim().toLowerCase(),
          password: null,
          googleId: decodedToken.uid,
        }
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.log('Firebase login server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── PHONE LOGIN ──────────────────────────────────────────────
const phoneLogin = async (req, res) => {
  try {
    const { idToken, name } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'No token provided' });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (verifyError) {
      return firebaseVerificationError(res, verifyError);
    }

    const phoneNumber = decodedToken.phone_number;
    if (!phoneNumber) {
      return res.status(400).json({ message: 'No phone number in token' });
    }

    let user = await prisma.user.findUnique({ where: { phoneNumber } });
    const isNewUser = !user;

    if (!user) {
      if (!name || name.trim() === '') {
        return res.status(200).json({
          requiresName: true,
          message: 'Please provide your name to complete registration',
          phoneNumber
        });
      }
      user = await prisma.user.create({
        data: {
          name: name.trim(),
          phoneNumber,
          isNewUser: true,
        }
      });
    } else {
      if (user.isNewUser) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { isNewUser: false }
        });
      }
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: isNewUser ? 'Account created successfully' : 'Login successful',
      token,
      isNewUser,
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.log('Phone login server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, phoneNumber: true },
    });
    if (!user) return res.status(401).json({ message: 'Please sign in again.', code: 'INVALID_TOKEN' });
    res.json({ user });
  } catch (error) {
    res.status(503).json({ message: 'Unable to check your session. Please try again.' });
  }
};

module.exports = { register, login, googleLogin, firebaseLogin, phoneLogin, getSession };