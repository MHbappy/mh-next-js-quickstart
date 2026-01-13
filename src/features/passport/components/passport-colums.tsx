'use client';

import { Badge } from '@/components/ui/badge';
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
import { format } from 'date-fns';
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
  console.log('passport--------');
  console.log(passport);

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
  },
  {
    accessorKey: 'passportType',
    header: 'Passport Type',
    cell: ({ row }) => {
      const passportType = row.getValue('passportType') as string;
      return (
        <Badge variant='outline' className='capitalize'>
          {passportType}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'passportNumber',
    header: 'Passport Number',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('passportNumber')}</div>
    )
  },
  {
    accessorKey: 'passportStatus',
    header: 'Passport Status',
    cell: ({ row }) => {
      const passportStatus = row.getValue('passportStatus') as string;
      return (
        <Badge variant='outline' className='capitalize'>
          {passportStatus}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <div className='max-w-[300px] truncate' title={row.getValue('address')}>
        {row.getValue('address')}
      </div>
    )
  },
  {
    accessorKey: 'expireDate',
    header: 'Expire Date',
    cell: ({ row }) => {
      const date = row.getValue('expireDate') as string;
      return (
        <div className='text-muted-foreground text-sm'>
          {format(new Date(date), 'MMM dd, yyyy')}
        </div>
      );
    }
  },
  {
    accessorKey: 'passportAmount',
    header: 'Passport Amount',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('passportAmount')}</div>
    )
  },
  {
    id: 'actiion',
    header: 'Action',
    cell: ({ row }) => (
      <PassportAction
        passport={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    )
  }
];
