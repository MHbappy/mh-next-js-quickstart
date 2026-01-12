'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Passport } from '@/types/passport';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

interface PassportActionProps {
  passport: Passport;
  onEdit: (passport: Passport) => void;
  onDelete: (passport: Passport) => void;
  onView: (passport: Passport) => void;
}

function PassportAction({
  passport,
  onEdit,
  onDelete,
  onView
}: PassportActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='size-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onView(passport)}>
          <Eye className='mr-2 size-4' />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(passport)}>
          <Pencil className='mr-2 size-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(passport)}>
          <Trash2 className='mr-2 size-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const createPassportColumns = (
  onEdit: (passport: Passport) => void,
  onDelete: (passport: Passport) => void,
  onView: (passport: Passport) => void
): ColumnDef<Passport>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='font-medium'>#{row.getValue('id')}</div>
  }
];
