'use client';

import { PassportService } from '@/lib/api/passport.service';
import { Passport } from '@/types/passport';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { passportFormValues } from '../schemas/passport-schema';

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
    try {
      setIsSubmitting(true);
      const response = await PassportService.createPassport(data);
      if (response.success) {
        toast.success(response.message || 'Employee created successfully');
        setIsCreateDialogOpen(false);
        //fetchEmployees();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };
}
