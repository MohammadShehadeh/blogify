import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import { logout } from '@/actions/auth';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/providers/session-provider';

const Navigation = ({ children }: PropsWithChildren) => {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 px-4 backdrop-blur">
      {children}
    </div>
  );
};

const NavigationContent = ({ children }: PropsWithChildren) => {
  return <div className="flex h-14 items-center justify-between gap-2">{children}</div>;
};

const NavigationLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter md:text-2xl">
      <Icons.newspaper className="size-6" /> Blogify
    </Link>
  );
};

const NavigationAuth = () => {
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

const NavigationUser = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{session.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="line-clamp-2 text-sm font-medium leading-none">{session.name}</p>
            <p className="truncate text-xs leading-none text-muted-foreground">{session.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/" className="flex w-full items-center gap-2">
              <Icons.dashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          <button className="flex items-center gap-2">
            <Icons.logout className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Navigation, NavigationContent, NavigationUser, NavigationAuth, NavigationLogo };
