"use client";
import { useState } from "react";
import { Plus, Package, Pencil, Trash2, Star } from "lucide-react";

const mockPackages = [
  { id: "P001", name: "Premium Wedding Bundle", vendorName: "Elite Spaces UAE", category: "Venue", price: 45000, includes: ["Grand Ballroom (8hrs)", "Floral Arrangement", "Catering (200 pax)", "DJ Entertainment"], isActive: true, bookings: 12 },
  { id: "P002", name: "Corporate Event Starter", vendorName: "Savory Bites Catering", category: "Catering", price: 15000, includes: ["Buffet Setup (100 pax)", "AV Equipment", "Event Coordinator"], isActive: true, bookings: 28 },
  { id: "P003", name: "Birthday Bash Package", vendorName: "Magic Moments Decor", category: "Decoration", price: 8500, includes: ["Full Venue Decoration", "Cake (3-tier)", "Photography (4hrs)", "DJ (3hrs)"], isActive: true, bookings: 41 },
  { id: "P004", name: "Intimate Gathering", vendorName: "Bloom & Petal Decorations", category: "Decoration", price: 5000, includes: ["Floral Decor", "Table Setup (40 pax)", "Catering (40 pax)"], isActive: false, bookings: 7 },
];

export default function PackagesPage() {
  const [packages] = useState(mockPackages);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Packages</h1>
          <p className="text-sm text-[#888] mt-1">Manage predefined service bundles created by vendors or admin</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors"
        >
          <Plus size={15} />
          Create Package
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-[#0F0F0F] mb-4">New Package</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {["Package Name", "Vendor", "Category", "Price (AED)"].map((f) => (
              <div key={f}>
                <label className="text-xs font-semibold text-[#555] mb-1.5 block">{f}</label>
                <input className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#555] mb-1.5 block">Included Items (one per line)</label>
            <textarea rows={4} className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none" />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold">Save Package</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-[#F5F5F5] text-[#555] rounded-xl text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-xl border p-5 ${pkg.isActive ? "border-[#F1F1F1]" : "border-[#F1F1F1] opacity-60"}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package size={14} className="text-[#F97316]" />
                  <h3 className="font-bold text-[#0F0F0F]">{pkg.name}</h3>
                </div>
                <p className="text-xs text-[#888]">{pkg.vendorName} · {pkg.category}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${pkg.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#F5F5F5] text-[#888]"}`}>
                {pkg.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-[#555] mb-2">Package Includes:</p>
              <ul className="space-y-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="text-xs text-[#555] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5]">
              <div>
                <p className="text-xl font-bold text-[#0F0F0F]">AED {pkg.price.toLocaleString()}</p>
                <p className="text-[11px] text-[#888]">{pkg.bookings} bookings total</p>
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 text-[#888] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] rounded-lg transition-all">
                  <Pencil size={13} />
                </button>
                <button className="p-1.5 text-[#888] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
