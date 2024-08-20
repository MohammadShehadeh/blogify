'use client';

import React from 'react';

import { AuthNav } from '@/components/auth-nav';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';

export const SiteHeader = () => {
  return (
    <header className="border-neutral-900/150 sticky top-0 z-10 mb-8 flex gap-1 border-b bg-background px-2 py-4 text-white md:px-8 md:py-5">
      <div className="flex flex-row-reverse items-center gap-1 md:flex-row md:gap-4">
        <Logo />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
        <AuthNav />
      </div>
    </header>
  );
};
