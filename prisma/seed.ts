// Import PrismaClient using CommonJS syntax
const { PrismaClient } = require('@prisma/client');
const { addDays } = require('date-fns');
const eventData = require('./data.ts');

// Instantiate PrismaClient
const prisma = new PrismaClient();

async function main() {
  // const startDate = new Date(); // Starting from today
  // for (let i = 1; i <= 100; i++) {
  //   // Create a new event entry
  //   await prisma.event.create({
  //     data: {
  //       title: `Event Title ${i}`,
  //       startDate: addDays(startDate, i).toISOString(), // Incrementing the start date by i days for each event
  //       description: `This is the content for event ${i}.`,
  //     },
  //   });
  // }

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
