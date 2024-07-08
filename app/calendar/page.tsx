import prisma from '@/lib/db';
import Calendar from './Calendar';
import { Event } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const monthEnum = z.enum([
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]);

type Month = z.infer<typeof monthEnum>;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  function getCurrentMonth(): Month {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return month.toLowerCase() as Month;
  }

  const query = {
    month: searchParams.month,
    day: searchParams.day,
  };

  const searchParamsSchema = z.object({
    month: monthEnum.optional(),
    day: z.coerce.number().int().gt(0).lte(31).optional(),
  });

  const zres = searchParamsSchema.safeParse(query);

  if (!zres.success) {
    redirect(
      `?${new URLSearchParams({ ...searchParams, month: getCurrentMonth() })}`
    );
  } else {
    console.log(zres.data);
    console.log(typeof zres.data);
  }

  const events: Event[] = await prisma.event.findMany();

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <Calendar events={events} month={zres.data.month} day={zres.data.day} />
      </div>
    </main>
  );
}
