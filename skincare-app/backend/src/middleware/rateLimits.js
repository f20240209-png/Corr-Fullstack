const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

function createLimiter({ limit, windowMs, scope, account = false, message = 'Too many requests.', ...overrides }) {
  return rateLimit({
    limit, windowMs, identifier: scope, standardHeaders: 'draft-8', legacyHeaders: false,
    // Account keys come from verified JWTs, never from client-supplied IDs.
    keyGenerator: req => account && Number.isInteger(req.userId)
      ? `account:${req.userId}` : ipKeyGenerator(req.ip),
    skip: req => req.method === 'OPTIONS',
    handler: (req, res) => res.status(429).json({
      message, code: 'RATE_LIMITED',
      retryAfterSeconds: Math.max(1, Math.ceil((req.rateLimit.resetTime.getTime() - Date.now()) / 1000)),
    }),
    ...overrides,
  });
}
const authLimiter = createLimiter({ limit: 30, windowMs: 15 * 60 * 1000, scope: 'sign-in', message: 'Too many sign-in attempts.' });
const registrationLimiter = createLimiter({ limit: 8, windowMs: 60 * 60 * 1000, scope: 'registration' });
const generationLimiter = createLimiter({ limit: 6, windowMs: 60 * 60 * 1000, scope: 'ai-generation', account: true, message: 'Too many routine generation requests.' });
const uploadLimiter = createLimiter({ limit: 30, windowMs: 60 * 60 * 1000, scope: 'photo-writes', account: true });
const socialWriteLimiter = createLimiter({ limit: 60, windowMs: 15 * 60 * 1000, scope: 'social-writes', account: true });
const searchLimiter = createLimiter({ limit: 60, windowMs: 15 * 60 * 1000, scope: 'user-search', account: true });

// Only actual AI calls consume this limit; reading a saved routine stays free.
function allowGeneration(req, res) {
  return new Promise((resolve, reject) => {
    const stopped = () => finish(false);
    const finish = (allowed, error) => {
      res.off('finish', stopped); res.off('close', stopped);
      if (error) reject(error); else resolve(allowed);
    };
    res.once('finish', stopped); res.once('close', stopped);
    Promise.resolve(generationLimiter(req, res, error => finish(!error, error)))
      .catch(error => finish(false, error));
  });
}
module.exports = { createLimiter, authLimiter, registrationLimiter, uploadLimiter,
  socialWriteLimiter, searchLimiter, allowGeneration };
