// Run once in the backend environment before deployment. Adds/widens only;
// does not reset data, replace migration history or change credentials.
require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();
const quote = value => {
  if (!/^[A-Za-z_]+$/.test(value)) throw new Error('Unexpected table name.');
  return '`' + value + '`';
};
async function main() {
  const tables = await prisma.$queryRawUnsafe('SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()');
  const table = name => tables.find(t => t.name.toLowerCase() === name.toLowerCase())?.name;
  const user = table('User'), profile = table('Profile');
  if (!user || !profile) throw new Error('Existing User and Profile tables are required.');
  const columns = await prisma.$queryRawUnsafe('SELECT COLUMN_NAME AS name FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', user);
  if (!columns.some(c => c.name === 'username')) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ${quote(user)} ADD COLUMN username VARCHAR(191) NULL, ADD UNIQUE INDEX User_username_key (username)`);
  }
  const indexes = await prisma.$queryRawUnsafe('SELECT INDEX_NAME AS name, COLUMN_NAME AS columnName, NON_UNIQUE AS nonUnique FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', user);
  if (!indexes.some(i => i.columnName === 'username' && Number(i.nonUnique) === 0 && indexes.filter(j => j.name === i.name).length === 1)) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ${quote(user)} ADD UNIQUE INDEX User_username_key (username)`);
  }
  if (!columns.some(c => c.name === 'usernameChangedAt')) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ${quote(user)} ADD COLUMN usernameChangedAt DATETIME(3) NULL`);
  }
  await prisma.$executeRawUnsafe(`ALTER TABLE ${quote(profile)} MODIFY skinGoals TEXT NOT NULL, MODIFY currentProducts TEXT NULL, MODIFY currentRoutine TEXT NULL`);
  if (!table('FriendRequest')) {
    await prisma.$executeRawUnsafe(`CREATE TABLE FriendRequest (
      id INTEGER NOT NULL AUTO_INCREMENT, senderId INTEGER NOT NULL, receiverId INTEGER NOT NULL,
      status VARCHAR(191) NOT NULL DEFAULT 'PENDING', createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL, PRIMARY KEY (id), UNIQUE INDEX FriendRequest_senderId_receiverId_key (senderId, receiverId)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  }
  console.log('Corr database preparation complete. Existing records retained.');
}
main().catch(() => { console.error('Database preparation failed. Check database permissions and schema; no data reset was attempted.'); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
