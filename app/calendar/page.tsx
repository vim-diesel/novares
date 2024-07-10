import prisma from '@/lib/db';
import Calendar from './Calendar';
import { Event } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function Page() {

  const events: Event[] = await prisma.event.findMany();

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 px-2 sm:px-6 lg:px-8'>
        <Calendar events={events} />
      </div>
    </main>
  );
}
