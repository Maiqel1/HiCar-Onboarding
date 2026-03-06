import { useNavigate } from 'react-router-dom'

export const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M8 20l8 8L32 12"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">You're all set!</h1>
        <p className="text-zinc-400 mb-8">
          Your application has been submitted. Our team will be in touch within 24 hours.
        </p>
        <button
          onClick={() => navigate('/onboarding/1')}
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 cursor-pointer"
        >
          Start a new application
        </button>
      </div>
    </div>
  )
}