'use server';

import prisma from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ParsedFormData = {
  eventName: string;
  startDate: string;
  endDate: string | undefined;
  location: string | null;
  price: number | null;
  status: string | null;
};

export async function createEventAction(formData: ParsedFormData) {
  await prisma.event.create({
    data: {
      name: formData.eventName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      price: formData.price,
    },
  });

  redirect("/");
}
