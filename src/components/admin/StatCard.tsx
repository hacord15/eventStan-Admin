import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: { value: string; up: boolean };
  icon: ReactNode;
  accent?: boolean;
}

export function StatCard({ label, value, sub, trend, icon, accent }: StatCardProps) {
  return (
    <div className={`rounded-xl p-5 border flex flex-col gap-3 ${
      accent
        ? "bg-[#F97316] border-[#F97316] text-white"
        : "bg-white border-[#F1F1F1] text-[#0F0F0F]"
    }`}>
      <div className="flex items-start justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? "text-white/80" : "text-[#888]"}`}>
          {label}
        </p>
        <div className={`p-1.5 rounded-lg ${accent ? "bg-white/20" : "bg-[#F97316]/10"}`}>
          <span className={accent ? "text-white" : "text-[#F97316]"}>{icon}</span>
        </div>
      </div>
      <div>
        <p className={`text-2xl font-bold tracking-tight ${accent ? "text-white" : "text-[#0F0F0F]"}`}>{value}</p>
        {sub && <p className={`text-xs mt-0.5 ${accent ? "text-white/70" : "text-[#888]"}`}>{sub}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${
          trend.up
            ? accent ? "text-white/90" : "text-emerald-600"
            : accent ? "text-white/90" : "text-red-500"
        }`}>
          {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend.value}
        </div>
      )}
    </div>
  );
}
