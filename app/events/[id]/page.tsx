import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) {
    return notFound();
  }

  return <div>main</div>

}
