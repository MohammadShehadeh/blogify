import { useSession } from 'next-auth/react';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';

import { deleteComment } from '@/actions/comment';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn, getFormattedDate } from '@/lib/utils';
import { usePost } from '@/providers/post-provider';

export const CommentingList = ({ className }: ComponentProps<'div'>) => {
  const [isPendingId, setIsPendingId] = useState('');
  const { comments, id: postId } = usePost();
  const { data: session } = useSession();

  if (comments?.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {comments?.map(({ id, user, createdAt, content }) => (
        <div
          key={id}
          className={cn('relative rounded-lg bg-gray-50 px-4 py-5 shadow-sm', { 'opacity-50': isPendingId === id })}
        >
          {user && session?.user?.id === user.id && (
            <Button
              onClick={() => {
                setIsPendingId(id);
                deleteComment(id, postId, user.id);
              }}
              className="absolute right-2 top-2 size-4 rounded-sm text-black opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              size="icon"
              variant="link"
              aria-label="delete your comment"
            >
              <Icons.delete />
            </Button>
          )}

          <div className="mb-2 text-sm text-gray-600">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">commented on {getFormattedDate(createdAt)}</p>
          </div>
          <p className="break-words text-gray-800">{content}</p>
        </div>
      ))}
    </div>
  );
};
