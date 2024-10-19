'use server';

import 'use-server';

import { eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/db';
import { comments } from '@/db/schema';
import { createResponse } from '@/lib/utils';

export const createComment = async (postId: string, content: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Unauthorized user');
    }

    const userId = session.user.id;

    await db.insert(comments).values({
      content,
      postId,
      userId,
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Comment creation Failed!',
      message: 'Please try again later!',
    });
  }

  revalidateTag(`post:${postId}`);
  revalidateTag(`comments:${postId}`);
  revalidatePath(`/posts/${postId}`);
};

export const deleteComment = async (commentId: string, postId: string, userId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== userId) {
      throw new Error('Unauthorized user');
    }

    await db.delete(comments).where(eq(comments.id, commentId));
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Comment deletion Failed!',
      message: 'Please try again later!',
    });
  }

  revalidateTag(`post:${postId}`);
  revalidateTag(`comments:${postId}`);
  revalidatePath(`/posts/${postId}`);
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await db.query.comments.findMany({
      where: (comments, { eq }) => eq(comments.postId, postId),
      with: {
        user: {
          columns: {
            name: true,
            id: true,
          },
        },
      },
    });

    return createResponse({ comments });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Comments retrieval Failed!',
      message: 'Please try again later!',
    });
  }
};
