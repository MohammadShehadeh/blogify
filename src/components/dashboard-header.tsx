import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Dashboard = ({ children, className }: PropsWithChildren & { className?: string }) => {
  return (
    <div className={cn('items-between mt-4 flex flex-col justify-between gap-4 sm:flex-row', className)}>
      {children}
    </div>
  );
};

const DashboardHeader = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const DashboardTitle = ({ children }: PropsWithChildren) => {
  return <h2 className="text-3xl font-bold tracking-tight">{children}</h2>;
};

const DashboardDescription = ({ children }: PropsWithChildren) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

const DashboardButton = ({
  href,
  children,
}: {
  href: string;
} & PropsWithChildren) => {
  return (
    <Button asChild className="gap-2" variant="outline">
      <Link href={href}>
        <Icons.plus className="size-4" />
        {children}
      </Link>
    </Button>
  );
};

export { Dashboard, DashboardHeader, DashboardTitle, DashboardDescription, DashboardButton };
