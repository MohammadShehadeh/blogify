// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Blogify',
  description: 'Blogify is online platform that takes care of ALL of your content creation needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn('h-full min-h-full scroll-smooth antialiased', GeistSans.variable)} lang="en">
      <body className="min-h-dvh" suppressHydrationWarning>
        <main className="min-h-screen bg-muted/40">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
