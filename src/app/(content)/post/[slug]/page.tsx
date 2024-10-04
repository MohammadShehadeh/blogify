import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { getPostById } from '@/actions/post';
import { auth } from '@/auth';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PostContent } from '@/components/post-content';
import { PostProvider } from '@/providers/post-provider';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  const getCachedPost = unstable_cache(async () => getPostById(session, params.slug), [`post:${params.slug}`], {
    tags: [`post:${params.slug}`],
  });
  const results = await getCachedPost();
  const post = 'error' in results.response ? undefined : results.response.post;

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { title: 'Home', link: '/' },
    { title: post.title, link: `/post/${params.slug}` },
  ];

  return (
    <PostProvider {...post}>
      <Breadcrumbs items={breadcrumbItems} />
      <PostContent />
    </PostProvider>
  );
}
