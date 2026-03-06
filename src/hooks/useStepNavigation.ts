import { useNavigate, useParams } from 'react-router-dom'
import { useFormStore } from '../store/useFormStore'

export const useStepNavigation = () => {
  const navigate = useNavigate()
  const { step } = useParams<{ step: string }>()
  const { markStepComplete } = useFormStore()

  const currentStep = Number(step) || 1

  const goNext = (stepNum: number) => {
    markStepComplete(stepNum)
    navigate(`/onboarding/${stepNum + 1}`)
  }

  const goBack = (stepNum: number) => {
    if (stepNum > 1) navigate(`/onboarding/${stepNum - 1}`)
  }

  const goToStep = (stepNum: number) => {
    navigate(`/onboarding/${stepNum}`)
  }

  return { currentStep, goNext, goBack, goToStep }
}