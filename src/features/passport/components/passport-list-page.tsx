'use client';

import { PassportService } from '@/lib/api/passport.service';
import { Passport } from '@/types/passport';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { passportFormValues } from '../schemas/passport-schema';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPassportColumns } from './passport-colums';
import { PassportDialog } from './passport-dialog';
import { PassportViewDialog } from './passport-view-dialog';
import { DeletePassportDialog } from './delete-passport-dialog';
import { PassportTable } from './passport-table';

export function PassportListPage() {
  const [passport, setPassport] = useState<Passport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected passport for edit/view/delete
  const [selectedPassport, setSelectedPassport] = useState<Passport | null>(
    null
  );

  // Fetch all passport
  const fetchPassport = async () => {
    try {
      setIsLoading(true);
      const response = await PassportService.getAllPassport();
      if (response.success && response.data) {
        setPassport(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPassport();
  }, []);

  // Create employee
  const handleCreate = async (data: passportFormValues) => {
    console.log('handle ------- create');

    try {
      setIsSubmitting(true);
      const response = await PassportService.createPassport(data);
      if (response.success) {
        toast.success(response.message || 'Employee created successfully');
        setIsCreateDialogOpen(false);
        fetchPassport();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update employee
  const handleUpdate = async (data: passportFormValues) => {
    if (!selectedPassport) return;

    try {
      setIsSubmitting(true);
      const response = await PassportService.updatePassport(
        selectedPassport.id,
        data
      );
      if (response.success) {
        toast.success(response.message || 'Employee updated successfully');
        setIsEditDialogOpen(false);
        setSelectedPassport(null);
        fetchPassport();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete employee
  const handleDelete = async () => {
    if (!selectedPassport) return;

    try {
      setIsDeleting(true);
      const response = await PassportService.deletePassport(
        selectedPassport.id
      );
      if (response.success) {
        toast.success(response.message || 'Employee deleted successfully');
        setIsDeleteDialogOpen(false);
        setSelectedPassport(null);
        fetchPassport();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (employee: Passport) => {
    setSelectedPassport(employee);
    setIsEditDialogOpen(true);
  };

  const handleView = (employee: Passport) => {
    setSelectedPassport(employee);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (employee: Passport) => {
    setSelectedPassport(employee);
    setIsDeleteDialogOpen(true);
  };

  // Create columns with action handlers
  const columns = createPassportColumns(
    handleEdit,
    handleDeleteClick,
    handleView
  );

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Passport</h1>
          <p className='text-muted-foreground'>Manage your passport records</p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={fetchPassport}
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
            <PassportTable columns={columns} data={passport} />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <PassportDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      <PassportDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        passport={selectedPassport || undefined}
        onSubmit={handleUpdate}
        isLoading={isSubmitting}
      />

      <PassportViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        passport={selectedPassport}
      />

      <DeletePassportDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        passport={selectedPassport}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
