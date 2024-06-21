'use server';

import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';

type RawFormData = {
  eventName: string;
  startDate: string;
  endDate: string | undefined;
  location: string | null;
  price: number | null;
  status: string | null;
};

export async function createEvent(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const rawFormData = {
    eventName: formData.get('eventname') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    location: formData.get('location') as string,
    price: Number((formData.get('price') as string) || '0'),
    status: formData.get('event-status') as string,
  };

  await prisma.event.create({
    data: {
      name: rawFormData.eventName,
      startDate: rawFormData.startDate,
    },
  });

  redirect('/');
}
