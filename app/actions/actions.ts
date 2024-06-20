"use server";

import prisma from "@/app/lib/db";

export async function createEvent(name: string, startDate: string, ) {
  await prisma.event.create({
    data: {
      name: ""
    }
  })
}