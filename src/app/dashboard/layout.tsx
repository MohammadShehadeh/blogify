import { redirect } from 'next/navigation';

import { getSession } from '@/actions/session';
import { Header } from '@/components/header';
import { Container } from '@/components/layout/container';
import { SessionProvider } from '@/providers/session-provider';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session?.id) {
    redirect('/login');
  }

  return (
    <SessionProvider {...session}>
      <Header />
      <Container className="py-20">{children}</Container>
    </SessionProvider>
  );
}
