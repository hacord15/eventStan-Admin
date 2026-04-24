"use client";
import { useState } from "react";
import { mockEmployees } from "@/lib/mockData";
import { Plus, ShieldCheck, UserCheck, UserX, Pencil } from "lucide-react";

const roleColors: Record<string, string> = {
  "Super Admin": "bg-[#F97316]/10 text-[#F97316]",
  "Operations Manager": "bg-blue-50 text-blue-700",
  "Finance Manager": "bg-emerald-50 text-emerald-700",
  "Support Agent": "bg-purple-50 text-purple-700",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees);

  const toggleActive = (id: string) => {
    setEmployees((prev) => prev.map((e) => e.id === id ? { ...e, isActive: !e.isActive } : e));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Employees & Roles</h1>
          <p className="text-sm text-[#888] mt-1">Manage admin team members and their access permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors">
          <Plus size={15} />
          Add Employee
        </button>
      </div>

      {/* Role Permissions Reference */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { role: "Super Admin", desc: "Full platform access", perms: ["All features"] },
          { role: "Operations Manager", desc: "Day-to-day ops", perms: ["Vendors", "Bookings", "Notifications"] },
          { role: "Finance Manager", desc: "Financial operations", perms: ["Refunds", "Coupons", "Bookings"] },
          { role: "Support Agent", desc: "Customer support", perms: ["Bookings", "Notifications"] },
        ].map((r) => (
          <div key={r.role} className="bg-white rounded-xl border border-[#F1F1F1] p-4">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${roleColors[r.role]}`}>
              <ShieldCheck size={10} />
              {r.role}
            </div>
            <p className="text-xs text-[#888] mb-2">{r.desc}</p>
            <div className="flex flex-wrap gap-1">
              {r.perms.map((p) => (
                <span key={p} className="text-[10px] bg-[#F5F5F5] text-[#555] px-2 py-0.5 rounded-md font-medium">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1F1F1] bg-[#FAFAFA]">
              {["Employee", "Role", "Permissions", "Last Login", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {employees.map((emp) => (
              <tr key={emp.id} className={`hover:bg-[#FAFAFA] transition-colors ${!emp.isActive ? "opacity-50" : ""}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-sm font-bold shrink-0">
                      {emp.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-[#0F0F0F]">{emp.name}</p>
                      <p className="text-[11px] text-[#888]">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[emp.role]}`}>
                    <ShieldCheck size={10} />
                    {emp.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {emp.permissions.map((p) => (
                      <span key={p} className="text-[10px] bg-[#F5F5F5] text-[#555] px-2 py-0.5 rounded-md capitalize">{p}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-[#888]">{emp.lastLogin}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${emp.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#F5F5F5] text-[#888]"}`}>
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-[#888] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] rounded-lg transition-all">
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => toggleActive(emp.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        emp.isActive
                          ? "text-[#888] hover:text-red-500 hover:bg-red-50"
                          : "text-[#888] hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {emp.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
