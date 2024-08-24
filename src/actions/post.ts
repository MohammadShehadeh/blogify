'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSession } from '@/actions/session';
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

export const getPostsByAuthorId = async (filter?: 'draft' | 'published') => {
  try {
    const session = await getSession();

    if (!session?.id) {
      throw new Error('Unauthorized user');
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: session.id,
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

export const getPostById = async (id: string, filter?: 'draft' | 'published') => {
  try {
    const [post, session] = await Promise.all([
      prisma.post.findUnique({
        where: {
          id,
          ...(!!filter && {
            status: {
              in: [filter],
            },
          }),
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
      }),
      getSession(),
    ]);

    if (post?.status === 'draft' && session?.id !== post.authorId) {
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
    const session = await getSession();

    if (!session?.id || session?.id !== authorId) {
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
    const session = await getSession();

    if (!session?.id || session?.id !== authorId) {
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
    const session = await getSession();

    if (!session?.id) {
      throw new Error('Unauthorized user');
    }

    await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        content,
        status,
        authorId: session?.id as string,
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
