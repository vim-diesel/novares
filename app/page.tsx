import prisma from '@/app/lib/db'

export default async function Home() {
  const events = await prisma.event.findMany();

  return (
    <main className='min-h-screen p-24'>
      <h1 className='text-2xl'>Welcome to NovaRes!</h1>
      <h2 className='text-xl'>Your current retreats: </h2>
      <ol>
        {events.map((event) => (
          <li key={event.id}>
            <h3 className='text-lg'>{event.name}</h3>
            <p className='text-md'>{event.description}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
