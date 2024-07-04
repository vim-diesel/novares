import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import PageNumbers from './PageNumbers';
import type { Event } from '@prisma/client';
import EventsTable from './EventsTable';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const eventCount = await prisma.event.count();

  const page = Number(searchParams.page);
  if (!page || Number.isNaN(page) || page < 1) {
    redirect('/events?page=1');
  }

  const totalPages = Math.ceil(eventCount / 10);

  if (page > totalPages) {
    redirect(`/events?page=${totalPages}`);
  }

  const events: Event[] | null = await prisma.event.findMany({
    orderBy: {
      startDate: 'desc',
    },
    take: 10,
    skip: (page - 1) * 10,
  });

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <EventsTable events={events} />
        <PageNumbers currPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
