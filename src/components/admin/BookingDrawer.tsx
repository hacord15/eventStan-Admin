"use client";
import { X, Calendar, User, Store, CreditCard, Clock, AlertCircle, CheckCircle, XCircle, Bell } from "lucide-react";
import type { Booking } from "@/types";
import { BookingStatusBadge } from "./StatusBadge";

interface BookingDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onCancel?: (id: string) => void;
  onMarkRejected?: (id: string) => void;
  onSendReminder?: (id: string) => void;
}

export function BookingDrawer({ booking, onClose, onCancel, onMarkRejected, onSendReminder }: BookingDrawerProps) {
  if (!booking) return null;

  const balanceDue = booking.amount - booking.paidAmount;
  const paidPct = Math.round((booking.paidAmount / booking.amount) * 100);

  const timeline = [
    { label: "Booking Created", time: booking.createdAt, done: true, icon: <CheckCircle size={12} /> },
    { label: "Payment Received (50%)", time: booking.paidAmount > 0 ? booking.createdAt : null, done: booking.paidAmount > 0, icon: <CreditCard size={12} /> },
    { label: "Sent to Vendor", time: booking.createdAt, done: true, icon: <Store size={12} /> },
    {
      label: booking.status === "Accepted" || booking.status === "Confirmed" ? "Vendor Accepted" :
             booking.status.startsWith("Rejected") ? "Vendor Rejected" : "Awaiting Vendor Response",
      time: booking.respondedAt ?? null,
      done: ["Accepted", "Confirmed", "Rejected (Vendor)", "Rejected (Admin – No Response)"].includes(booking.status),
      icon: booking.status.startsWith("Rejected") ? <XCircle size={12} /> : <CheckCircle size={12} />,
      error: booking.status.startsWith("Rejected"),
    },
    {
      label: "Balance Payment (50%)",
      time: null,
      done: booking.paidAmount >= booking.amount,
      icon: <CreditCard size={12} />,
      warning: booking.status === "Payment Pending (Balance)",
    },
    {
      label: "Confirmed",
      time: null,
      done: booking.status === "Confirmed",
      icon: <CheckCircle size={12} />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="modal-backdrop absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="modal-panel relative w-[520px] h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F1F1]">
          <div>
            <h2 className="font-bold text-[#0F0F0F] text-lg">Booking Detail</h2>
            <p className="text-xs font-mono text-[#F97316] font-semibold">{booking.orderId} · {booking.id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <X size={16} className="text-[#888]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Status Banner */}
          <div className="px-6 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
            <BookingStatusBadge status={booking.status} />
            {booking.status === "Pending" && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">
                <Clock size={12} />
                Vendor has 4 working hours to respond
              </div>
            )}
            {booking.status === "Rejected (Admin – No Response)" && (
              <div className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">
                <AlertCircle size={12} />
                Escalated — admin action required
              </div>
            )}
          </div>

          {/* Customer & Vendor */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Parties</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#F9F9F9] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                  {booking.customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[#888] font-medium">Customer</p>
                  <p className="text-sm font-semibold text-[#0F0F0F]">{booking.customerName}</p>
                  <p className="text-xs text-[#888]">{booking.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F9F9F9] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] font-bold text-sm shrink-0">
                  {booking.vendorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[#888] font-medium">Vendor</p>
                  <p className="text-sm font-semibold text-[#0F0F0F]">{booking.vendorName}</p>
                  <p className="text-xs text-[#888]">{booking.serviceName} · {booking.serviceCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Event Details</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Event Type</span>
                <span className="font-medium text-[#0F0F0F]">{booking.eventType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Event Date</span>
                <span className="font-medium text-[#0F0F0F] flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#F97316]" />
                  {booking.eventDate}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Booking Created</span>
                <span className="text-[#555]">{booking.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Payment Breakdown</p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Total Amount</span>
                <span className="font-bold text-[#0F0F0F]">AED {booking.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Paid (advance)</span>
                <span className="font-semibold text-emerald-600">AED {booking.paidAmount.toLocaleString()}</span>
              </div>
              {balanceDue > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Balance Due</span>
                  <span className="font-semibold text-amber-600">AED {balanceDue.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#F97316] transition-all"
                style={{ width: `${paidPct}%` }}
              />
            </div>
            <p className="text-[11px] text-[#888] mt-1">{paidPct}% paid · {balanceDue > 0 ? `Balance due 48hrs before event` : "Fully paid"}</p>
          </div>

          {/* Timeline */}
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-4">Booking Timeline</p>
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      step.error ? "bg-red-100 text-red-600" :
                      step.warning ? "bg-amber-100 text-amber-600" :
                      step.done ? "bg-emerald-100 text-emerald-600" :
                      "bg-[#F5F5F5] text-[#CCC]"
                    }`}>
                      {step.icon}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className={`w-px flex-1 my-1 ${step.done ? "bg-emerald-200" : "bg-[#F0F0F0]"}`} style={{ minHeight: "20px" }} />
                    )}
                  </div>
                  <div className="pb-3 min-w-0">
                    <p className={`text-sm font-medium ${
                      step.error ? "text-red-600" :
                      step.warning ? "text-amber-600" :
                      step.done ? "text-[#0F0F0F]" :
                      "text-[#AAA]"
                    }`}>{step.label}</p>
                    {step.time && (
                      <p className="text-[11px] text-[#888]">{step.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#F1F1F1] bg-[#FAFAFA] flex flex-col gap-2">
          {booking.status === "Payment Pending (Balance)" && (
            <button
              onClick={() => { onSendReminder?.(booking.id); }}
              className="w-full py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors flex items-center justify-center gap-2"
            >
              <Bell size={15} />
              Send Payment Reminder to Customer
            </button>
          )}
          {booking.status === "Rejected (Admin – No Response)" && (
            <button
              onClick={() => { onMarkRejected?.(booking.id); }}
              className="w-full py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle size={15} />
              Mark as Rejected (No Response)
            </button>
          )}
          {(booking.status === "Pending" || booking.status === "Accepted") && (
            <button
              onClick={() => { onCancel?.(booking.id); onClose(); }}
              className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle size={15} />
              Cancel Booking (Admin)
            </button>
          )}
          <button className="w-full py-2.5 bg-white border border-[#E5E5E5] text-[#555] rounded-xl text-sm font-semibold hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-2">
            <Bell size={14} />
            Notify Both Parties
          </button>
        </div>
      </div>
    </div>
  );
}
