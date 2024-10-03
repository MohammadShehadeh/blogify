import { unstable_cache } from 'next/cache';

import { getPosts } from '@/actions/post';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmptySection } from '@/components/empty-section';
import { Hero } from '@/components/hero';
import { PostCard } from '@/components/post-card';
import { PostsGrid } from '@/components/posts-grid';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const getCachedPost = unstable_cache(async () => getPosts('published'), ['posts'], { tags: ['posts'] });
  const results = await getCachedPost();
  const breadcrumbItems = [{ title: 'Home', link: '/' }];

  const posts = 'error' in results.response ? [] : results.response.posts;

  return (
    <>
      <Breadcrumbs className="mb-4" items={breadcrumbItems} />
      <Hero />
      <Separator className="my-6" />
      {posts.length ? (
        <PostsGrid>
          {posts?.map(({ imageUrl, id, ...rest }) => (
            <PostCard key={id} button={{ text: 'Read more', link: `/post/${id}` }} image={imageUrl} {...rest} />
          ))}
        </PostsGrid>
      ) : (
        <EmptySection />
      )}
    </>
  );
}
