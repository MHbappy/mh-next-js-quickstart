'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  employeeFormSchema,
  type EmployeeFormValues
} from '../schemas/employee-schema';
import { GENDER_OPTIONS, type Employee } from '@/types/employee';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export function EmployeeForm({
  employee,
  onSubmit,
  isLoading = false,
  submitButtonText = 'Save Employee'
}: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: employee?.name || '',
      address: employee?.address || '',
      gender: employee?.gender || '',
      fatherName: employee?.fatherName || '',
      isMarried: employee?.isMarried || false
    }
  });

  // Reset form when employee changes (for edit mode)
  useEffect(() => {
    if (employee) {
      form.reset({
        name: employee.name,
        address: employee.address,
        gender: employee.gender,
        fatherName: employee.fatherName || '',
        isMarried: employee.isMarried || false
      });
    }
  }, [employee, form]);

  const handleSubmit = async (data: EmployeeFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
      className='space-y-6'
    >
      {/* Name Field */}
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter full name'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address Field */}
      <FormField
        control={form.control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Enter complete address'
                className='min-h-[100px] resize-none'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gender Field */}
      <FormField
        control={form.control}
        name='gender'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Gender <span className='text-destructive'>*</span>
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select gender' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Father's Name Field */}
      <FormField
        control={form.control}
        name='fatherName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father&apos;s Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter father's name (optional)"
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormDescription>Optional field</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Marital Status Field */}
      <FormField
        control={form.control}
        name='isMarried'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel className='text-base'>Marital Status</FormLabel>
              <FormDescription>Is the employee married?</FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <div className='flex justify-end gap-4'>
        <Button type='submit' disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 size-4 animate-spin' />}
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
}
