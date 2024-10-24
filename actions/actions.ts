'use server';

import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';

const NewEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  price: z.number().nonnegative().optional(),
  status: z.enum(['open', 'closed', 'waitlist']).optional(),
});

export const createEvent = actionClient
  .schema(NewEventSchema)
  .action(
    async ({
      parsedInput: { title, startDate, location, price, endDate, status },
    }) => {
      // Just for testing the status hook/submission button
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const event = await prisma.event.create({
        data: {
          title: title,
          startDate: startDate,
          endDate: endDate,
          location: location,
          price: price,
          status: status,
        },
      });
      redirect('/events?page=1');
    }
  );

export async function getEventsCount() {
  const count = await prisma.event.count();
  return count;
}

export async function getEventsMany(page: number, orderBy: string, direction: string) {
  // Test the loading of data
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  const res = await prisma.event.findMany({
    take: 10,
    skip: (page - 1) * 10,
  });

  return res;
}
