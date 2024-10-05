'use client';

import { deletePost } from '@/actions/post';
import { TableRowAction } from '@/components/table-row-action';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PostFormValues } from '@/types/zod-schema';

type Column<T> = {
  accessorKey?: keyof T;
  header: string;
  className?: string;
  cell?: (row: T) => React.ReactNode;
  id?: string;
};

interface Post extends PostFormValues {
  id: string;
}

const postColumns: Column<Post>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    className: 'w-[250px] min-w-[100px]',
    cell: (post) => <p className="line-clamp-1">{post.title}</p>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    className: 'w-[350px] min-w-[200px]',
    cell: (post) => <p className="line-clamp-1">{post.description}</p>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (post) => (
      <Badge variant={post.status?.toLowerCase() === 'draft' ? 'secondary' : 'default'}>{post.status}</Badge>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    className: 'text-right',
    cell: (post) => (
      <TableRowAction
        onDelete={() => deletePost(post.id, post.userId)}
        updateLink={`/dashboard/update/${post.id}`}
        viewLink={`/post/${post.id}`}
      />
    ),
  },
];

export function PostsTable({ posts }: { posts: Post[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent posts.</TableCaption>
      <TableHeader>
        <TableRow>
          {postColumns.map((column) => (
            <TableHead key={column.accessorKey || column.id} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts?.map((post, index) => (
          <TableRow key={index}>
            {postColumns.map((column) => (
              <TableCell key={column.accessorKey || column.id} className={column.className}>
                {column.cell?.(post)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
