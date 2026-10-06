const express = require('express');
const { protect } = require('./middleware/authMiddleware');
const { configureSecurity, privateResponse, apiErrorHandler } = require('./middleware/security');
const { createLimiter, authLimiter, registrationLimiter, uploadLimiter } = require('./middleware/rateLimits');
const { uploadWorkGuard } = require('./middleware/uploadWorkGuard');
function defaultRoutes() {
  return {
    '/auth': require('./routes/authRoutes'), '/profile': require('./routes/profileRoutes'),
    '/recommendations': require('./routes/recommendationRoutes'), '/logs': require('./routes/skincareLogRoutes'),
    '/discoveries': require('./routes/discoveryRoutes'), '/journal': require('./routes/journalRoutes'),
    '/community': require('./routes/communityRoutes'),
    '/': [require('./routes/ingredientRoutes'), require('./routes/friendRoutes')],
  };
}
function createApp({ env = process.env, routes, apiLimit = {} } = {}) {
  const app = express();
  configureSecurity(app, env);
  app.use('/api', privateResponse, createLimiter({ limit: 600, windowMs: 15 * 60 * 1000, scope: 'api', ...apiLimit }));
  // Throttle before reading bodies or contacting Firebase.
  app.use('/api/auth', (req, res, next) => req.method === 'POST' ? authLimiter(req, res, next) : next());
  app.post('/api/auth/register', registrationLimiter);
  app.use('/api/auth', express.json({ limit: '32kb' }));
  // Legacy Flutter log photos use JSON/base64. Authenticate and throttle before
  // parsing the larger payload; other JSON endpoints have a smaller limit.
  app.use('/api/logs', protect,
    (req, res, next) => req.method === 'POST' ? uploadLimiter(req, res, next) : next(),
    (req, res, next) => req.method === 'POST' ? uploadWorkGuard(req, res, next) : next(),
    express.json({ limit: '8mb' }));
  app.use(express.json({ limit: '128kb' }));
  app.use((req, res, next) => { req.body ??= {}; next(); });
  app.get('/', (req, res) => res.json({ message: 'Skincare App API is running!' }));
  for (const [prefix, router] of Object.entries(routes || defaultRoutes())) app.use('/api' + prefix, router);
  // Private upload files must never be exposed through a public static mount.
  app.use((req, res) => res.status(404).json({ message: 'Page not found.', code: 'NOT_FOUND' }));
  app.use(apiErrorHandler);
  return app;
}
module.exports = { createApp };
