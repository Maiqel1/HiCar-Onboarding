import { z } from 'zod'

export const step1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().refine((val) => val === '' || /^\d{7,15}$/.test(val), 'Phone must be 7–15 digits').optional().or(z.literal('')),
  country: z.string().min(1, 'Please select a country'),
})

export type Step1Values = z.infer<typeof step1Schema>