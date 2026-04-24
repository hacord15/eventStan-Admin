"use client";
import { useState } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { BookingStatusBadge } from "@/components/admin/StatusBadge";
import { VendorDrawer } from "@/components/admin/VendorDrawer";
import { Toast, useToast } from "@/components/admin/Toast";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { mockStats, mockBookings, mockVendors, revenueChartData } from "@/lib/mockData";
import {
  Store, CalendarCheck, Banknote, Users, AlertCircle, Clock, ArrowRight, CheckCircle2, RefreshCw
} from "lucide-react";
import Link from "next/link";
import type { Vendor, VendorStatus } from "@/types";

function formatAED(n: number) {
  if (n >= 1000000) return `AED ${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `AED ${(n / 1000).toFixed(0)}K`;
  return `AED ${n.toLocaleString()}`;
}

const maxRevenue = Math.max(...revenueChartData.map((d) => d.revenue));

export default function AdminDashboardPage() {
  const [vendors, setVendors] = useState(mockVendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: VendorStatus; name: string } | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const pendingVendors = vendors.filter((v) => v.status === "Pending Approval");
  const pendingBookings = mockBookings.filter((b) => b.status === "Pending");
  const unresponsiveBookings = mockBookings.filter((b) => b.status === "Rejected (Admin – No Response)");

  const updateVendorStatus = (id: string, status: VendorStatus) => {
    setVendors((prev) => prev.map((v) => v.id === id ? { ...v, status } : v));
    setSelectedVendor(null);
    const label = status === "Active" ? "approved" : status === "Rejected" ? "rejected" : "suspended";
    showToast(`Vendor ${label} successfully`, status === "Active" ? "success" : "warning");
  };

  const handleVendorAction = (vendor: Vendor, action: VendorStatus) => {
    setConfirmAction({ id: vendor.id, action, name: vendor.name });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#888] mt-1">Thursday, 24 April 2026 · UAE Operations Center</p>
      </div>

      {/* Alert Banners */}
      {(pendingVendors.length > 0 || unresponsiveBookings.length > 0) && (
        <div className="mb-6 flex flex-col gap-2">
          {pendingVendors.length > 0 && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
              <AlertCircle size={16} className="text-amber-600 shrink-0" />
              <span className="text-amber-800 font-medium">
                {pendingVendors.length} vendor{pendingVendors.length > 1 ? "s" : ""} awaiting approval
              </span>
              <Link href="/admin/vendors" className="ml-auto text-amber-700 font-semibold text-xs underline underline-offset-2">Review now →</Link>
            </div>
          )}
          {unresponsiveBookings.length > 0 && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
              <Clock size={16} className="text-red-600 shrink-0" />
              <span className="text-red-800 font-medium">
                {unresponsiveBookings.length} booking{unresponsiveBookings.length > 1 ? "s" : ""} escalated — vendor unresponsive
              </span>
              <Link href="/admin/bookings" className="ml-auto text-red-700 font-semibold text-xs underline underline-offset-2">Handle →</Link>
            </div>
          )}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatAED(mockStats.totalRevenue)} sub="All-time platform revenue"
          trend={{ value: "+18% this month", up: true }} icon={<Banknote size={16} />} accent />
        <StatCard label="Total Vendors" value={mockStats.totalVendors}
          sub={`${pendingVendors.length} pending approval`} trend={{ value: "+4 this week", up: true }} icon={<Store size={16} />} />
        <StatCard label="Total Bookings" value={mockStats.totalBookings.toLocaleString()}
          sub={`${mockStats.confirmedBookings} confirmed`} trend={{ value: "+142 this month", up: true }} icon={<CalendarCheck size={16} />} />
        <StatCard label="Active Customers" value={mockStats.activeCustomers.toLocaleString()}
          sub={`${mockStats.pendingRefunds} refunds pending`} trend={{ value: "+67 this month", up: true }} icon={<Users size={16} />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Revenue Bar Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-[#F1F1F1] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#0F0F0F] text-sm">Revenue Overview</h2>
              <p className="text-xs text-[#888] mt-0.5">Last 6 months · AED</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">↑ 14.2% vs last period</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {revenueChartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[10px] text-[#888] font-medium opacity-0 group-hover:opacity-100 transition-opacity">{formatAED(d.revenue)}</span>
                <div className="relative w-full">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 cursor-pointer ${i === revenueChartData.length - 1 ? "bg-[#F97316]" : "bg-[#F97316]/40 hover:bg-[#F97316]/70"}`}
                    style={{ height: `${(d.revenue / maxRevenue) * 120}px` }}
                  />
                </div>
                <span className="text-[10px] text-[#888] font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 pt-4 border-t border-[#F5F5F5]">
            <div><p className="text-xs text-[#888]">Total Bookings</p><p className="text-sm font-bold text-[#0F0F0F]">1,229</p></div>
            <div><p className="text-xs text-[#888]">Avg. Order Value</p><p className="text-sm font-bold text-[#0F0F0F]">AED 3,921</p></div>
            <div><p className="text-xs text-[#888]">Conversion Rate</p><p className="text-sm font-bold text-emerald-600">68.4%</p></div>
          </div>
        </div>

        {/* Today's Activity */}
        <div className="bg-white rounded-xl border border-[#F1F1F1] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0F0F0F] text-sm">Today's Activity</h2>
            <span className="text-[10px] text-[#888] bg-[#F5F5F5] px-2 py-1 rounded-lg">Live</span>
          </div>
          {[
            { label: "New Bookings", value: "14", icon: <CalendarCheck size={14} />, color: "text-blue-600 bg-blue-50" },
            { label: "Vendor Responses", value: "9", icon: <CheckCircle2 size={14} />, color: "text-emerald-600 bg-emerald-50" },
            { label: "Pending Refunds", value: "6", icon: <RefreshCw size={14} />, color: "text-amber-600 bg-amber-50" },
            { label: "New Vendors", value: "2", icon: <Store size={14} />, color: "text-[#F97316] bg-orange-50" },
            { label: "Unresponsive", value: String(unresponsiveBookings.length), icon: <Clock size={14} />, color: "text-red-600 bg-red-50" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.color}`}>{item.icon}</div>
              <p className="flex-1 text-xs text-[#555]">{item.label}</p>
              <span className="font-bold text-sm text-[#0F0F0F]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-[#F1F1F1] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0F0F0F] text-sm">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-[#F97316] font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {mockBookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xs font-bold shrink-0">
                  {b.customerName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#0F0F0F] truncate">{b.customerName}</p>
                  <p className="text-[10px] text-[#888] truncate">{b.serviceName} · {b.eventDate}</p>
                </div>
                <BookingStatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Pending Vendor Approvals */}
        <div className="bg-white rounded-xl border border-[#F1F1F1] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0F0F0F] text-sm">Pending Vendor Approvals</h2>
            <Link href="/admin/vendors" className="text-xs text-[#F97316] font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {pendingVendors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={32} className="text-emerald-400 mb-2" />
              <p className="text-sm text-[#888]">All vendors are approved</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingVendors.map((v) => (
                <div key={v.id} className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-100 cursor-pointer hover:bg-amber-50 transition-colors"
                  onClick={() => setSelectedVendor(v)}>
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold shrink-0">
                    {v.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0F0F0F] truncate">{v.name}</p>
                    <p className="text-[10px] text-[#888]">{v.type} · {v.category} · {v.location}</p>
                  </div>
                  <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleVendorAction(v, "Active")}
                      className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                      Approve
                    </button>
                    <button onClick={() => handleVendorAction(v, "Rejected")}
                      className="px-2.5 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vendor Drawer */}
      {selectedVendor && (
        <VendorDrawer vendor={selectedVendor} onClose={() => setSelectedVendor(null)}
          onApprove={(id) => handleVendorAction(selectedVendor, "Active")}
          onReject={(id) => handleVendorAction(selectedVendor, "Rejected")}
          onSuspend={(id) => handleVendorAction(selectedVendor, "Suspended")}
          onReinstate={(id) => handleVendorAction(selectedVendor, "Active")} />
      )}

      {/* Confirm Modal */}
      {confirmAction && (
        <ConfirmModal
          title={confirmAction.action === "Active" ? "Approve Vendor?" : confirmAction.action === "Rejected" ? "Reject Application?" : "Suspend Vendor?"}
          message={
            confirmAction.action === "Active"
              ? `Approve "${confirmAction.name}" and send login credentials via email?`
              : confirmAction.action === "Rejected"
              ? `Reject the application from "${confirmAction.name}"? They will be notified.`
              : `Suspend "${confirmAction.name}"? Their services will be hidden from the platform.`
          }
          confirmLabel={confirmAction.action === "Active" ? "Approve & Notify" : confirmAction.action === "Rejected" ? "Reject" : "Suspend"}
          confirmDanger={confirmAction.action !== "Active"}
          onConfirm={() => {
            updateVendorStatus(confirmAction.id, confirmAction.action);
            setConfirmAction(null);
          }}
          onCancel={() => setConfirmAction(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />}
    </div>
  );
}
