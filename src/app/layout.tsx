import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventStan Admin Panel",
  description: "Admin operations center for EventStan marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className="antialiased">{children}</body>
    </html>
  );
}
