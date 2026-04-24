"use client";
import { useState } from "react";
import { mockRefunds } from "@/lib/mockData";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast, useToast } from "@/components/admin/Toast";
import { CheckCircle2, XCircle, Clock, AlertCircle, Banknote } from "lucide-react";

const statusMap = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: <Clock size={12} /> },
  Processed: { bg: "bg-emerald-50", text: "text-emerald-700", icon: <CheckCircle2 size={12} /> },
  Rejected: { bg: "bg-red-50", text: "text-red-700", icon: <XCircle size={12} /> },
};

export default function RefundsPage() {
  const [refunds, setRefunds] = useState(mockRefunds);
  const [filter, setFilter] = useState<"All" | "Pending" | "Processed" | "Rejected">("All");
  const [confirm, setConfirm] = useState<{ id: string; action: "process" | "reject"; name: string; amount: number } | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const filtered = refunds.filter((r) => filter === "All" || r.status === filter);
  const pendingTotal = refunds.filter((r) => r.status === "Pending").reduce((s, r) => s + r.amount, 0);
  const pendingCount = refunds.filter((r) => r.status === "Pending").length;

  const executeAction = (id: string, action: "process" | "reject") => {
    const today = new Date().toISOString().split("T")[0];
    setRefunds((prev) => prev.map((r) =>
      r.id === id ? { ...r, status: action === "process" ? "Processed" : "Rejected", processedAt: today } : r
    ));
    showToast(
      action === "process" ? "Refund processed successfully" : "Refund rejected",
      action === "process" ? "success" : "warning"
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Refunds</h1>
          <p className="text-sm text-[#888] mt-1">All refunds processed manually — no automatic refunds</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <AlertCircle size={15} className="text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-800">AED {pendingTotal.toLocaleString()} pending</p>
              <p className="text-[10px] text-amber-600">{pendingCount} refund{pendingCount > 1 ? "s" : ""} awaiting action</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Refunded", value: `AED ${refunds.filter(r=>r.status==="Processed").reduce((s,r)=>s+r.amount,0).toLocaleString()}`, sub: `${refunds.filter(r=>r.status==="Processed").length} processed`, color: "text-emerald-600" },
          { label: "Pending Amount", value: `AED ${pendingTotal.toLocaleString()}`, sub: `${pendingCount} awaiting`, color: "text-amber-600" },
          { label: "Rejected", value: String(refunds.filter(r=>r.status==="Rejected").length), sub: "refund requests", color: "text-red-500" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-[#F1F1F1] p-4">
            <p className="text-xs text-[#888] font-medium mb-1">{card.label}</p>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-[11px] text-[#888] mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {(["All", "Pending", "Processed", "Rejected"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-[#0F0F0F] text-white" : "bg-white border border-[#E5E5E5] text-[#888] hover:border-[#0F0F0F] hover:text-[#0F0F0F]"}`}>
            {s} ({s === "All" ? refunds.length : refunds.filter(r => r.status === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((refund) => {
          const style = statusMap[refund.status];
          return (
            <div key={refund.id} className="bg-white rounded-xl border border-[#F1F1F1] p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] font-bold shrink-0">
                {refund.customerName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#0F0F0F]">{refund.customerName}</p>
                  <span className="text-[10px] text-[#888] font-mono bg-[#F5F5F5] px-2 py-0.5 rounded">Booking #{refund.bookingId}</span>
                </div>
                <p className="text-xs text-[#888] mb-2">Vendor: <span className="text-[#555] font-medium">{refund.vendorName}</span></p>
                <p className="text-xs text-[#555] bg-[#F9F9F9] rounded-lg px-3 py-2 italic">{refund.reason}</p>
                <p className="text-[11px] text-[#888] mt-2">
                  Requested {refund.createdAt}
                  {refund.processedAt && <span className="text-emerald-600"> · Processed {refund.processedAt}</span>}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Banknote size={14} className="text-[#F97316]" />
                    <p className="text-xl font-bold text-[#0F0F0F]">AED {refund.amount.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                  {style.icon}{refund.status}
                </span>
                {refund.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => setConfirm({ id: refund.id, action: "process", name: refund.customerName, amount: refund.amount })}
                      className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                      Process
                    </button>
                    <button onClick={() => setConfirm({ id: refund.id, action: "reject", name: refund.customerName, amount: refund.amount })}
                      className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#888]">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-300" />
            <p className="text-sm">No refunds in this category</p>
          </div>
        )}
      </div>

      {confirm && (
        <ConfirmModal
          title={confirm.action === "process" ? "Process Refund?" : "Reject Refund?"}
          message={
            confirm.action === "process"
              ? `Process AED ${confirm.amount.toLocaleString()} refund for ${confirm.name}? This action cannot be undone.`
              : `Reject the refund request from ${confirm.name}? They will be notified of the decision.`
          }
          confirmLabel={confirm.action === "process" ? "Process Refund" : "Reject Request"}
          confirmDanger={confirm.action === "reject"}
          onConfirm={() => { executeAction(confirm.id, confirm.action); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />}
    </div>
  );
}
