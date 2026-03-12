import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';
import { env } from '@/env';

const drizzleClientSingleton = () => {
  const queryClient = postgres(env.DATABASE_URL || '');
  return drizzle(queryClient, { schema });
};

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>;
} & typeof global;

export const db = globalThis.drizzleGlobal ?? drizzleClientSingleton();

if (env.NODE_ENV !== 'production') globalThis.drizzleGlobal = db;
