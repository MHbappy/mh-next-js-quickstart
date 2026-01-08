'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { EmployeeForm } from './employee-form';
import { Employee } from '@/types/employee';
import { EmployeeFormValues } from '../schemas/employee-schema';

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function EmployeeDialog({
  open,
  onOpenChange,
  employee,
  onSubmit,
  isLoading = false
}: EmployeeDialogProps) {
  const isEditMode = !!employee;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the employee information below.'
              : 'Fill in the details to create a new employee record.'}
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm
          employee={employee}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitButtonText={isEditMode ? 'Update Employee' : 'Create Employee'}
        />
      </DialogContent>
    </Dialog>
  );
}
