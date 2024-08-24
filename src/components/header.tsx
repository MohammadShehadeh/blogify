'use client';

import React from 'react';

import {
  Navigation,
  NavigationContent,
  NavigationLogo,
  NavigationAuth,
  NavigationUser,
} from '@/components/layout/navigation-bar';
import { useSession } from '@/providers/session-provider';

export const Header = () => {
  const session = useSession();

  return (
    <Navigation>
      <NavigationContent>
        <NavigationLogo />
        <div className="flex items-center gap-2">{session?.id ? <NavigationUser /> : <NavigationAuth />}</div>
      </NavigationContent>
    </Navigation>
  );
};
