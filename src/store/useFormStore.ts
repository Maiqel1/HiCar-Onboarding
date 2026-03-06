import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Step1Data {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
}

export interface Step2Data {
  purchaseType: string
  vehicleType: string
  budgetMin: string
  budgetMax: string
  creditScoreRange: string
  employmentStatus: string
  homeCharging: string
}

export interface Step3Data {
  preferredContact: string
  addressLine1: string
  city: string
  postalCode: string
  testDriveDate: string
}

interface FormState {
  step1: Step1Data
  step2: Step2Data
  step3: Step3Data
  completedSteps: number[]
  lastSaved: string | null
  setStep1: (data: Step1Data) => void
  setStep2: (data: Step2Data) => void
  setStep3: (data: Step3Data) => void
  markStepComplete: (step: number) => void
  resetForm: () => void
}

const defaultStep1: Step1Data = { firstName: '', lastName: '', email: '', phone: '', country: '' }
const defaultStep2: Step2Data = { purchaseType: '', vehicleType: '', budgetMin: '', budgetMax: '', creditScoreRange: '', employmentStatus: '', homeCharging: '' }
const defaultStep3: Step3Data = { preferredContact: '', addressLine1: '', city: '', postalCode: '', testDriveDate: '' }

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      step1: defaultStep1,
      step2: defaultStep2,
      step3: defaultStep3,
      completedSteps: [],
      lastSaved: null,
      setStep1: (data) => set({ step1: data, lastSaved: new Date().toISOString() }),
      setStep2: (data) => set({ step2: data, lastSaved: new Date().toISOString() }),
      setStep3: (data) => set({ step3: data, lastSaved: new Date().toISOString() }),
      markStepComplete: (step) => set((state) => ({
        completedSteps: state.completedSteps.includes(step) ? state.completedSteps : [...state.completedSteps, step]
      })),
      resetForm: () => set({ step1: defaultStep1, step2: defaultStep2, step3: defaultStep3, completedSteps: [], lastSaved: null }),
    }),
    { name: 'onboarding-draft' }
  )
)