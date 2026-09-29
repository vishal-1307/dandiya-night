const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { passwordHash: hash },
    create: {
      username: 'admin',
      passwordHash: hash,
      role: 'ADMIN',
    },
  });

  console.log(`[OK] Admin user ready: ${admin.username} / admin123`);

  // Also check if sample registrations exist, if none create 2 sample registrations for testing check-in
  const count = await prisma.registration.count();
  if (count === 0) {
    const sample = await prisma.registration.create({
      data: {
        registrationId: 'DN-DEMO',
        type: 'INDIVIDUAL',
        status: 'CONFIRMED',
        paymentStatus: 'FREE',
        checkedIn: false,
        qrCode: 'DNQR-SAMPLE-1234',
        fullName: 'Aarav Kumar',
        email: 'aarav@example.com',
        phone: '9876543210',
        city: 'Madhubani',
        gender: 'Male',
        age: 24,
        instagramHandle: '@aarav_madhubani',
        dandiyaParticipation: true,
        competitionInterest: true,
        costumeTheme: 'Traditional Kurta',
        foodPreference: 'Veg',
        rulesAgreed: true,
        communicationConsent: true,
        photoVideoConsent: true,
      }
    });
    console.log(`[OK] Sample demo attendee seeded: ${sample.registrationId} (${sample.fullName})`);
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('[!] Seeding failed:', err);
  process.exit(1);
});
