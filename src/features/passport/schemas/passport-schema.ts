import { z } from 'zod';

export const passportFormSchema = z.object({
  passportType: z.string().min(1),
  passportNumber: z.string().min(1),
  passportStatus: z.string().min(1),
  expireDate: z.string().min(1),
  address: z.string().min(1),

  passportAmount: z.coerce.number().min(0).max(1000),
  passportPages: z.coerce.number().min(0).max(50),
  employeeId: z.coerce.number().min(0).max(1_000_000_000)
});

export type passportFormValues = z.infer<typeof passportFormSchema>;
