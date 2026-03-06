import { z } from 'zod'

export const createStep3Schema = (phoneFromStep1: string) =>
  z.object({
    preferredContact: z.enum(['email', 'phone', 'whatsapp'], { message: 'Please select a contact method' }),
    addressLine1: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    testDriveDate: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (!data.preferredContact) {
      ctx.addIssue({ code: 'custom', message: 'Please select a contact method', path: ['preferredContact'] })
    }
    if ((data.preferredContact === 'phone' || data.preferredContact === 'whatsapp') && !phoneFromStep1) {
      ctx.addIssue({ code: 'custom', message: 'Go back to Step 1 and add your phone number to use this contact method', path: ['preferredContact'] })
    }
      if (data.testDriveDate && new Date(data.testDriveDate) <= new Date()) {
        ctx.addIssue({ code: 'custom', message: 'Test drive date must be in the future', path: ['testDriveDate'] })
      }
  })

export type Step3Values = z.infer<ReturnType<typeof createStep3Schema>>