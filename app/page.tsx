import prisma from '@/app/lib/db';
import EventsTable from './EventsTable';
import Header from './Header';

export default async function Home() {
  const events = await prisma.event.findMany();

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h1 className='text-2xl mb-5'>Welcome to NovaRes!</h1>

        <EventsTable events={events} />
      </div>
    </main>
  );
}
