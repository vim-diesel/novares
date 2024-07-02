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
  .action(async ( { parsedInput: {eventName, startDate} }) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));


  if (eventName === "event1" && startDate) {
    return {
      success: "Event1 created"
    }
  }

  return {
    failure: "Coudn't create event"
  }
  // const result = NewEventSchema.safeParse({
  //   eventName: formData.get('eventname'),
  //   startDate: formData.get('startDate'),
  //   endDate: formData.get('endDate'),
  //   location: formData.get('location'),
  //   price: formData.get('price'),
  //   status: formData.get('event-status'),
  // });
  

  // const rawFormData = {};

  // await prisma.event.create({
  //   data: {
  //     name: rawFormData.eventName,
  //     startDate: rawFormData.startDate,
  //   },
  // });

  // redirect('/');
})
