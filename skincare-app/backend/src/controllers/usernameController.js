const prisma = require('../services/prisma');

// GET /api/profile/check-username?username=xxx
const checkUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (typeof username !== 'string' || !/^[a-zA-Z0-9_.]{3,30}$/.test(username.trim())) {
      return res.status(400).json({
        available: false,
        message: 'Use 3–30 letters, numbers, underscores or dots.',
      });
    }

    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_.]/g, '');
    if (clean !== username.trim().toLowerCase()) {
      return res.status(400).json({
        available: false,
        message: 'Only letters, numbers, underscores and dots allowed.',
      });
    }

    const existing = await prisma.user.findUnique({ where: { username: clean } });

    res.json({
      available: !existing || existing.id === req.userId,
      username:  clean,
      message:   existing && existing.id !== req.userId ? 'Username already taken.' : 'Username available!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/profile/username
const setUsername = async (req, res) => {
  try {
    const myId = req.userId;
    const { username } = req.body;

    if (typeof username !== 'string' || !/^[a-zA-Z0-9_.]{3,30}$/.test(username.trim())) {
      return res.status(400).json({ message: 'Use 3–30 letters, numbers, underscores or dots.' });
    }

    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_.]/g, '');

    const me = await prisma.user.findUnique({ where: { id: myId } });

    if (!me) return res.status(401).json({ message: 'Please sign in again.' });
    if (me.username === clean) return res.json({ message: 'Username set successfully!', username: clean });

    // Block if already changed once
    if (me?.usernameChangedAt !== null && me?.username !== null) {
      return res.status(400).json({ message: 'Username can only be changed once.' });
    }

    // Check availability
    const existing = await prisma.user.findFirst({
      where: { username: clean, id: { not: myId } },
    });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    const updated = await prisma.user.update({
      where: { id: myId },
      data: {
        username: clean,
        ...(me?.username !== null ? { usernameChangedAt: new Date() } : {}),
      },
    });

    res.json({ message: 'Username set successfully!', username: updated.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { checkUsername, setUsername };