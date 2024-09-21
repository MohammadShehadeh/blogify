import { notFound } from 'next/navigation';

import { getPostById } from '@/actions/post';
import { getSession } from '@/actions/session';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PostContent } from '@/components/post-content';
import { PostProvider } from '@/providers/post-provider';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  const results = await getPostById(params.slug, session);
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
