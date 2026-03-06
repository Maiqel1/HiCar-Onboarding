import { useParams, Navigate } from 'react-router-dom'
import { Step1PersonalInfo } from '../steps/Step1PersonalInfo'
import { Step2Preferences } from '../steps/Step2Preferences'
import { Step3ContactSchedule } from '../steps/Step3ContactSchedule'
import { Step4Review } from '../steps/Step4Review'

export const OnboardingPage = () => {
  const { step } = useParams<{ step: string }>()
  const stepNum = Number(step)

  if (!stepNum || stepNum < 1 || stepNum > 4) {
    return <Navigate to="/onboarding/1" replace />
  }

  switch (stepNum) {
    case 1: return <Step1PersonalInfo />
    case 2: return <Step2Preferences />
    case 3: return <Step3ContactSchedule />
    case 4: return <Step4Review />
    default: return <Navigate to="/onboarding/1" replace />
  }
}