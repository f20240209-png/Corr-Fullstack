const { randomUUID } = require('node:crypto');
const cors = require('cors');
const helmet = require('helmet');
const { logServerError, serverError } = require('../services/errors');
const frontendOrigin = 'https://inquisitive-clafoutis-600746.netlify.app';

function configureSecurity(app, env) {
  const production = env.NODE_ENV === 'production' || env.RENDER === 'true';
  const configuredHops = env.TRUST_PROXY_HOPS ?? (env.RENDER === 'true' ? '1' : '0');
  if (!/^[0-3]$/.test(String(configuredHops))) {
    throw new Error('TRUST_PROXY_HOPS must be 0, 1, 2 or 3. Never trust every forwarded IP.');
  }
  app.set('trust proxy', Number(configuredHops));
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    req.requestId = randomUUID(); res.set('X-Request-Id', req.requestId); next();
  });
  app.use(helmet({
    // This JSON API and the Flutter document have separate security policies.
    contentSecurityPolicy: { useDefaults: false, directives: {
      defaultSrc: ["'none'"], baseUri: ["'none'"], frameAncestors: ["'none'"],
    } },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    strictTransportSecurity: production ? { maxAge: 15552000, includeSubDomains: false } : false,
  }));
  const origins = new Set([frontendOrigin]);
  for (const entry of (env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)) {
    let url;
    try { url = new URL(entry); } catch { throw new Error('CORS_ORIGINS must contain complete frontend origins.'); }
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== entry || url.username || url.password ||
        (production && url.protocol !== 'https:')) {
      throw new Error('Use exact HTTPS origins in production CORS_ORIGINS, without paths or wildcards.');
    }
    origins.add(entry);
  }
  app.use(cors({
    origin(origin, callback) {
      if (!origin || origins.has(origin) || (!production && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) {
        return callback(null, true);
      }
      const error = new Error('Origin denied'); error.code = 'CORS_DENIED'; return callback(error);
    },
    credentials: false, // Corr currently uses Authorization: Bearer, not cookies.
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Retry-After', 'RateLimit', 'RateLimit-Policy', 'X-Request-Id'],
    maxAge: 600,
  }));
}
function privateResponse(req, res, next) { res.set('Cache-Control', 'private, no-store'); next(); }
function apiErrorHandler(error, req, res, next) {
  if (res.headersSent) { logServerError(req, error); res.destroy(); return; }
  if (error.code === 'CORS_DENIED') return res.status(403).json({ message: 'This origin is not allowed.', code: 'ORIGIN_DENIED' });
  if (error.type === 'entity.too.large' || error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'This request is too large. Choose a smaller photo or shorten the text.', code: 'PAYLOAD_TOO_LARGE' });
  }
  if (error.type === 'entity.parse.failed') return res.status(400).json({ message: 'Send valid JSON.', code: 'INVALID_JSON' });
  if (error.type === 'encoding.unsupported' || error.type === 'charset.unsupported') {
    return res.status(415).json({ message: 'Use a supported request encoding.', code: 'UNSUPPORTED_ENCODING' });
  }
  if (error.name === 'MulterError') return res.status(400).json({ message: 'Upload one photo with valid details.', code: 'INVALID_UPLOAD' });
  if (res.destroyed) { logServerError(req, error); return; }
  return serverError(req, res, error);
}
module.exports = { configureSecurity, privateResponse, apiErrorHandler };
