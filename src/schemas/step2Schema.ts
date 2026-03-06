import { z } from 'zod'

export const step2Schema = z.object({
  purchaseType: z.enum(['cash', 'financing'], { message: 'Please select a purchase type' }),
  vehicleType: z.enum(['ev', 'hybrid', 'gas', 'unsure'], { message: 'Please select a vehicle type' }),
  budgetMin: z.string().min(1, 'Budget minimum is required'),
  budgetMax: z.string().min(1, 'Budget maximum is required'),
  creditScoreRange: z.string().optional(),
  employmentStatus: z.string().optional(),
  homeCharging: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.purchaseType) {
    ctx.addIssue({ code: 'custom', message: 'Please select a purchase type', path: ['purchaseType'] })
  }
  if (!data.vehicleType) {
    ctx.addIssue({ code: 'custom', message: 'Please select a vehicle type', path: ['vehicleType'] })
  }
  if (Number(data.budgetMin) > Number(data.budgetMax)) {
    ctx.addIssue({ code: 'custom', message: 'Minimum must be less than or equal to maximum', path: ['budgetMin'] })
  }
  if (data.purchaseType === 'financing') {
    if (!data.creditScoreRange) ctx.addIssue({ code: 'custom', message: 'Please select a credit score range', path: ['creditScoreRange'] })
    if (!data.employmentStatus) ctx.addIssue({ code: 'custom', message: 'Please select your employment status', path: ['employmentStatus'] })
  }
  if (data.vehicleType === 'ev' && !data.homeCharging) {
    ctx.addIssue({ code: 'custom', message: 'Please indicate home charging availability', path: ['homeCharging'] })
  }
})

export type Step2Values = z.infer<typeof step2Schema>