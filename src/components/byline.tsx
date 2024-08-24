import React from 'react';

import { cn } from '@/lib/utils';

interface BylineProps {
  authorName: string;
  className?: string;
}

export const Byline = ({ authorName, className }: BylineProps) => {
  return (
    <p className={cn('truncate text-sm font-medium capitalize tracking-normal text-black/70', className)}>
      By {authorName}
    </p>
  );
};
