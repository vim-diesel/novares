'use client';
import React from 'react';
import { z } from 'zod';
import PageNumbers from './PageNumbers';
import type { Event } from '@prisma/client';
import EventsTableSorted from './EventsTableSorted';
import { getEventsCount, getEventsMany } from '@/actions/actions';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [eventCount, setEventCount] = React.useState(0);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [column, setColumn] = React.useState('startDate');
  const [desc, setDesc] = React.useState(true);

  const queryPage = searchParams.page;
  const queryOrderBy = searchParams.orderBy;
  const queryDirection = searchParams.direction;

  const query = {
    page: searchParams.page,
    orderBy: searchParams.orderBy,
    direction: searchParams.direction,
  };

  const searchParamsSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    orderBy: z
      .enum(['startDate', 'endDate', 'location', 'price', 'status'])
      .optional(),
    direction: z.enum(['desc', 'asc']).optional(),
  });

  const parseRes = searchParamsSchema.safeParse(query);

  if (!parseRes.success) {
    // handle query error
  }

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
      const events: Event[] = await getEventsMany(column, desc, page);
      setEvents(events);
    };
    fetchEventCount();
  }, [column, desc, page]);

  React.useEffect(() => {
    const totalPages = Math.ceil(eventCount / 10);
    setTotalPages(totalPages);
  }, [eventCount]);

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <EventsTableSorted
          events={events}
          desc={desc}
          column={column}
          setDesc={setDesc}
          setColumn={setColumn}
        />
        <PageNumbers
          currPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </main>
  );
}
