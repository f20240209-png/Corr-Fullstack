function dateKey(date, timeZone, offsetMinutes = 0) {
  if (timeZone) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(date));
    const get = type => parts.find(p => p.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  }
  return new Date(new Date(date).getTime() + offsetMinutes * 60000).toISOString().slice(0, 10);
}
function previousDay(key) {
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}
function sessionsForLog(log) {
  const slot = String(log.timeOfDay || '').trim().toLowerCase();
  if (slot === 'morning') return ['morning'];
  if (slot === 'evening' || slot === 'night') return ['evening'];
  if (slot !== 'combined') return [];
  let products = log.productsUsed;
  try { if (typeof products === 'string') products = JSON.parse(products); } catch { products = []; }
  const slots = new Set();
  for (const product of Array.isArray(products) ? products : []) {
    if (typeof product !== 'string') continue;
    if (/^morning\s*:/i.test(product)) slots.add('morning');
    if (/^(evening|night)\s*:/i.test(product)) slots.add('evening');
  }
  return [...slots];
}
function buildConsistency(logs, year, month, { timeZone, offsetMinutes = 0, now = new Date() } = {}) {
  const sessions = new Map();
  for (const log of logs) {
    if (!Number.isFinite(new Date(log.createdAt).getTime())) continue;
    const key = dateKey(log.createdAt, timeZone, offsetMinutes);
    const slots = sessionsForLog(log);
    if (!slots.length) continue;
    if (!sessions.has(key)) sessions.set(key, new Set());
    for (const slot of slots) sessions.get(key).add(slot);
  }
  const today = dateKey(now, timeZone, offsetMinutes);
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const heatmapData = Array.from({ length: days }, (_, index) => {
    const date = `${prefix}-${String(index + 1).padStart(2, '0')}`;
    return { date, dayNumber: index + 1, status: date > today ? 0 : (sessions.get(date)?.size || 0) };
  });
  let cursor = sessions.has(today) ? today : previousDay(today);
  let currentStreak = 0;
  while (sessions.has(cursor)) { currentStreak++; cursor = previousDay(cursor); }
  return { heatmapData, currentStreak, loggedDays: heatmapData.filter(d => d.status > 0).length,
    completedDays: heatmapData.filter(d => d.status === 2).length, today };
}
module.exports = { dateKey, previousDay, sessionsForLog, buildConsistency };
