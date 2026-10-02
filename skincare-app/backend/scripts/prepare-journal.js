// Additive upgrade for existing Corr databases; safe to run again. Never resets records.
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const prep = spawnSync(process.execPath, [path.join(__dirname, 'prepare-discoveries.js')], { stdio: 'inherit' });
  if (prep.status !== 0) throw new Error('Discovery preparation failed.');
  const columns = await prisma.$queryRawUnsafe("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ProductDiscovery' AND COLUMN_NAME = 'productType'");
  const sql = fs.readFileSync(path.join(__dirname, '../prisma/migrations/20261002110000_collection_journal/migration.sql'), 'utf8');
  for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) {
    if (statement.startsWith('ALTER TABLE') && columns.length) continue;
    await prisma.$executeRawUnsafe(statement);
  }
  const songColumn = await prisma.$queryRawUnsafe("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'JournalEntry' AND COLUMN_NAME = 'spotifyTrackId'");
  if (!songColumn.length) {
    const songSql = fs.readFileSync(path.join(__dirname, '../prisma/migrations/20261002130000_journal_spotify/migration.sql'), 'utf8');
    await prisma.$executeRawUnsafe(songSql.trim().replace(/;\s*$/, ''));
  }
  console.log('Corr journal Spotify songs are ready.');
  console.log('Corr collection and private journal preparation complete. Existing records retained.');
}
main().catch(error => { console.error('Journal preparation failed:', error.code || error.name); console.error('Check database permissions and schema. No data reset was attempted.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
