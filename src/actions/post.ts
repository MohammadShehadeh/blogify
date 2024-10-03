'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';

import { auth } from '@/auth';
import prisma from '@/db';
import { createResponse } from '@/lib/utils';
import type { PostFormValues } from '@/types/zod-schema';

export const getPosts = async (filter?: 'draft' | 'published') => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      ...(!!filter && {
        where: {
          status: {
            in: [filter],
          },
        },
      }),
    });

    return createResponse({ posts });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Posts retrieval Failed!',
      message: 'Please try again later!',
    });
  }
};

export const getPostsByAuthorId = async (session: Session | null, filter?: 'draft' | 'published') => {
  try {
    if (!session?.user?.id) {
      throw new Error('Unauthorized user');
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: session.user.id,
        ...(!!filter && {
          status: {
            in: [filter],
          },
        }),
      },
    });

    return createResponse({ posts });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Posts retrieval by author id Failed!',
      message: 'Please try again later!',
    });
  }
};

export const getPostById = async (session: Session | null, id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comment: {
          include: {
            author: {
              select: {
                name: true,
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (post?.status === 'draft' && session?.user?.id !== post.authorId) {
      return createResponse({ post: undefined });
    }

    return createResponse({ post });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Post retrieval Failed!',
      message: 'Please try again later!',
    });
  }
};

export const deletePost = async (id: string, authorId?: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== authorId) {
      throw new Error('Unauthorized user');
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Post deletion Failed!',
      message: 'Please try again later!',
    });
  }

  revalidatePath('/dashboard');
};

export const updatePost = async ({ id, title, description, imageUrl, content, status, authorId }: PostFormValues) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== authorId) {
      throw new Error('Unauthorized user');
    }

    await prisma.post.update({
      where: { id },
      data: { title, description, imageUrl, content, status },
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Post updating Failed!',
      message: 'Please try again later!',
    });
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
};

export const createPost = async ({ title, description, imageUrl, content, status }: PostFormValues) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Unauthorized user');
    }

    await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        content,
        status,
        authorId: session?.user.id,
      },
    });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Post creation Failed!',
      message: 'Please try again later!',
    });
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
};
