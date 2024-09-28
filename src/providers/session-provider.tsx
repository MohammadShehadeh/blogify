'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';
interface Session {
  user?: {
    email: string;
    name: string;
    id: string;
  };
  expires?: Date;
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
