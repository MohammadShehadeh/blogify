import { Header } from '@/components/header';
import { CenteredContent } from '@/components/layout/centered-content';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <CenteredContent>{children}</CenteredContent>
    </>
  );
}
