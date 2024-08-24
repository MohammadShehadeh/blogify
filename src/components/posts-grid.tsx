import React, { type PropsWithChildren } from 'react';

export const PostsGrid = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">{children}</div>;
};
