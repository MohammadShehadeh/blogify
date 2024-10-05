import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from '@/db/schema';
import { env } from '@/env';

const drizzleClientSingleton = () => {
  //   // for migrations
  //   const migrationClient = postgres(env.POSTGRES_PRISMA_URL || '', { max: 1 });
  //   migrate(drizzle(migrationClient), { migrationsFolder: 'migrations' });

  // for query purposes
  const queryClient = postgres(env.POSTGRES_PRISMA_URL || '');
  return drizzle(queryClient, { schema });
};

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>;
} & typeof global;

export const db = globalThis.drizzleGlobal ?? drizzleClientSingleton();

if (env.NODE_ENV !== 'production') globalThis.drizzleGlobal = db;
