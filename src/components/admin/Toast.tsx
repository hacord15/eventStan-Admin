"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  onDismiss: () => void;
  duration?: number;
}

const icons = {
  success: <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />,
  error: <XCircle size={15} className="text-red-500 shrink-0" />,
  warning: <AlertCircle size={15} className="text-amber-500 shrink-0" />,
};

export function Toast({ message, type = "success", onDismiss, duration = 3500 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 200); }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  return (
    <div className={`fixed bottom-6 right-6 z-[70] flex items-center gap-3 bg-white border border-[#E5E5E5] shadow-xl rounded-xl px-4 py-3 max-w-sm transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      {icons[type]}
      <p className="text-sm font-medium text-[#0F0F0F] flex-1">{message}</p>
      <button onClick={() => { setVisible(false); setTimeout(onDismiss, 200); }} className="p-0.5 hover:bg-[#F5F5F5] rounded-lg transition-colors">
        <X size={12} className="text-[#AAA]" />
      </button>
    </div>
  );
}

// Simple hook for toast management
import { useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ message, type });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  return { toast, showToast, dismissToast };
}
