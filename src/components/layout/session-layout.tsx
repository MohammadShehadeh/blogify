import type { PropsWithChildren } from 'react';
import React from 'react';

import { getSession } from '@/actions/session';
import { SessionProvider } from '@/providers/session-provider';

export const SessionLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  return <SessionProvider {...session}>{children}</SessionProvider>;
};
