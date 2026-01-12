import { Passport } from '@/types/passport';
import {
  passportFormSchema,
  passportFormValues
} from '../schemas/passport-schema';
import { EmployeeFormValues } from '@/features/employees';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

interface PassportFormProps {
  passport?: Passport;
  onSubmit: (data: passportFormValues) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export function PassportForm({
  passport,
  onSubmit,
  isLoading = false,
  submitButtonText = 'Save Employee'
}: PassportFormProps) {
  const form = useForm<passportFormValues>({
    resolver: zodResolver(passportFormSchema),
    defaultValues: {
      passportType: passport?.passportType || '',
      passportNumber: passport?.passportNumber || '',
      passportStatus: passport?.passportStatus || '',
      expireDate: passport?.expireDate || '',
      address: passport?.address || '',
      passportAmount: passport?.passportAmount || 0,
      passportPages: passport?.passportPages || 0,
      employeeId: passport?.employeeId || 1
    }
  });

  useEffect(() => {
    if (passport) {
      form.reset({
        passportType: passport?.passportType,
        passportNumber: passport?.passportNumber,
        passportStatus: passport?.passportStatus,
        expireDate: passport?.expireDate,
        address: passport?.address,
        passportAmount: passport?.passportAmount,
        passportPages: passport?.passportPages,
        employeeId: passport?.employeeId
      });
    }
  }, [passport, form]);

  const handleSubmit = async (data: passportFormValues) => {
    await onSubmit(data);
  };

  return null;
}
