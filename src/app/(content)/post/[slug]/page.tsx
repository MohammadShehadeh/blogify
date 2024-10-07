import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { getCommentsByPostId } from '@/actions/comment';
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
  const getCachedComments = unstable_cache(async () => getCommentsByPostId(params.slug), [`comments:${params.slug}`], {
    tags: [`comments:${params.slug}`],
  });

  const [cachedPosts, cachedComments] = await Promise.all([getCachedPost(), getCachedComments()]);
  const post = 'error' in cachedPosts.response ? undefined : cachedPosts.response.post;
  const comments = 'error' in cachedComments.response ? undefined : cachedComments.response.comments;

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { title: 'Home', link: '/' },
    { title: post.title, link: `/post/${params.slug}` },
  ];

  return (
    <PostProvider comments={comments} {...post}>
      <Breadcrumbs items={breadcrumbItems} />
      <PostContent />
    </PostProvider>
  );
}
