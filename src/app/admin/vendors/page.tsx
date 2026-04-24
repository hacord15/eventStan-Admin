"use client";
import { useState } from "react";
import { mockVendors } from "@/lib/mockData";
import { VendorStatusBadge } from "@/components/admin/StatusBadge";
import { VendorDrawer } from "@/components/admin/VendorDrawer";
import { Search, Plus, Star } from "lucide-react";
import type { Vendor, VendorStatus } from "@/types";

const statusFilters: (VendorStatus | "All")[] = ["All", "Active", "Pending Approval", "Suspended"];

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VendorStatus | "All">("All");
  const [vendors, setVendors] = useState(mockVendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filtered = vendors.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: VendorStatus) => {
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    setSelectedVendor(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Vendors</h1>
          <p className="text-sm text-[#888] mt-1">Manage vendor onboarding, verification & status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors shadow-sm">
          <Plus size={15} />
          Add Vendor
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        {statusFilters.map((s) => {
          const count = s === "All" ? vendors.length : vendors.filter((v) => v.status === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#0F0F0F] text-white" : "bg-white border border-[#E5E5E5] text-[#888] hover:border-[#0F0F0F] hover:text-[#0F0F0F]"}`}>
              {s}<span className={`ml-1.5 ${statusFilter === s ? "opacity-70" : "opacity-50"}`}>({count})</span>
            </button>
          );
        })}
        <div className="relative ml-auto max-w-xs flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input type="text" placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#F1F1F1] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1F1F1] bg-[#FAFAFA]">
              {["Vendor", "Type / Category", "Location", "Bookings", "Revenue (AED)", "Rating", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {filtered.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer" onClick={() => setSelectedVendor(vendor)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xs font-bold shrink-0">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#0F0F0F]">{vendor.name}</p>
                      <p className="text-[11px] text-[#888]">{vendor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5"><p className="text-[#0F0F0F] font-medium">{vendor.category}</p><p className="text-[11px] text-[#888]">{vendor.type}</p></td>
                <td className="px-5 py-3.5 text-[#555]">{vendor.location}</td>
                <td className="px-5 py-3.5 font-semibold text-[#0F0F0F]">{vendor.totalBookings}</td>
                <td className="px-5 py-3.5 font-semibold text-[#0F0F0F]">{vendor.totalRevenue > 0 ? vendor.totalRevenue.toLocaleString() : "—"}</td>
                <td className="px-5 py-3.5">
                  {vendor.rating > 0 ? (
                    <span className="flex items-center gap-1 text-amber-600 font-semibold text-xs"><Star size={11} className="fill-amber-400 stroke-amber-400" />{vendor.rating}</span>
                  ) : "—"}
                </td>
                <td className="px-5 py-3.5"><VendorStatusBadge status={vendor.status} /></td>
                <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5">
                    {vendor.status === "Pending Approval" && (
                      <>
                        <button onClick={() => updateStatus(vendor.id, "Active")} className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">Approve</button>
                        <button onClick={() => updateStatus(vendor.id, "Rejected")} className="px-2.5 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-200 transition-colors">Reject</button>
                      </>
                    )}
                    {vendor.status === "Active" && (
                      <button onClick={() => updateStatus(vendor.id, "Suspended")} className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors">Suspend</button>
                    )}
                    {vendor.status === "Suspended" && (
                      <button onClick={() => updateStatus(vendor.id, "Active")} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-100 transition-colors">Reinstate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-[#888] text-sm">No vendors match your filters.</div>}
      </div>

      {selectedVendor && (
        <VendorDrawer vendor={selectedVendor} onClose={() => setSelectedVendor(null)}
          onApprove={(id) => updateStatus(id, "Active")} onReject={(id) => updateStatus(id, "Rejected")}
          onSuspend={(id) => updateStatus(id, "Suspended")} onReinstate={(id) => updateStatus(id, "Active")} />
      )}
    </div>
  );
}
