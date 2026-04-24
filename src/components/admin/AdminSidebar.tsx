"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  CalendarCheck,
  RefreshCw,
  Tag,
  Package,
  Users,
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vendors", label: "Vendors", icon: Store, badge: 8 },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck, badge: 23 },
  { href: "/admin/refunds", label: "Refunds", icon: RefreshCw, badge: 6 },
  { href: "/admin/coupons", label: "Coupons & Discounts", icon: Tag },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/employees", label: "Employees & Roles", icon: Users },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0F0F0F] flex flex-col z-40 border-r border-white/5">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Event</span>
            <span className="text-[#F97316]">Stan</span>
          </span>
          <span className="ml-1 px-1.5 py-0.5 bg-[#F97316]/15 text-[#F97316] text-[10px] font-semibold rounded uppercase tracking-wider">
            Admin
          </span>
        </Link>
        <div className="flex items-center gap-2 mt-3 px-2 py-2 rounded-lg bg-white/5">
          <ShieldCheck size={14} className="text-[#F97316]" />
          <span className="text-xs text-white/60">Super Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                active
                  ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={active ? "text-white" : "text-white/40 group-hover:text-white/70"} />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  active ? "bg-white/20 text-white" : "bg-[#F97316]/20 text-[#F97316]"
                }`}>
                  {badge}
                </span>
              ) : (
                !active && <ChevronRight size={12} className="text-white/20 group-hover:text-white/40" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-bold">
            RA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Rania Al-Hassan</p>
            <p className="text-[10px] text-white/40 truncate">Super Admin</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all">
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
