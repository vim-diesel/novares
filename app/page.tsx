import prisma from '@/lib/db';
import EventsTable from './events/EventsTable';
import Header from './Header';

export default async function Home() {
  const events = await prisma.event.findMany();

  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10 sm:px-6 lg:px-8'>
        <h1 className='text-2xl text-center'>Welcome to NovaRes!</h1>
      </div>
    </main>
  );
}
