import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {hint && (
          <p className="text-xs text-slate-400" id={`${id}-hint`}>
            {hint}
          </p>
        )}

        <input
          ref={ref}
          id={id}
          aria-describedby={
            [error ? `${id}-error` : "", hint ? `${id}-hint` : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={!!error}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 focus:ring-red-400/30"
              : "border-slate-200 hover:border-slate-300 focus:ring-emerald-500/30 focus:border-emerald-500"
          }`}
          {...props}
        />

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
