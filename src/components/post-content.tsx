'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { Byline } from '@/components/byline';
import { EditIndicator } from '@/components/edit-indicator';
import { Icons } from '@/components/icons';
import { LazyImage } from '@/components/lazy-image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getFormattedDate } from '@/lib/utils';
import { usePost } from '@/providers/post-provider';

const Commenting = dynamic(() => import('@/components/commenting').then((mod) => mod.Commenting), {
  loading: () => (
    <Button className="opacity-50" variant="outline" size="icon" aria-label="commenting">
      <Icons.commenting className="size-5" />
    </Button>
  ),
  ssr: false,
});

export const PostContent = () => {
  const { title, description, author, authorId, imageUrl, id, createdAt, content } = usePost();

  return (
    <section>
      <div className="mb-4 flex flex-col">
        <h1 className="mb-2 mt-4 text-4xl capitalize">{title}</h1>
        <p className="text-lg">{description}</p>
        <Byline authorName={author ? author.name : ''} />

        <div className="relative my-4">
          <LazyImage width={1042} height={384} className="h-[384px] rounded-t-md" src={imageUrl} alt={title} />
          <EditIndicator href={`/dashboard/update/${id}`} postId={authorId} className="absolute right-4 top-4 z-10" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Commenting />
          <p className="text-sm text-muted-foreground">{getFormattedDate(createdAt)}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <article
        className="lg:prose-md prose prose-sm max-w-full sm:prose-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};
