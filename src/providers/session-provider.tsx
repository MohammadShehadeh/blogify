'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';

interface Session {
  email?: string;
  id?: string;
  name?: string;
}

const SessionContext = createContext<Session>({});

export const SessionProvider = ({ children, ...restProps }: PropsWithChildren) => {
  return <SessionContext.Provider value={restProps}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within an SessionProvider');
  }

  return context;
};
