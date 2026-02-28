import { CheckCircle, XCircle, Info, X } from "lucide-react";
import type { Toast as ToastType } from "../../hooks/useToast";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const toastStyles = {
  success: {
    icon: <CheckCircle size={18} className="text-green-600" />,
    border: "border-green-500",
    bg: "bg-green-50",
  },
  error: {
    icon: <XCircle size={18} className="text-red-600" />,
    border: "border-red-500",
    bg: "bg-red-50",
  },
  info: {
    icon: <Info size={18} className="text-[#0A1A2F]" />,
    border: "border-[#0A1A2F]",
    bg: "bg-slate-50",
  },
};

function ToastItem({ toast, onRemove }: ToastProps) {
  const style = toastStyles[toast.type];

  return (
    <div
      className={[
        "flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl",
        "border-l-4 border",
        "backdrop-blur-xl bg-white/90",
        "animate-[fadeIn_0.2s_ease-out]",
        style.border,
      ].join(" ")}
    >
      {/* Icon */}
      <span className="mt-0.5">{style.icon}</span>

      {/* Message */}
      <p className="text-sm text-slate-800 flex-1 leading-relaxed">
        {toast.message}
      </p>

      {/* Close */}
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}