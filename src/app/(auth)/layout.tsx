import { redirect } from 'next/navigation';

import { getSession } from '@/actions/session';
import { Header } from '@/components/header';
import { SessionProvider } from '@/providers/session-provider';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session?.id) {
    redirect('/dashboard');
  }

  return (
    <SessionProvider {...session}>
      <Header />
      {children}
    </SessionProvider>
  );
}
