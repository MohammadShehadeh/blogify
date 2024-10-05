import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_PRISMA_URL,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
