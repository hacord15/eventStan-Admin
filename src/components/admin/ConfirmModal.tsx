"use client";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  confirmDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  title, message, confirmLabel = "Confirm",
  confirmDanger = false, onConfirm, onCancel
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="modal-backdrop absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[400px] p-6 modal-panel">
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl shrink-0 ${confirmDanger ? "bg-red-50" : "bg-amber-50"}`}>
            <AlertTriangle size={20} className={confirmDanger ? "text-red-500" : "text-amber-500"} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#0F0F0F] text-base">{title}</h3>
            <p className="text-sm text-[#888] mt-1 leading-relaxed">{message}</p>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-[#F5F5F5] rounded-lg transition-colors shrink-0">
            <X size={14} className="text-[#AAA]" />
          </button>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onCancel}
            className="flex-1 py-2.5 bg-[#F5F5F5] text-[#555] rounded-xl text-sm font-semibold hover:bg-[#EBEBEB] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
              confirmDanger ? "bg-red-500 hover:bg-red-600" : "bg-[#F97316] hover:bg-[#EA6C0A]"
            }`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
