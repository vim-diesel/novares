import { PrismaClient } from '@prisma/client';
import { eventData } from './data'; // Ensure this path is correct and the file exists

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: eventData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
