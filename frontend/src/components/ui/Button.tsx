import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  loading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#0A1A2F] text-white hover:bg-[#0C2540] focus-visible:ring-[#0A1A2F] shadow-lg rounded-2xl",

  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400 rounded-2xl",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 rounded-2xl shadow-md",

  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 rounded-2xl",

  outline:
    "bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400 rounded-2xl",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const showLoader = isLoading || loading;

  return (
    <button
      disabled={disabled || showLoader}
      className={[
        base,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {showLoader && (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}