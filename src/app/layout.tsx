import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';

import '@/styles/globals.scss';
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html className={cn('h-full min-h-full scroll-smooth antialiased', geist.className)} lang="en">
      <body className="min-h-dvh">
        <NextTopLoader color="#16a34a" showSpinner={false} shadow="none" />
        <main className="min-h-screen bg-muted/40">
          <TooltipProvider> {children}</TooltipProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
