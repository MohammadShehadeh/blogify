'use client';

import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/session-provider';

interface EditableIndicatorProps {
  href: string;
  postId: string | null;
  className?: string;
}

export const EditIndicator = ({ href, postId, className }: EditableIndicatorProps) => {
  const session = useSession();

  if (session.id !== postId) return null;

  return (
    <Button asChild size="icon" variant="link" className={cn('rounded-full bg-muted shadow-lg', className)}>
      <Link href={href}>
        <Icons.settings className="size-7" />
      </Link>
    </Button>
  );
};