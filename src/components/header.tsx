'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Icons } from '@/components/icons';
import { NavigationAuth } from '@/components/navigation-auth';
import { Skeleton } from '@/components/ui/skeleton';

const NavigationUser = dynamic(() => import('@/components/navigation-user').then((mod) => mod.NavigationUser), {
  loading: () => <Skeleton className="h-8 w-8 rounded-full" />,
  ssr: false,
});

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 px-4 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter md:text-2xl">
          <Icons.newspaper className="size-6" /> Blogify
        </Link>
        <div className="flex items-center gap-2">{session?.user?.id ? <NavigationUser /> : <NavigationAuth />}</div>
      </div>
    </div>
  );
};
