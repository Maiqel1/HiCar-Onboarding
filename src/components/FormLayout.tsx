import React, { useEffect, useState } from "react";
import { Stepper } from "./Stepper";
import { useFormStore } from "../store/useFormStore";

const STEP_LABELS = ["Your Info", "Preferences", "Contact", "Review"];
const STEP_SUBTITLES = [
  "Personal Information",
  "Purchase Preferences",
  "Contact & Schedule",
  "Review & Submit",
];

interface FormLayoutProps {
  currentStep: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  isLastStep?: boolean;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  currentStep,
  title,
  subtitle,
  children,
  onNext,
  onBack,
  isSubmitting,
  nextLabel,
  isLastStep,
}) => {
  const { completedSteps, lastSaved } = useFormStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [currentStep]);

  const savedLabel = lastSaved
    ? `Draft saved at ${new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(lastSaved))}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl min-h-[600px]">
        <div className="hidden md:flex w-72 flex-shrink-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-emerald-950 border-r border-emerald-900/30 flex-col p-10">
          <div className="mb-12">
            <h1 className="text-white text-2xl font-bold tracking-tight">
              HiCar
            </h1>
            <p className="text-white/30 text-xs mt-1">Vehicle Onboarding</p>
          </div>
          <Stepper
            currentStep={currentStep}
            totalSteps={4}
            completedSteps={completedSteps}
            labels={STEP_LABELS}
            subtitles={STEP_SUBTITLES}
          />
        </div>

        <div className="flex-1 flex flex-col bg-white">
          <div className="md:hidden bg-gradient-to-r from-zinc-900 to-emerald-900 px-6 pt-6 pb-8">
            <h1 className="text-white text-base font-bold">HiCar</h1>
            <p className="text-white/40 text-xs mt-0.5 mb-5">
              Vehicle Onboarding
            </p>
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }, (_, i) => {
                const stepNum = i + 1;
                const isCompleted = completedSteps.includes(stepNum);
                const isCurrent = stepNum === currentStep;
                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isCurrent
                          ? "border-white text-white"
                          : "border-white/25 text-white/25"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="flex-1 flex flex-col px-6 py-6 md:px-10 md:py-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="mb-8">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                Step {currentStep} of 4
              </span>
              <h2 className="text-2xl font-bold text-zinc-800 mt-1">{title}</h2>
              {subtitle && (
                <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
              )}
              {savedLabel && (
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" />
                    <path
                      d="M6 3v3l2 1.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                  </svg>
                  {savedLabel}
                </p>
              )}
            </div>

            <div className="space-y-5 flex-1">{children}</div>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-zinc-100">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 border border-zinc-200 bg-white hover:text-zinc-700 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 12L6 8l4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Go Back
                </button>
              ) : (
                <div />
              )}

              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="32"
                          strokeDashoffset="12"
                          strokeLinecap="round"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      {nextLabel ??
                        (isLastStep ? "Submit Application" : "Next Step")}
                      {!isLastStep && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
