import type { BookingStatus } from "@/types";

const statusConfig: Record<BookingStatus, { bg: string; text: string; dot: string }> = {
  "Pending": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "Accepted": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "Confirmed": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Rejected (Vendor)": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
  "Rejected (Admin – No Response)": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-600" },
  "Cancelled (Admin)": { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  "Cancelled (User)": { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  "Payment Pending (Balance)": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}

export function VendorStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Active": "bg-emerald-50 text-emerald-700",
    "Pending Approval": "bg-amber-50 text-amber-700",
    "Suspended": "bg-red-50 text-red-700",
    "Rejected": "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
