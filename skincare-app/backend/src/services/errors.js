// Never log Prisma queries, provider responses, tokens or user-written content.
const knownCodes = new Set(['P2002', 'P2003', 'P2021', 'P2022', 'P2025', 'P1001', 'P1002',
  'auth/invalid-credential', 'app/invalid-credential', 'auth/internal-error',
  'auth/id-token-expired', 'auth/id-token-revoked', 'auth/argument-error']);
const knownNames = new Set(['TypeError', 'RangeError', 'SyntaxError', 'PrismaClientKnownRequestError',
  'PrismaClientValidationError', 'PrismaClientInitializationError', 'FirebaseError']);

function logServerError(req, error) {
  console.error(JSON.stringify({
    event: 'api_error', requestId: req.requestId || null,
    kind: knownNames.has(error?.name) ? error.name : 'Error',
    ...(knownCodes.has(error?.code) ? { code: error.code } : {}),
  }));
}
function serverError(req, res, error) {
  logServerError(req, error);
  return res.status(500).json({
    message: 'Unable to complete this request. Please try again.', code: 'REQUEST_FAILED',
    ...(req.requestId ? { requestId: req.requestId } : {}),
  });
}
module.exports = { serverError, logServerError };
