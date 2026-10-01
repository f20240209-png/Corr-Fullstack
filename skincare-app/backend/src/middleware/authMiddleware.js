const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(503).json({ message: 'Authentication is not configured.' });
  }
  const match = /^Bearer ([^\s]+)$/i.exec(req.headers.authorization || '');
  if (!match) return res.status(401).json({ message: 'Please sign in.', code: 'AUTH_REQUIRED' });
  try {
    const decoded = jwt.verify(match[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (!Number.isInteger(decoded.userId) || decoded.userId <= 0) throw new Error('Invalid subject');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    const code = error.name === 'TokenExpiredError' ? 'SESSION_EXPIRED' : 'INVALID_TOKEN';
    res.status(401).json({ message: 'Your session has expired or is invalid. Please sign in again.', code });
  }
};

module.exports = { protect };
