const problem = (status, message) => Object.assign(new Error(message), { status });
function journalDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '1900-01-01' || value > '2100-12-31') throw problem(400, 'Choose a date between 1900 and 2100.');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw problem(400, 'Choose a valid journal date.');
  return value;
}
function journalMonth(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}$/.test(value)) throw problem(400, 'Choose a valid journal month.');
  journalDate(value + '-01');
  const start = new Date(value + '-01T00:00:00Z');
  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1));
  return { gte: value + '-01', lt: end.toISOString().slice(0, 10) };
}
function journalVersion(value, allowNew = false) {
  if (typeof value !== 'string' && typeof value !== 'number') throw problem(400, 'Refresh this page before saving.');
  if (!/^\d+$/.test(String(value))) throw problem(400, 'Refresh this page before saving.');
  const version = Number(value);
  if (!Number.isSafeInteger(version) || version < (allowNew ? 0 : 1)) throw problem(400, 'Refresh this page before saving.');
  return version;
}
function journalText(body) {
  if (typeof body.title !== 'string' || typeof body.body !== 'string') throw problem(400, 'Add valid journal text.');
  if (body.title.length > 120 || body.body.length > 10000) throw problem(400, 'Use at most 120 characters for the title and 10,000 for the page.');
  if (body.removePhoto !== undefined && !['true', 'false'].includes(body.removePhoto)) throw problem(400, 'Invalid photo option.');
  return { title: body.title.trim(), body: body.body, removePhoto: body.removePhoto === 'true' };
}
module.exports = { problem, journalDate, journalMonth, journalVersion, journalText };
