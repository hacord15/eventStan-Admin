"use client";
import { useState } from "react";
import { mockCoupons } from "@/lib/mockData";
import { Plus, Tag, ToggleLeft, ToggleRight, Pencil, Trash2 } from "lucide-react";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showForm, setShowForm] = useState(false);

  const toggle = (id: string) => {
    setCoupons((prev) => prev.map((c) => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Coupons & Discounts</h1>
          <p className="text-sm text-[#888] mt-1">Create and manage promotional discount codes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors"
        >
          <Plus size={15} />
          Create Coupon
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-[#0F0F0F] mb-4">New Coupon</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Coupon Code", placeholder: "e.g. SUMMER25", type: "text" },
              { label: "Discount Type", placeholder: "Percentage / Fixed", type: "text" },
              { label: "Discount Value", placeholder: "e.g. 20 (%) or 200 (AED)", type: "number" },
              { label: "Min Order Value (AED)", placeholder: "e.g. 500", type: "number" },
              { label: "Usage Limit", placeholder: "e.g. 300", type: "number" },
              { label: "Valid Until", placeholder: "", type: "date" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[#555] mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors">
              Save Coupon
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-[#F5F5F5] text-[#555] rounded-xl text-sm font-semibold hover:bg-[#EBEBEB] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Coupons Grid */}
      <div className="grid grid-cols-2 gap-4">
        {coupons.map((coupon) => {
          const usagePct = (coupon.usedCount / coupon.usageLimit) * 100;
          return (
            <div key={coupon.id} className={`bg-white rounded-xl border p-5 ${coupon.isActive ? "border-[#F1F1F1]" : "border-[#F1F1F1] opacity-60"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tag size={14} className="text-[#F97316]" />
                    <span className="font-mono font-bold text-lg text-[#0F0F0F] tracking-widest">{coupon.code}</span>
                  </div>
                  <p className="text-xs text-[#888]">
                    {coupon.discountType === "Percentage" ? `${coupon.discountValue}% off` : `AED ${coupon.discountValue} off`}
                    {" · "}Min. AED {coupon.minOrderValue.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${coupon.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#F5F5F5] text-[#888]"}`}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => toggle(coupon.id)} className="text-[#888] hover:text-[#0F0F0F]">
                    {coupon.isActive ? <ToggleRight size={20} className="text-emerald-500" /> : <ToggleLeft size={20} />}
                  </button>
                </div>
              </div>

              {/* Usage bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] text-[#888] mb-1">
                  <span>Usage: {coupon.usedCount} / {coupon.usageLimit}</span>
                  <span>{usagePct.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#F97316] transition-all"
                    style={{ width: `${Math.min(usagePct, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#888]">{coupon.validFrom} → {coupon.validUntil}</p>
                <div className="flex gap-1.5">
                  <button className="p-1.5 text-[#888] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] rounded-lg transition-all">
                    <Pencil size={12} />
                  </button>
                  <button className="p-1.5 text-[#888] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
