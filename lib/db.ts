import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      event: {
        async findMany({ model, operation, args, query }) {
          // Uncomment this line to test the delay
          // await new Promise((resolve) => setTimeout(resolve, 5000));
          return query(args);
        }, // in this case, we add a query to the `user` model
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
