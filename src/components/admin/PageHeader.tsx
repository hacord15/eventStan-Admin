"use client";
import { Bell, Search } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#F7F7F5]/80 backdrop-blur-md border-b border-[#EBEBEB] px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-[#0F0F0F] tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-[#888] mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <button className="relative p-2 bg-white border border-[#E5E5E5] rounded-xl text-[#888] hover:text-[#0F0F0F] hover:border-[#0F0F0F] transition-all">
          <Bell size={15} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] rounded-full text-[9px] text-white font-bold flex items-center justify-center">6</span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-[#E5E5E5]">
          <div className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-bold">
            RA
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-[#0F0F0F]">Rania Al-Hassan</p>
            <p className="text-[10px] text-[#888]">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
