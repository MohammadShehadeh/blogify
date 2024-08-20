// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn('dark h-full min-h-full scroll-smooth antialiased', GeistSans.variable)} lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-dvh bg-black" suppressHydrationWarning>
        <main className="min-h-[calc(100%-62px)] pb-8">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
