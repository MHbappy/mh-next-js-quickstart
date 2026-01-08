'use client';

import { useEffect, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { EmployeeService } from '@/lib/api/employee.service';
import { Employee } from '@/types/employee';
import { EmployeeFormValues } from '../schemas/employee-schema';
import { EmployeeTable } from '../components/employee-table';
import { createEmployeeColumns } from '../components/employee-columns';
import { EmployeeDialog } from '../components/employee-dialog';
import { EmployeeViewDialog } from '../components/employee-view-dialog';
import { DeleteEmployeeDialog } from '../components/delete-employee-dialog';

export function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected employee for edit/view/delete
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await EmployeeService.getAllEmployees();
      if (response.success && response.data) {
        setEmployees(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Create employee
  const handleCreate = async (data: EmployeeFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await EmployeeService.createEmployee(data);
      if (response.success) {
        toast.success(response.message || 'Employee created successfully');
        setIsCreateDialogOpen(false);
        fetchEmployees();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update employee
  const handleUpdate = async (data: EmployeeFormValues) => {
    if (!selectedEmployee) return;

    try {
      setIsSubmitting(true);
      const response = await EmployeeService.updateEmployee(
        selectedEmployee.id,
        data
      );
      if (response.success) {
        toast.success(response.message || 'Employee updated successfully');
        setIsEditDialogOpen(false);
        setSelectedEmployee(null);
        fetchEmployees();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete employee
  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      setIsDeleting(true);
      const response = await EmployeeService.deleteEmployee(
        selectedEmployee.id
      );
      if (response.success) {
        toast.success(response.message || 'Employee deleted successfully');
        setIsDeleteDialogOpen(false);
        setSelectedEmployee(null);
        fetchEmployees();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  // Action handlers
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  // Create columns with action handlers
  const columns = createEmployeeColumns(
    handleEdit,
    handleDeleteClick,
    handleView
  );

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Employees</h1>
          <p className='text-muted-foreground'>Manage your employee records</p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={fetchEmployees}
            disabled={isLoading}
          >
            <RefreshCw
              className={`mr-2 size-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
          <Button size='sm' onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className='mr-2 size-4' />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex h-[400px] items-center justify-center'>
              <RefreshCw className='text-muted-foreground size-8 animate-spin' />
            </div>
          ) : (
            <EmployeeTable columns={columns} data={employees} />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EmployeeDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      <EmployeeDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        employee={selectedEmployee || undefined}
        onSubmit={handleUpdate}
        isLoading={isSubmitting}
      />

      <EmployeeViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        employee={selectedEmployee}
      />

      <DeleteEmployeeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        employee={selectedEmployee}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
