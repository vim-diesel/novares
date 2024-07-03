'use server';

import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { actionClient } from '@/app/lib/safe-action';

const NewEventSchema = z.object({
  eventName: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  status: z.enum(['open', 'closed', 'waitlist']).optional(),
});

// export async function createEvent

export const createEvent = actionClient
  .schema(NewEventSchema)
  .action(async ({ parsedInput: { eventName, startDate } }) => {
    // Just for testing the useFormStatus hooks or other state hooks
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (eventName && startDate) {
      try {
        const event = await prisma.event.create({
          data: {
            name: eventName,
            startDate: startDate,
          },
        });
        return {
          success: 'Event created',
        };
      } catch (e) {
        return {
          failue: 'Failed to create event',
          error: e,
        };
      }
    }

    return {
      failure: "Coudn't create event",
    };
  });
