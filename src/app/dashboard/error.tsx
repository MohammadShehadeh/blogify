'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: '500', link: '/dashboard' },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Something went wrong!</h1>
      <p className="mb-4 text-lg text-gray-700">Something went wrong on our end. Please try again later.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </>
  );
}
