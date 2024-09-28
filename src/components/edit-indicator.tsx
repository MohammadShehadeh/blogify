'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditableIndicatorProps {
  href: string;
  postId: string | null;
  className?: string;
}

export const EditIndicator = ({ href, postId, className }: EditableIndicatorProps) => {
  const { data: session } = useSession();

  if (session?.user?.id !== postId) return null;

  return (
    <Button asChild size="icon" variant="link" className={cn('rounded-full bg-muted shadow-lg', className)}>
      <Link href={href}>
        <Icons.settings className="size-7" />
      </Link>
    </Button>
  );
};
