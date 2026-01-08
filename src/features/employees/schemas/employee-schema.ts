import { z } from 'zod';

/**
 * Employee Form Validation Schema
 * Using Zod for type-safe form validation
 */
export const employeeFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters')
    .trim(),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(500, 'Address must be less than 500 characters')
    .trim(),
  gender: z.string().min(1, 'Gender is required'),
  fatherName: z
    .string()
    .max(255, "Father's name must be less than 255 characters")
    .optional()
    .or(z.literal('')),
  isMarried: z.boolean().optional()
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
