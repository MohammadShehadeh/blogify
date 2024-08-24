'use client';

import { CommentingForm } from '@/components/commenting-form';
import { CommentingList } from '@/components/commenting-list';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useSession } from '@/providers/session-provider';

export function Commenting() {
  const session = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="commenting">
          <Icons.commenting className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Join The Conversation</SheetTitle>
          {!session?.id && <SheetDescription>Create a free account to share your thoughts.</SheetDescription>}
        </SheetHeader>
        {session?.id && <CommentingForm />}
        <CommentingList className="mt-4" />
      </SheetContent>
    </Sheet>
  );
}
