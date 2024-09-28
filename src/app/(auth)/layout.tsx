import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Header } from '@/components/header';
import { SessionProvider } from '@/providers/session-provider';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user?.id) {
    redirect('/dashboard');
  }

  return (
    <SessionProvider {...session}>
      <Header />
      {children}
    </SessionProvider>
  );
}
