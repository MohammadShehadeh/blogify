'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import prisma from '@/db';
import { createResponse } from '@/lib/utils';

export const createComment = async (postId: string, content: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Unauthorized user');
    }

    await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: session.user.id,
      },
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Comment creation Failed!',
      message: 'Please try again later!',
    });
  }

  revalidatePath(`/posts/${postId}`);
};

export const deleteComment = async (commentId: string, postId: string, authorId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== authorId) {
      throw new Error('Unauthorized user');
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Comment deletion Failed!',
      message: 'Please try again later!',
    });
  }

  revalidatePath(`/posts/${postId}`);
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
