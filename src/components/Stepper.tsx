import React from 'react'

interface StepperProps {
  currentStep: number
  totalSteps: number
  completedSteps: number[]
  labels: string[]
  subtitles: string[]
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps, completedSteps, labels }) => {
  return (
    <nav aria-label="Form progress" className="flex flex-col gap-7">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        const isCompleted = completedSteps.includes(stepNum)
        const isCurrent = stepNum === currentStep

        return (
          <div key={stepNum} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : isCurrent
                ? 'bg-transparent border-emerald-500 text-emerald-400'
                : 'bg-transparent border-zinc-700 text-zinc-600'
            }`}>
              {isCompleted ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : stepNum}
            </div>

            <div className="flex flex-col">
              <span className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${
                isCurrent ? 'text-zinc-500' : isCompleted ? 'text-zinc-600' : 'text-zinc-700'
              }`}>
                Step {stepNum}
              </span>
              <span className={`text-sm font-semibold transition-colors duration-300 ${
                isCurrent ? 'text-white' : isCompleted ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {labels[i]}
              </span>
            </div>
          </div>
        )
      })}
    </nav>
  )
}