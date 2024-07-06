// 'use client';
import React from 'react';
import { z } from 'zod';
import PageNumbers from './PageNumbers';
import type { Event } from '@prisma/client';
import EventsTableSorted from './EventsTableSorted';
import { getEventsCount, getEventsMany } from '@/actions/actions';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const [eventCount, setEventCount] = React.useState(0);
  // const [events, setEvents] = React.useState<Event[]>([]);
  // const [page, setPage] = React.useState<number>(1);
  // const [totalPages, setTotalPages] = React.useState(1);
  // const [column, setColumn] = React.useState('startDate');
  // const [desc, setDesc] = React.useState(true);

  const query = {
    page: searchParams.page,
    orderBy: searchParams.orderBy,
    direction: searchParams.direction,
  };

  const eventCount = await getEventsCount();
  const totalPages = Math.ceil(eventCount / 10);

  const searchParamsSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    orderBy: z
      .enum(['title','startDate', 'endDate', 'location', 'price', 'status'])
      .optional(),
    direction: z.enum(['desc', 'asc']).optional(),
  });

  const parseRes = searchParamsSchema.safeParse(query);
  let events: Event[] = [];
  if (parseRes.success) {
    events = await getEventsMany(
      parseRes.data.orderBy || 'startDate',
      parseRes.data.direction === 'desc' || true,
      parseRes.data.page || 1
    );
  }

  if (!parseRes.success) {
    return <div>Invalid query params</div>;
  }

  // React.useEffect(() => {
  //   console.log('fetching event count');
  //   const fetchEventCount = async () => {
  //     const count = await getEventsCount();
  //     setEventCount(count);
  //   };
  //   fetchEventCount();
  // }, []);

  // React.useEffect(() => {
  //   const fetchEventCount = async () => {
  //     const events: Event[] = await getEventsMany(column, desc, parseRes.data?.page || 1);
  //     setEvents(events);
  //   };
  //   fetchEventCount();
  // }, [column, desc, parseRes.data?.page]);

  // React.useEffect(() => {
  //   const totalPages = Math.ceil(eventCount / 10);
  //   setTotalPages(totalPages);
  // }, [eventCount]);

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <EventsTableSorted
          events={events}
          desc={parseRes.data?.direction === 'desc' || true}
          orderBy={parseRes.data?.orderBy || 'startDate'}
          searchParams={searchParams}
        />
        <PageNumbers
          currPage={parseRes.data?.page || 1}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
