// 'use client';
import React from 'react';
import { z } from 'zod';
import PageNumbers from './PageNumbers';
import type { Event } from '@prisma/client';
import EventsTableSorted from './EventsTableSorted';
import { getEventsCount, getEventsMany } from '@/actions/actions';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = {
    page: searchParams.page,
    orderBy: searchParams.orderBy,
    direction: searchParams.direction,
  };

  const eventCount = await getEventsCount();
  const totalPages = Math.ceil(eventCount / 10);

  console.log(totalPages);

  const searchParamsSchema = z.object({
    page: z.coerce.number().int().positive().lte(totalPages).optional(),
    orderBy: z
      .enum(['title', 'startDate', 'endDate', 'location', 'price', 'status'])
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
    const zodFieldErrors = parseRes.error.flatten().fieldErrors;

    if (zodFieldErrors.page) {
      redirect(`?${new URLSearchParams({ ...searchParams, page: '1' })}`);
    }
    if (zodFieldErrors.orderBy) {
      redirect(
        `?${new URLSearchParams({ ...searchParams, orderBy: 'startDate' })}`
      );
    }
    if (zodFieldErrors.direction) {
      redirect(
        `?${new URLSearchParams({ ...searchParams, direction: 'desc' })}`
      );
    }
  }

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
