import { getPostsByAuthorId } from '@/actions/post';
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
  const results = await getPostsByAuthorId();
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
