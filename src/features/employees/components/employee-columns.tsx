'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';
import { format } from 'date-fns';

interface EmployeeActionsProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

function EmployeeActions({
  employee,
  onEdit,
  onDelete,
  onView
}: EmployeeActionsProps) {
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
        <DropdownMenuItem onClick={() => onView(employee)}>
          <Eye className='mr-2 size-4' />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(employee)}>
          <Pencil className='mr-2 size-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(employee)}
          className='text-destructive focus:text-destructive'
        >
          <Trash2 className='mr-2 size-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const createEmployeeColumns = (
  onEdit: (employee: Employee) => void,
  onDelete: (employee: Employee) => void,
  onView: (employee: Employee) => void
): ColumnDef<Employee>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='font-medium'>#{row.getValue('id')}</div>
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='font-medium'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      const gender = row.getValue('gender') as string;
      return (
        <Badge variant='outline' className='capitalize'>
          {gender}
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
    accessorKey: 'fatherName',
    header: "Father's Name",
    cell: ({ row }) => <div>{row.getValue('fatherName') || '-'}</div>
  },
  {
    accessorKey: 'isMarried',
    header: 'Marital Status',
    cell: ({ row }) => {
      const isMarried = row.getValue('isMarried') as boolean;
      return (
        <Badge variant={isMarried ? 'default' : 'secondary'}>
          {isMarried ? 'Married' : 'Unmarried'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return (
        <div className='text-muted-foreground text-sm'>
          {format(new Date(date), 'MMM dd, yyyy')}
        </div>
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <EmployeeActions
        employee={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    )
  }
];
