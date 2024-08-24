'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface LazyImageProps extends ComponentProps<'img'> {
  width: number;
  height: number;
  alt: string;
  src: string;
}

export const LazyImage = ({ width, height, src, alt, className, ...restProps }: LazyImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        src={src}
        className={cn('w-full object-cover duration-500 ease-in-out', { 'blur-2xl grayscale': isLoading }, className)}
        onLoad={() => setLoading(false)}
        {...restProps}
      />
    </div>
  );
};
