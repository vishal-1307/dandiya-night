const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const password = process.env.ADMIN_PASSWORD || 'manish13';
  const username = process.env.ADMIN_USERNAME || 'manish';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash: hash },
    create: {
      username,
      passwordHash: hash,
      role: 'ADMIN',
    },
  });

  console.log(`[OK] Admin user ready: ${admin.username}`);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('[!] Seeding failed:', err);
  process.exit(1);
});
