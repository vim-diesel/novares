"use server";

import prisma from "@/app/lib/db";

type ParsedFormData = {
  eventName: string | null;
  startDate: string | undefined;
  endDate: string | undefined;
  location: string | null;
  price: string | null;
  status: string | null;
};

export async function createEventAction(formData: ParsedFormData) {

  console.log(formData);

  // await prisma.event.create({
  //   data: {
  //     name: ""
  //   }
  // })
}