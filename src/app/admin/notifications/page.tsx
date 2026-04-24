"use client";
import { useState } from "react";
import { Bell, Mail, MessageSquare, Send, Globe, CheckCircle2 } from "lucide-react";

const notificationTemplates = [
  { id: "N001", event: "Booking Creation", channels: ["Email", "SMS", "Web Push"], audience: "Customer + Vendor", lastSent: "2026-04-22", isActive: true },
  { id: "N002", event: "Vendor Response (Accept)", channels: ["Email", "Web Push"], audience: "Customer", lastSent: "2026-04-22", isActive: true },
  { id: "N003", event: "Vendor Response (Reject)", channels: ["Email", "SMS", "Web Push"], audience: "Customer", lastSent: "2026-04-21", isActive: true },
  { id: "N004", event: "Payment Reminder (50% Balance)", channels: ["Email", "SMS", "Web Push"], audience: "Customer", lastSent: "2026-04-20", isActive: true },
  { id: "N005", event: "Cancellation / Refund Update", channels: ["Email", "Web Push"], audience: "Customer", lastSent: "2026-04-19", isActive: true },
  { id: "N006", event: "Event Reminder (48hrs)", channels: ["SMS", "Web Push"], audience: "Customer + Vendor", lastSent: "2026-04-18", isActive: true },
  { id: "N007", event: "Vendor Unresponsive Alert", channels: ["Email"], audience: "Admin", lastSent: "2026-04-22", isActive: true },
  { id: "N008", event: "New Vendor Onboarding", channels: ["Email"], audience: "Admin", lastSent: "2026-04-21", isActive: true },
];

const channelIcons: Record<string, JSX.Element> = {
  "Email": <Mail size={11} />,
  "SMS": <MessageSquare size={11} />,
  "Web Push": <Globe size={11} />,
};

export default function NotificationsPage() {
  const [templates, setTemplates] = useState(notificationTemplates);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("All Customers");

  const toggle = (id: string) => {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">Notification Control</h1>
        <p className="text-sm text-[#888] mt-1">Manage notification templates and broadcast messages to users</p>
      </div>

      {/* Broadcast Section */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Send size={15} className="text-[#F97316]" />
          <h2 className="font-semibold text-[#0F0F0F]">Broadcast Message</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold text-[#555] mb-1.5 block">Target Audience</label>
            <select
              value={broadcastTarget}
              onChange={(e) => setBroadcastTarget(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white"
            >
              {["All Customers", "All Vendors", "Specific Vendor", "All Users"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#555] mb-1.5 block">Channels</label>
            <div className="flex gap-2 pt-1">
              {["Email", "SMS", "Web Push"].map((c) => (
                <label key={c} className="flex items-center gap-1.5 text-xs text-[#555] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#F97316]" />
                  {c}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#555] mb-1.5 block">Message</label>
          <textarea
            rows={3}
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Type your broadcast message here..."
            className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold hover:bg-[#EA6C0A] transition-colors">
          <Send size={14} />
          Send Broadcast
        </button>
      </div>

      {/* Templates */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F5F5F5] flex items-center gap-2">
          <Bell size={14} className="text-[#F97316]" />
          <h2 className="font-semibold text-[#0F0F0F] text-sm">Notification Templates</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F5F5F5] bg-[#FAFAFA]">
              {["Trigger Event", "Channels", "Audience", "Last Sent", "Status", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {templates.map((t) => (
              <tr key={t.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Bell size={13} className="text-[#F97316] shrink-0" />
                    <span className="font-medium text-[#0F0F0F]">{t.event}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5 flex-wrap">
                    {t.channels.map((c) => (
                      <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F5F5F5] text-[#555] text-[10px] font-medium rounded-md">
                        {channelIcons[c]}
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-[#555]">{t.audience}</td>
                <td className="px-5 py-3.5 text-xs text-[#888]">{t.lastSent}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${t.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#F5F5F5] text-[#888]"}`}>
                    {t.isActive ? <><CheckCircle2 size={10} /> Active</> : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => toggle(t.id)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                      t.isActive
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    {t.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
