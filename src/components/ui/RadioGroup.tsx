import React from 'react'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label: string
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, error, required }) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>

      <div className="flex flex-row flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer text-sm transition-all duration-150 select-none ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-blue-500' : 'border-slate-300'}`}>
                {isSelected && <span className="w-2 h-2 rounded-full bg-blue-500 block" />}
              </span>
              {opt.label}
            </label>
          )
        })}
      </div>

      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
    </fieldset>
  )
}