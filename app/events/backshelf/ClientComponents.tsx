'use client';
import React from 'react';
import { z } from 'zod';
import PageNumbers from '../PageNumbers';
import type { Event } from '@prisma/client';
import EventsTableSorted from '../EventsTableSorted';
import { getEventsCount, getEventsMany } from '@/actions/actions';

// This page is just for reference

export default function OldPage({}) {
  const [eventCount, setEventCount] = React.useState(0);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    | 'startDate'
    | 'title'
    | 'endDate'
    | 'location'
    | 'price'
    | 'status'
    | undefined
  >('startDate');
  const [desc, setDesc] = React.useState(true);

  const searchParamsSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    orderBy: z
      .enum(['title', 'startDate', 'endDate', 'location', 'price', 'status'])
      .optional(),
    direction: z.enum(['desc', 'asc']).optional(),
  });

  React.useEffect(() => {
    console.log('fetching event count');
    const fetchEventCount = async () => {
      const count = await getEventsCount();
      setEventCount(count);
    };
    fetchEventCount();
  }, []);

  React.useEffect(() => {
    const fetchEventCount = async () => {
      // @ts-ignore
      const events: Event[] = await getEventsMany(orderBy, desc, page || 1);
      setEvents(events);
    };
    fetchEventCount();
  }, [orderBy, desc, page]);

  React.useEffect(() => {
    const totalPages = Math.ceil(eventCount / 10);
    setTotalPages(totalPages);
  }, [eventCount]);

  return <div> This page is just for reference </div>;
  /*
  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <EventsTableSorted
          events={events}
          desc={desc || true}
          orderBy={orderBy || 'startDate'}
        />
        <PageNumbers
          currPage={page || 1}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
  */
}
