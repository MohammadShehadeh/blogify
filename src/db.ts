// PrismaClient is attached to the `global` object in development to prevent
// instantiating extra PrismaClient instances.
// Learn more: https://pris.ly/d/help/next-js-best-practices

import { PrismaClient } from '@prisma/client';

import { env } from '@/env';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
