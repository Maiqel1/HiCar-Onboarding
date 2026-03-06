import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingPage } from './pages/OnboardingPage'
import { SuccessPage } from './pages/SuccessPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/1" replace />} />
        <Route path="/onboarding/:step" element={<OnboardingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/onboarding/1" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App