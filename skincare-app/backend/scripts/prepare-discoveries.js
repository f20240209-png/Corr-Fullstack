// Additive setup for existing installations. Does not reset data or rewrite migration history.
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.$queryRawUnsafe("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'User'");
  if (!user.length) throw new Error('Existing Corr User table is required.');
  const sql = fs.readFileSync(path.join(__dirname, '../prisma/migrations/20261001131500_product_discoveries/migration.sql'), 'utf8');
  for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) await prisma.$executeRawUnsafe(statement);
  console.log('Corr discovery tables are ready. Existing records retained.');
}
main().catch(() => { console.error('Discovery setup failed. Check database permissions and schema. No data reset was attempted.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
