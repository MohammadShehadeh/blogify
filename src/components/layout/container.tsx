import React, { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn('container mx-auto', className)}>{children}</div>;
};
