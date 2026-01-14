'use client';

import { Passport, PASSPORT_STATUS, PASSPORT_TYPE } from '@/types/passport';
import {
  passportFormSchema,
  passportFormValues
} from '../schemas/passport-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  submitButtonText = 'Save Passport'
}: PassportFormProps) {
  const form = useForm({
    resolver: zodResolver(passportFormSchema),
    defaultValues: {
      passportType: passport?.passportType || '',
      passportNumber: passport?.passportNumber || '',
      passportStatus: passport?.passportStatus || '',
      expireDate: passport?.expireDate || '',
      address: passport?.address || '',
      passportAmount: passport?.passportAmount ?? 0,
      passportPages: passport?.passportPages ?? 0,
      employeeId: passport?.employeeId ?? 1
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
    console.log('----------button pressend');
    await onSubmit(data);
  };

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(handleSubmit, (errors) =>
        console.log('❌ FORM ERRORS', errors)
      )}
      className='space-y-6'
    >
      <FormField
        control={form.control}
        name='passportType'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Passport Type <span className='text-destructive'>*</span>
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
                {PASSPORT_TYPE.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      ></FormField>

      <FormField
        control={form.control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter Address'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='passportNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Passport Number <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter Passport Number'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='passportStatus'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Passport Status<span className='text-destructive'>*</span>
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
                {PASSPORT_STATUS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      ></FormField>

      <FormField
        control={form.control}
        name='expireDate'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Expire Date <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='date'
                placeholder='Enter Expire Date'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='passportAmount'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Passport Amount <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter passport amount'
                disabled={isLoading}
                value={
                  typeof field.value === 'number' ||
                  typeof field.value === 'string'
                    ? field.value
                    : ''
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? undefined : Number(e.target.value)
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='passportPages'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Passport Page <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter passport page'
                disabled={isLoading}
                value={
                  typeof field.value === 'number' ||
                  typeof field.value === 'string'
                    ? field.value
                    : ''
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? undefined : Number(e.target.value)
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='employeeId'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Employee Id <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              {/* <Input
                type='number'
                placeholder='Enter employee ID'
                {...field}
                disabled={isLoading}
              /> */}

              <Input
                type='number'
                placeholder='Enter employee ID'
                disabled={isLoading}
                value={
                  typeof field.value === 'number' ||
                  typeof field.value === 'string'
                    ? field.value
                    : ''
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? undefined : Number(e.target.value)
                  )
                }
              />
            </FormControl>
            <FormMessage />
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
