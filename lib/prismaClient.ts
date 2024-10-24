import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws; // Set WebSocket constructor

// Use Neon connection string from the environment
const connectionString = `${process.env.DATABASE_URL}`;

// Create a connection pool with Neon's serverless driver
const pool = new Pool({ connectionString });

// Setup Prisma client with the PrismaNeon adapter
const adapter = new PrismaNeon(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
