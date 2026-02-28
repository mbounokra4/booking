import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={[
          "w-full px-4 py-2.5 rounded-2xl border text-sm transition-all duration-200",
          "bg-white text-slate-900 placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-[#0A1A2F]",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-slate-300",
          className,
        ].join(" ")}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}