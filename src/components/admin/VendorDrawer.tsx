"use client";
import { X, Star, Phone, Mail, MapPin, CalendarCheck, Banknote, CheckCircle, XCircle, Ban, ExternalLink } from "lucide-react";
import type { Vendor } from "@/types";
import { VendorStatusBadge } from "./StatusBadge";

interface VendorDrawerProps {
  vendor: Vendor | null;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onReinstate?: (id: string) => void;
}

export function VendorDrawer({ vendor, onClose, onApprove, onReject, onSuspend, onReinstate }: VendorDrawerProps) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="modal-panel relative w-[480px] h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F1F1]">
          <h2 className="font-bold text-[#0F0F0F] text-lg">Vendor Profile</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <X size={16} className="text-[#888]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Identity */}
          <div className="px-6 py-5 border-b border-[#F5F5F5]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl font-bold shrink-0">
                {vendor.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#0F0F0F] text-lg leading-tight">{vendor.name}</h3>
                <p className="text-sm text-[#888] mt-0.5">{vendor.type} Vendor · {vendor.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <VendorStatusBadge status={vendor.status} />
                  {vendor.rating > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star size={10} className="fill-amber-400 stroke-amber-400" />
                      {vendor.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Contact Details</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-[#555]">
                <Mail size={13} className="text-[#F97316] shrink-0" />
                {vendor.email}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#555]">
                <Phone size={13} className="text-[#F97316] shrink-0" />
                {vendor.phone}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#555]">
                <MapPin size={13} className="text-[#F97316] shrink-0" />
                {vendor.location}, UAE
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Performance</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F9F9F9] rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-[#0F0F0F]">{vendor.totalBookings}</p>
                <p className="text-[10px] text-[#888] mt-0.5">Total Bookings</p>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-[#0F0F0F]">
                  {vendor.totalRevenue > 0 ? `${(vendor.totalRevenue / 1000).toFixed(0)}K` : "—"}
                </p>
                <p className="text-[10px] text-[#888] mt-0.5">Revenue (AED)</p>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-[#0F0F0F]">{vendor.rating > 0 ? vendor.rating : "—"}</p>
                <p className="text-[10px] text-[#888] mt-0.5">Avg. Rating</p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Account</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Vendor ID</span>
                <span className="font-mono text-xs text-[#F97316] font-semibold">{vendor.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Joined</span>
                <span className="text-[#555] font-medium">{vendor.joinedAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Vendor Type</span>
                <span className="text-[#555] font-medium">{vendor.type}</span>
              </div>
            </div>
          </div>

          {/* Pending approval checklist */}
          {vendor.status === "Pending Approval" && (
            <div className="px-6 py-4 border-b border-[#F5F5F5]">
              <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Onboarding Checklist</p>
              <div className="space-y-2">
                {[
                  "Business registration document",
                  "Trade license (UAE)",
                  "Bank account details",
                  "Service photos uploaded",
                  "Pricing configured",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${i < 3 ? "bg-emerald-100" : "bg-[#F5F5F5]"}`}>
                      {i < 3 ? (
                        <CheckCircle size={10} className="text-emerald-600" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DDD]" />
                      )}
                    </div>
                    <span className={i < 3 ? "text-[#555]" : "text-[#AAA]"}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-[#F1F1F1] bg-[#FAFAFA] flex flex-col gap-2">
          {vendor.status === "Pending Approval" && (
            <>
              <button
                onClick={() => { onApprove?.(vendor.id); onClose(); }}
                className="w-full py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={15} />
                Approve Vendor & Send Login Credentials
              </button>
              <button
                onClick={() => { onReject?.(vendor.id); onClose(); }}
                className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={15} />
                Reject Application
              </button>
            </>
          )}
          {vendor.status === "Active" && (
            <button
              onClick={() => { onSuspend?.(vendor.id); onClose(); }}
              className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <Ban size={15} />
              Suspend Vendor
            </button>
          )}
          {vendor.status === "Suspended" && (
            <button
              onClick={() => { onReinstate?.(vendor.id); onClose(); }}
              className="w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle size={15} />
              Reinstate Vendor
            </button>
          )}
          <button className="w-full py-2.5 bg-white border border-[#E5E5E5] text-[#555] rounded-xl text-sm font-semibold hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-2">
            <ExternalLink size={14} />
            View Vendor Portal
          </button>
        </div>
      </div>
    </div>
  );
}
