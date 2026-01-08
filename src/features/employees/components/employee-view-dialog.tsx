'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/types/employee';
import { format } from 'date-fns';
import { Calendar, MapPin, User, Users, UserCircle } from 'lucide-react';

interface EmployeeViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
}

export function EmployeeViewDialog({
  open,
  onOpenChange,
  employee
}: EmployeeViewDialogProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            Complete information about the employee
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <User className='text-muted-foreground mt-1 size-5' />
              <div className='flex-1'>
                <p className='text-muted-foreground text-sm font-medium'>
                  Full Name
                </p>
                <p className='text-base font-semibold'>{employee.name}</p>
              </div>
            </div>

            <Separator />

            <div className='flex items-start gap-3'>
              <MapPin className='text-muted-foreground mt-1 size-5' />
              <div className='flex-1'>
                <p className='text-muted-foreground text-sm font-medium'>
                  Address
                </p>
                <p className='text-base'>{employee.address}</p>
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-start gap-3'>
                <Users className='text-muted-foreground mt-1 size-5' />
                <div className='flex-1'>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Gender
                  </p>
                  <Badge variant='outline' className='mt-1 capitalize'>
                    {employee.gender}
                  </Badge>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <UserCircle className='text-muted-foreground mt-1 size-5' />
                <div className='flex-1'>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Marital Status
                  </p>
                  <Badge
                    variant={employee.isMarried ? 'default' : 'secondary'}
                    className='mt-1'
                  >
                    {employee.isMarried ? 'Married' : 'Unmarried'}
                  </Badge>
                </div>
              </div>
            </div>

            {employee.fatherName && (
              <>
                <Separator />
                <div className='flex items-start gap-3'>
                  <User className='text-muted-foreground mt-1 size-5' />
                  <div className='flex-1'>
                    <p className='text-muted-foreground text-sm font-medium'>
                      Father&apos;s Name
                    </p>
                    <p className='text-base'>{employee.fatherName}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <Separator />

          {/* Metadata */}
          <div className='bg-muted/50 space-y-3 rounded-lg p-4'>
            <h4 className='text-sm font-semibold'>Record Information</h4>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              <div>
                <p className='text-muted-foreground'>Employee ID</p>
                <p className='font-medium'>#{employee.id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Created At</p>
                <p className='font-medium'>
                  {format(new Date(employee.createdAt), 'PPP')}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground'>Last Updated</p>
                <p className='font-medium'>
                  {format(new Date(employee.updatedAt), 'PPP')}
                </p>
              </div>
              {employee.createdBy && (
                <div>
                  <p className='text-muted-foreground'>Created By</p>
                  <p className='font-medium'>User #{employee.createdBy}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
