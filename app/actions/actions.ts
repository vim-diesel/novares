'use server';

import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormDataSchema = z.object({
  eventName: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  status: z.enum(['open', 'closed', 'waitlist']).optional(),
});

export async function createEvent(previousState: Object, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = FormDataSchema.safeParse({
    eventName: formData.get('eventname') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    location: formData.get('location'),
    price: Number((formData.get('price') as string) || '0'),
    status: formData.get('event-status') as string,
  });
  if (!result.success) {
    
    return result.error.issues;
  }
  console.log(result);

  // const rawFormData = {};

  // await prisma.event.create({
  //   data: {
  //     name: rawFormData.eventName,
  //     startDate: rawFormData.startDate,
  //   },
  // });

  // redirect('/');
  return { errors: {} };
}
