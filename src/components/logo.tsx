import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <Link href="/" className="text-xl font-bold tracking-wide md:text-2xl">
      Blogging Platform
    </Link>
  );
};
