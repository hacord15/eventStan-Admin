"use client";
import { useState } from "react";
import { mockBookings } from "@/lib/mockData";
import { BookingStatusBadge } from "@/components/admin/StatusBadge";
import { BookingDrawer } from "@/components/admin/BookingDrawer";
import { Search } from "lucide-react";
import type { Booking, BookingStatus } from "@/types";

const statusChips: (BookingStatus | "All")[] = [
  "All", "Pending", "Accepted", "Confirmed",
  "Payment Pending (Balance)", "Rejected (Vendor)",
  "Rejected (Admin – No Response)", "Cancelled (Admin)", "Cancelled (User)"
];

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "All">("All");
  const [bookings, setBookings] = useState(mockBookings);
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.customerName.toLowerCase().includes(q) ||
      b.vendorName.toLowerCase().includes(q) ||
      b.serviceName.toLowerCase().includes(q) ||
      b.orderId.toLowerCase().includes(q);
    return matchSearch && (statusFilter === "All" || b.status === statusFilter);
  });

  const counts: Record<string, number> = {};
  bookings.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1; });

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Bookings</h1>
        <p className="text-sm text-[#888] mt-1">Monitor all booking activity, vendor responses & escalations</p>
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(["All", "Pending", "Confirmed", "Payment Pending (Balance)", "Rejected (Admin – No Response)"] as const).map((s) => (
          <button key={s} onClick={() => setStatusFilter(s as BookingStatus | "All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#0F0F0F] text-white" : "bg-white border border-[#E5E5E5] text-[#888] hover:border-[#0F0F0F] hover:text-[#0F0F0F]"}`}>
            {s} {s === "All" ? `(${bookings.length})` : counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
        <input type="text" placeholder="Search by customer, vendor, order..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]" />
      </div>

      <div className="bg-white rounded-xl border border-[#F1F1F1] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1F1F1] bg-[#FAFAFA]">
              {["Order ID", "Customer", "Vendor / Service", "Event Date", "Amount", "Paid", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer" onClick={() => setSelected(b)}>
                <td className="px-4 py-3.5">
                  <p className="font-mono text-xs text-[#F97316] font-semibold">{b.orderId}</p>
                  <p className="text-[10px] text-[#888]">{b.eventType}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-medium text-[#0F0F0F]">{b.customerName}</p>
                  <p className="text-[11px] text-[#888]">{b.customerEmail}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-medium text-[#0F0F0F] text-xs">{b.vendorName}</p>
                  <p className="text-[11px] text-[#888]">{b.serviceName}</p>
                </td>
                <td className="px-4 py-3.5 text-[#555] text-xs">{b.eventDate}</td>
                <td className="px-4 py-3.5 font-semibold text-[#0F0F0F] text-xs">AED {b.amount.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs">
                  <span className={b.paidAmount >= b.amount ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                    AED {b.paidAmount.toLocaleString()}
                  </span>
                  {b.paidAmount < b.amount && (
                    <p className="text-[10px] text-[#888]">{Math.round((b.paidAmount/b.amount)*100)}% paid</p>
                  )}
                </td>
                <td className="px-4 py-3.5"><BookingStatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-[#888] text-sm">No bookings match your filters.</div>}
      </div>

      {selected && (
        <BookingDrawer booking={selected} onClose={() => setSelected(null)}
          onCancel={(id) => updateStatus(id, "Cancelled (Admin)")}
          onMarkRejected={(id) => updateStatus(id, "Rejected (Admin – No Response)")}
          onSendReminder={() => alert("Reminder sent to customer!")} />
      )}
    </div>
  );
}
