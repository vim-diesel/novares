'use client';
import React from 'react';
import PageNumbers from './PageNumbers';
import type { Event } from '@prisma/client';
import EventsTableSorted from './EventsTableSorted';
import { getEventsCount, getEventsMany } from '@/lib/actions/actions';

export default function Page() {
  const [eventCount, setEventCount] = React.useState(0);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [column, setColumn] = React.useState('startDate');
  const [desc, setDesc] = React.useState(false);

  React.useEffect(() => {
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

  // const page = Number(searchParams.get('page'));

  // if (!page || Number.isNaN(page) || page < 1) {
  //   router.push('/events?page=1');
  // }

  // let totalPages = 1;
  // if (eventCount !== 0) {
  //   totalPages = Math.ceil(eventCount / 10);
  // }

  // if (page > totalPages) {
  //   router.push(`/events?page=${totalPages}`);
  // }

  // const events: Event[] | null = await prisma.event.findMany({
  //   orderBy: {
  //     startDate: 'desc',
  //   },
  //   take: 10,
  //   skip: (page - 1) * 10,
  // });

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
