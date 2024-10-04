import { unstable_cache } from 'next/cache';

import { getPostsByAuthorId } from '@/actions/post';
import { auth } from '@/auth';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  Dashboard,
  DashboardButton,
  DashboardDescription,
  DashboardHeader,
  DashboardTitle,
} from '@/components/dashboard-header';
import { PostsTable } from '@/components/posts-table';

export default async function DashboardPage() {
  const session = await auth();

  const getCachedPost = unstable_cache(
    async () => getPostsByAuthorId(session),
    [session?.user?.id as string], // The dashboard page will only be accessible if a user ID is present
    { tags: [`posts:${session?.user?.id}`] }
  );

  const results = await getCachedPost();
  const breadcrumbItems = [{ title: 'Dashboard', link: '/dashboard' }];
  const posts = 'error' in results.response ? [] : results.response.posts;

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Dashboard>
        <DashboardHeader>
          <DashboardTitle>Post List</DashboardTitle>
          <DashboardDescription>Manage your blog posts easily</DashboardDescription>
        </DashboardHeader>
        <DashboardButton href="/dashboard/create/">Create new post</DashboardButton>
      </Dashboard>
      <PostsTable posts={posts} />
    </>
  );
}
