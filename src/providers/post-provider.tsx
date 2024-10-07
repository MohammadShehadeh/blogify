'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  userId: string | null;
  createdAt: number | Date | null;
  user: {
    name: string;
    id: string;
  } | null;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: number | Date | null;
  user: {
    name: string;
    id: string;
  };
}

const PostContext = createContext<Post | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }

  return context;
};

interface PostProviderProps extends PropsWithChildren, Post {}

export const PostProvider = ({ children, ...restProps }: PostProviderProps) => {
  return <PostContext.Provider value={restProps}>{children}</PostContext.Provider>;
};
