import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-12 px-6 text-center">

      {/* Card style */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 shadow-sm max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertCircle size={28} className="text-red-600" />
          </div>
        </div>

        {/* Message */}
        <p className="text-sm font-medium text-red-700 leading-relaxed">
          {message}
        </p>

        {/* Retry */}
        {onRetry && (
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
            >
              Réessayer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}