import { Passport, PASSPORT_STATUS, PASSPORT_TYPE } from '@/types/passport';
import {
  passportFormSchema,
  passportFormValues
} from '../schemas/passport-schema';
import { EmployeeFormValues } from '@/features/employees';
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
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';

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

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
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
            <FormControl>
              <SelectContent>
                {PASSPORT_TYPE.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <FormField
        control={form.control}
        name='passportNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
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
            <FormControl>
              <SelectContent>
                {PASSPORT_STATUS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <FormField
        control={form.control}
        name='expireDate'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
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
              Address <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter passport amount'
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
        name='passportPages'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter passport page'
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
        name='employeeId'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address <span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter employee ID'
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
