import { z } from 'zod';

export const passportFormSchema = z.object({
  passportType: z
    .string()
    .min(1, 'Passport type is required')
    .max(255, 'Passport type must be less than 255 characters')
    .trim(),
  passportNumber: z
    .string()
    .min(1, 'Passport number is required')
    .max(255, 'Passport number must be less than 255 characters')
    .trim(),
  passportStatus: z
    .string()
    .min(1, 'Passport number is required')
    .max(255, 'Passport number must be less than 255 characters')
    .trim(),
  expireDate: z.string().min(1, 'Expire date is required').trim(),
  address: z.string().min(1, 'Expire date is required').trim(),
  passportAmount: z.number().min(0, 'Minimum 0').max(1000, 'Max 1000'),
  passportPages: z.number().min(0, 'Minimum 0').max(50, 'Max 60')
});

export type passportFormValues = z.infer<typeof passportFormSchema>;
