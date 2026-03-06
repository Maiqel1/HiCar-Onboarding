import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormStore } from '../store/useFormStore'
import { useStepNavigation } from '../hooks/useStepNavigation'
import { FormLayout } from '../components/FormLayout'

const ReviewRow = ({ label, value, empty = '—' }: { label: string; value?: string; empty?: string }) => (
  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-500 w-40 flex-shrink-0">{label}</span>
    <span className="text-sm text-slate-800 font-medium text-right">{value || empty}</span>
  </div>
)

const ReviewSection = ({ title, step, onEdit, children }: { title: string; step: number; onEdit: (s: number) => void; children: React.ReactNode }) => (
  <div className="rounded-xl border border-slate-200 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
      >
        Edit
      </button>
    </div>
    <div className="px-4 py-1">{children}</div>
  </div>
)

const PURCHASE_LABELS: Record<string, string> = { cash: 'Cash', financing: 'Financing' }
const VEHICLE_LABELS: Record<string, string> = { ev: 'Electric (EV)', hybrid: 'Hybrid', gas: 'Gas', unsure: 'Unsure' }
const CONTACT_LABELS: Record<string, string> = { email: 'Email', phone: 'Phone', whatsapp: 'WhatsApp' }
const CREDIT_LABELS: Record<string, string> = { poor: 'Poor (300–579)', fair: 'Fair (580–669)', good: 'Good (670–739)', very_good: 'Very Good (740–799)', exceptional: 'Exceptional (800–850)' }
const EMPLOYMENT_LABELS: Record<string, string> = { employed: 'Employed', self_employed: 'Self-Employed', unemployed: 'Unemployed', retired: 'Retired', student: 'Student' }

export const Step4Review = () => {
  const { step1, step2, step3, resetForm } = useFormStore()
  const { goBack, goToStep, currentStep } = useStepNavigation()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    resetForm()
    navigate('/success')
  }

  const formatDate = (d: string) => d ? new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d)) : ''

  return (
    <FormLayout
      currentStep={4}
      title="Review & Submit"
      subtitle="Everything look correct? Edit any section before submitting."
      onNext={handleSubmit}
      onBack={() => goBack(currentStep)}
      isSubmitting={isSubmitting}
      nextLabel="Submit Application"
      isLastStep
    >
      <ReviewSection title="Personal Information" step={1} onEdit={goToStep}>
        <ReviewRow label="First Name" value={step1.firstName} />
        <ReviewRow label="Last Name" value={step1.lastName} />
        <ReviewRow label="Email" value={step1.email} />
        <ReviewRow label="Phone" value={step1.phone} empty="Not provided" />
        <ReviewRow label="Country" value={step1.country.toUpperCase()} />
      </ReviewSection>

      <ReviewSection title="Purchase Preferences" step={2} onEdit={goToStep}>
        <ReviewRow label="Purchase Type" value={PURCHASE_LABELS[step2.purchaseType]} />
        <ReviewRow label="Vehicle Type" value={VEHICLE_LABELS[step2.vehicleType]} />
        <ReviewRow label="Budget" value={step2.budgetMin && step2.budgetMax ? `$${Number(step2.budgetMin).toLocaleString()} – $${Number(step2.budgetMax).toLocaleString()}` : undefined} />
        {step2.purchaseType === 'financing' && <>
          <ReviewRow label="Credit Score" value={CREDIT_LABELS[step2.creditScoreRange]} />
          <ReviewRow label="Employment" value={EMPLOYMENT_LABELS[step2.employmentStatus]} />
        </>}
        {step2.vehicleType === 'ev' && <ReviewRow label="Home Charging" value={step2.homeCharging === 'yes' ? 'Yes' : 'No'} />}
      </ReviewSection>

      <ReviewSection title="Contact & Schedule" step={3} onEdit={goToStep}>
        <ReviewRow label="Contact Method" value={CONTACT_LABELS[step3.preferredContact]} />
        <ReviewRow label="Address" value={step3.addressLine1} />
        <ReviewRow label="City" value={step3.city} />
        <ReviewRow label="Postal Code" value={step3.postalCode} />
        <ReviewRow label="Test Drive" value={step3.testDriveDate ? formatDate(step3.testDriveDate) : undefined} empty="Not scheduled" />
      </ReviewSection>
    </FormLayout>
  )
}

import React from 'react'