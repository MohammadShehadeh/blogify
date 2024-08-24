import { Breadcrumbs } from '@/components/breadcrumbs';
import { Dashboard, DashboardDescription, DashboardHeader, DashboardTitle } from '@/components/dashboard-header';
import { PostForm } from '@/components/post-form';

export default function CreatePage() {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard/' },
    { title: 'Create', link: '/dashboard/create/' },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Dashboard className="mb-6">
        <DashboardHeader>
          <DashboardTitle>Create new post</DashboardTitle>
          <DashboardDescription>Manage your post information</DashboardDescription>
        </DashboardHeader>
      </Dashboard>
      <PostForm action="create" />
    </>
  );
}
