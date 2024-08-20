import Link from 'next/link';
import React from 'react';

export const AuthNav = () => {
  return (
    <nav className="flex items-center gap-1">
      <Link className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground" href="/login/">
        Login
      </Link>
      /
      <Link
        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        href="/register/"
      >
        Register
      </Link>
    </nav>
  );
};
