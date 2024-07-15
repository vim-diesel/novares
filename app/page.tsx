import Hero from './Hero';

export default async function Home() {
  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl mt-10'>
        <Hero />
      </div>
    </main>
  );
}
