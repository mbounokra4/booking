interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function Loader({
  text = "Chargement...",
  size = "md",
  fullScreen = false,
}: LoaderProps) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-4 text-slate-600",
        fullScreen ? "min-h-screen" : "py-12",
      ].join(" ")}
    >
      {/* Spinner */}
      <div
        className={[
          "rounded-full animate-spin",
          "border-slate-300 border-t-[#0A1A2F]",
          sizes[size],
        ].join(" ")}
      />

      {/* Text */}
      {text && (
        <p className="text-sm font-medium tracking-wide text-slate-500">
          {text}
        </p>
      )}
    </div>
  );
}