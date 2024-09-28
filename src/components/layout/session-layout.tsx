import type { PropsWithChildren } from 'react';
import React from 'react';

import { auth } from '@/auth';
import { SessionProvider } from '@/providers/session-provider';

export const SessionLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return <SessionProvider {...session}>{children}</SessionProvider>;
};
