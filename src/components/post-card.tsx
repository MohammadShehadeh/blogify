import Link from 'next/link';
import React from 'react';

import { Byline } from '@/components/byline';
import { LazyImage } from '@/components/lazy-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  name: string;
}

interface PostCardProps {
  image: string;
  title: string;
  description: string;
  user: User | null;
  button: {
    text: string;
    link: string;
  };
}

export const PostCard = ({ title, description, button, image, user }: PostCardProps) => {
  return (
    <Card className="mx-auto flex w-full flex-col">
      <CardHeader className="mb-4 p-0">
        <LazyImage width={458} height={254} className="h-[254px] rounded-t-md" src={image} alt={title} />
      </CardHeader>
      <CardContent className="flex h-full flex-col items-start">
        <CardTitle className="line-clamp-2 text-2xl">{title}</CardTitle>
        {user?.name && <Byline className="mb-2" authorName={user.name} />}
        <CardDescription className="mb-2 line-clamp-2">{description}</CardDescription>
        <Button className="mt-auto" size="sm" asChild>
          <Link href={button.link}>{button.text}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
