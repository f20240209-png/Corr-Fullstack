const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
function matches(row, where = {}) {
  return Object.entries(where).every(([key, value]) => {
    if (key === 'AND') return value.every(item => matches(row, item));
    if (key === 'OR') return value.some(item => matches(row, item));
    if (value && typeof value === 'object') return Object.entries(value).every(([op, term]) => {
      if (op === 'contains') return String(row[key]).toLowerCase().includes(term.toLowerCase());
      if (row[key] === null) return false;
      const current = typeof row[key] === 'string' ? row[key].toLowerCase() : row[key];
      const comparison = typeof term === 'string' ? term.toLowerCase() : term;
      return op === 'lt' ? current < comparison : op === 'gt' ? current > comparison
        : op === 'gte' ? current >= comparison : op === 'lte' ? current <= comparison : false;
    });
    return typeof row[key] === 'string' && typeof value === 'string'
      ? row[key].toLowerCase() === value.toLowerCase() : row[key] === value;
  });
}
function store(model = 'journalEntry', fixtures = []) {
  let rows = fixtures.map(row => ({ ...row })), photos = new Map(), next = 1;
  const photoKey = model === 'journalEntry' ? 'entryId' : 'discoveryId';
  function project(row, select) {
    const value = { ...row, image: photos.get(row.id) ?? null };
    if (!select) return value;
    return Object.fromEntries(Object.entries(select).map(([key, field]) => [key,
      field === true ? value[key] : value[key] ? Object.fromEntries(Object.keys(field.select).map(k => [k, value[key][k]])) : null]));
  }
  const db = {
    [model]: {
      async findFirst({ where, select }) { const row = rows.find(row => matches(row, where)); return row ? project(row, select) : null; },
      async count({ where }) { return rows.filter(row => matches(row, where)).length; },
      async findMany({ where, select, orderBy, take }) {
        const orders = Array.isArray(orderBy) ? orderBy : [orderBy];
        return rows.filter(row => matches(row, where)).sort((a, b) => {
          for (const order of orders) {
            const [key, direction] = Object.entries(order)[0];
            const av = a[key], bv = b[key];
            let comparison = av === bv ? 0 : av == null ? -1 : bv == null ? 1
              : typeof av === 'string' ? av.toLowerCase().localeCompare(bv.toLowerCase()) : av < bv ? -1 : 1;
            if (direction === 'desc') comparison *= -1;
            if (comparison) return comparison;
          } return 0;
        }).slice(0, take ?? rows.length).map(row => project(row, select));
      },
      async create({ data, select }) {
        if (rows.some(row => row.userId === data.userId && row.entryDate === data.entryDate)) throw Object.assign(new Error('duplicate'), { code: 'P2002' });
        const { image, ...rest } = data;
        const row = { id: next++, version: 1, createdAt: new Date(), updatedAt: new Date(), ...rest };
        rows.push(row);
        if (image) photos.set(row.id, { [photoKey]: row.id, ...image.create });
        return project(row, select);
      },
      async updateMany({ where, data }) {
        const row = rows.find(row => matches(row, where));
        if (!row) return { count: 0 };
        Object.assign(row, { ...data, version: row.version + 1 }); return { count: 1 };
      },
      async deleteMany({ where }) { const original = rows.length; rows = rows.filter(row => !matches(row, where)); return { count: original - rows.length }; },
    },
    [model + 'Image']: {
      async upsert({ where, create, update }) { const id = where[photoKey]; photos.set(id, photos.has(id) ? { [photoKey]: id, ...update } : create); },
      async deleteMany({ where }) { photos.delete(where[photoKey]); },
    },
    async $transaction(work) {
      const original = rows.map(row => ({ ...row })), previousPhotos = new Map(photos), previousNext = next;
      try { return await work(db); }
      catch (error) { rows = original; photos = previousPhotos; next = previousNext; throw error; }
    },
    get rows() { return rows; }, get photos() { return photos; },
  };
  return db;
}
function controller(name, db) {
  const filename = path.resolve(__dirname, '../../src/controllers/' + name + '.js');
  const realRequire = createRequire(filename), module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), { module, exports: module.exports, Buffer,
    console: { error() {} }, require(file) { return file === '../services/prisma' ? db : realRequire(file); } }, { filename });
  return module.exports;
}
function response() {
  return { statusCode: 200, headers: {}, status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; }, set(key, value) { this.headers[key] = value; return this; },
    type(value) { this.mime = value; return this; }, send(bytes) { this.bytes = bytes; return this; } };
}
module.exports = { store, controller, response };
