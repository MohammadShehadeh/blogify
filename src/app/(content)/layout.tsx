import { getSession } from '@/actions/session';
import { Header } from '@/components/header';
import { Container } from '@/components/layout/container';
import { SessionProvider } from '@/providers/session-provider';

export default async function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <SessionProvider {...session}>
      <Header />
      <Container className="py-20">{children}</Container>
    </SessionProvider>
  );
}
