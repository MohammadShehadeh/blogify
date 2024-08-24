'use client';

import Link from 'next/link';
import React from 'react';

import ConfirmDialog from '@/components/confirm-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface TableRowActionsProps {
  onDelete: () => void;
  updateLink: string;
  viewLink: string;
}

export const TableRowAction = ({ onDelete, updateLink, viewLink }: TableRowActionsProps) => {
  return (
    <div className="flex justify-end gap-1">
      <Button className="rounded-full" variant="outline" size="icon" aria-label="View post" asChild>
        <Link href={viewLink}>
          <Icons.view className="size-4" />
        </Link>
      </Button>
      <Button className="rounded-full" variant="outline" size="icon" aria-label="Edit post" asChild>
        <Link href={updateLink}>
          <Icons.pen className="size-4" />
        </Link>
      </Button>
      <ConfirmDialog onConfirm={onDelete}>
        <Button className="rounded-full" variant="outline" aria-label="Delete post" size="icon">
          <Icons.trash className="size-4 text-red-600" />
        </Button>
      </ConfirmDialog>
    </div>
  );
};
