// eslint-disable-next-line import/no-unresolved
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Blogify',
  description: 'Blogify is online platform that takes care of ALL of your content creation needs.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html className={cn('h-full min-h-full scroll-smooth antialiased')} lang="en">
      <body className="min-h-dvh">
        <NextTopLoader color="#16a34a" showSpinner={false} shadow="none" />
        <main className="min-h-screen bg-muted/40">
          <SessionProvider session={session}>{children}</SessionProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
