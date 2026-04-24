# EventStan Admin Panel

A full-featured Next.js 15 + TypeScript admin panel for the EventStan event services marketplace (UAE).

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: DM Sans (Google Fonts)

## Pages

| Route | Description |
|---|---|
| `/admin/dashboard` | KPIs, revenue chart, alerts, pending approvals |
| `/admin/vendors` | Vendor management, approve/reject/suspend |
| `/admin/bookings` | All bookings with status filter & detail drawer |
| `/admin/refunds` | Manual refund processing |
| `/admin/coupons` | Coupon creation and management |
| `/admin/packages` | Package/bundle management |
| `/admin/employees` | Employee roles & permissions |
| `/admin/notifications` | Notification templates & broadcast |

## Components

| Component | Purpose |
|---|---|
| `AdminSidebar` | Fixed dark sidebar navigation with badge counts |
| `VendorDrawer` | Slide-in vendor detail panel with actions |
| `BookingDrawer` | Slide-in booking detail with timeline + actions |
| `ConfirmModal` | Reusable confirmation dialog for destructive actions |
| `Toast` / `useToast` | Bottom-right toast notifications |
| `StatCard` | KPI metric card with trend indicator |
| `BookingStatusBadge` | Colour-coded booking status pill |
| `VendorStatusBadge` | Colour-coded vendor status pill |
| `PageHeader` | Sticky top bar with user info and notifications |

## Setup

```bash
# Install dependencies
npm install

# Run dev server (port 3002)
npm run dev

# Build for production
npm run build
```

## Integration Guide

### 1. Merge into existing repo

Copy the following into your existing EventStan Next.js project:

```
src/
  app/admin/         → all admin pages
  components/admin/  → all shared components
  lib/mockData.ts    → replace with real API calls
  types/index.ts     → shared TypeScript types
```

### 2. Replace mock data with real API

Every page imports from `@/lib/mockData`. Replace those imports with your actual API calls:

```typescript
// Before (mock)
import { mockVendors } from "@/lib/mockData";

// After (real API)
const vendors = await fetch("/api/vendors").then(r => r.json());
```

### 3. Tailwind config

Merge `tailwind.config.ts` with your existing config. The admin panel uses:
- `#F97316` as brand orange (matches EventStan)
- `#0F0F0F` as dark/sidebar background
- `#F7F7F5` as page background

### 4. Route protection

Add auth middleware to protect `/admin/*` routes:

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("admin_token");
  if (request.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

## Business Logic (from UPD)

- **Vendor response window**: 4 working hours (8 AM – 8 PM)
- **Balance payment deadline**: 48 hours before event
- **Booking statuses**: Pending → Accepted/Rejected → Confirmed
- **Refunds**: Always manual, processed via Admin panel only
- **Partial confirmation**: One vendor rejection does not affect other vendors in the same order
- **Payment split**: Held at platform level, split vendor-wise internally

## Design System

- Brand: `#F97316` (EventStan orange)
- Dark: `#0F0F0F`
- Background: `#F7F7F5`
- Surface: `#FFFFFF`
- Border: `#F1F1F1`
- Muted text: `#888888`
- Font: DM Sans

## Port

Dev server runs on port `3002` to avoid conflict with:
- Main site: `3000` (event-stan.vercel.app)
- Vendor portal: `3001` (event-stan-vendor.vercel.app)
