import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "glass";
}

export function Card({
  children,
  className = "",
  onClick,
  variant = "default",
}: CardProps) {
  const base =
    "rounded-3xl p-6 transition-all duration-200";

  const variants = {
    default:
      "bg-white border border-slate-200 shadow-sm hover:shadow-lg",

    glass:
      "bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl",
  };

  return (
    <div
      onClick={onClick}
      className={[
        base,
        variants[variant],
        onClick ? "cursor-pointer hover:-translate-y-1 active:scale-[0.99]" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}