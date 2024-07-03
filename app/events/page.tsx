import prisma from '@/app/lib/db';
import EventsTable from '@/app/EventsTable';


export default async function Events() {
  const events = await prisma.event.findMany();

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 sm:px-6 lg:px-8'>
        <EventsTable events={events} />
      </div>
    </main>
  );
}
