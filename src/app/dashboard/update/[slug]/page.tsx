import { notFound } from 'next/navigation';

import { getPostById } from '@/actions/post';
import { auth } from '@/auth';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Dashboard, DashboardDescription, DashboardHeader, DashboardTitle } from '@/components/dashboard-header';
import { PostForm } from '@/components/post-form';

export default async function UpdatePage({ params }: { params: { slug: string } }) {
  const session = await auth();
  const results = await getPostById(session, params.slug);

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard/' },
    { title: 'Update', link: '/dashboard/update/' },
  ];

  const post = 'error' in results.response ? undefined : results.response.post;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Dashboard className="mb-6">
        <DashboardHeader>
          <DashboardTitle>Update post</DashboardTitle>
          <DashboardDescription>Manage your post information</DashboardDescription>
        </DashboardHeader>
      </Dashboard>
      <PostForm action="update" {...post} />
    </>
  );
}
