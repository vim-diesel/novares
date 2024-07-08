import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      event: {
        async findMany({ model, operation, args, query }) {
          console.log('fetching data with prisma: ', args);
          return query(args)
        },
      },
    },
  })
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
