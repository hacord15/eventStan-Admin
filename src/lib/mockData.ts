import type { Vendor, Booking, Refund, Coupon, Employee, DashboardStats } from "@/types";

export const mockStats: DashboardStats = {
  totalVendors: 142,
  pendingVendors: 8,
  totalBookings: 1847,
  pendingBookings: 23,
  totalRevenue: 4820000,
  pendingRefunds: 6,
  activeCustomers: 983,
  confirmedBookings: 1612,
};

export const mockVendors: Vendor[] = [
  { id: "V001", name: "Elite Spaces UAE", type: "Organization", category: "Venue", email: "elite@example.com", phone: "+971 50 123 4567", status: "Active", joinedAt: "2025-03-10", totalBookings: 47, totalRevenue: 142500, rating: 4.8, location: "Dubai" },
  { id: "V002", name: "Bloom & Petal Decorations", type: "Organization", category: "Decoration", email: "bloom@example.com", phone: "+971 55 234 5678", status: "Active", joinedAt: "2025-04-02", totalBookings: 63, totalRevenue: 89000, rating: 4.9, location: "Abu Dhabi" },
  { id: "V003", name: "Savory Bites Catering", type: "Organization", category: "Catering", email: "savory@example.com", phone: "+971 52 345 6789", status: "Active", joinedAt: "2025-02-15", totalBookings: 112, totalRevenue: 215000, rating: 4.7, location: "Sharjah" },
  { id: "V004", name: "DJ Kareem Al-Rashid", type: "Individual", category: "Entertainment", email: "kareem@example.com", phone: "+971 56 456 7890", status: "Active", joinedAt: "2025-05-20", totalBookings: 28, totalRevenue: 42000, rating: 4.6, location: "Dubai" },
  { id: "V005", name: "Grand Luxe Events", type: "Organization", category: "Venue", email: "grandluxe@example.com", phone: "+971 50 567 8901", status: "Pending Approval", joinedAt: "2026-04-20", totalBookings: 0, totalRevenue: 0, rating: 0, location: "Dubai" },
  { id: "V006", name: "Aisha Singer", type: "Individual", category: "Entertainment", email: "aisha@example.com", phone: "+971 54 678 9012", status: "Pending Approval", joinedAt: "2026-04-21", totalBookings: 0, totalRevenue: 0, rating: 0, location: "Abu Dhabi" },
  { id: "V007", name: "Desert Rose Catering", type: "Organization", category: "Catering", email: "desert@example.com", phone: "+971 55 789 0123", status: "Suspended", joinedAt: "2025-01-10", totalBookings: 18, totalRevenue: 32000, rating: 3.8, location: "Ajman" },
  { id: "V008", name: "Magic Moments Decor", type: "Organization", category: "Decoration", email: "magic@example.com", phone: "+971 52 890 1234", status: "Active", joinedAt: "2025-06-12", totalBookings: 35, totalRevenue: 58000, rating: 4.5, location: "Ras Al Khaimah" },
];

export const mockBookings: Booking[] = [
  { id: "B001", orderId: "ORD-2026-001", customerName: "Fatima Al-Rashid", customerEmail: "fatima@gmail.com", vendorName: "Elite Spaces UAE", vendorId: "V001", serviceName: "Grand Ballroom Package", serviceCategory: "Venue", eventDate: "2026-05-15", amount: 12000, paidAmount: 6000, status: "Pending", createdAt: "2026-04-22", eventType: "Wedding" },
  { id: "B002", orderId: "ORD-2026-001", customerName: "Ahmed Hassan", customerEmail: "ahmed@gmail.com", vendorName: "Savory Bites Catering", vendorId: "V003", serviceName: "Corporate Catering", serviceCategory: "Catering", eventDate: "2026-05-10", amount: 8500, paidAmount: 8500, status: "Accepted", createdAt: "2026-04-21", eventType: "Corporate" },
  { id: "B003", orderId: "ORD-2026-002", customerName: "Sara Mohammed", customerEmail: "sara@gmail.com", vendorName: "Bloom & Petal Decorations", vendorId: "V002", serviceName: "Luxury Decoration", serviceCategory: "Decoration", eventDate: "2026-05-22", amount: 3500, paidAmount: 3500, status: "Confirmed", createdAt: "2026-04-20", eventType: "Birthday" },
  { id: "B004", orderId: "ORD-2026-003", customerName: "Omar Abdullah", customerEmail: "omar@gmail.com", vendorName: "Elite Spaces UAE", vendorId: "V001", serviceName: "Premium Venue", serviceCategory: "Venue", eventDate: "2026-06-05", amount: 18000, paidAmount: 9000, status: "Pending", createdAt: "2026-04-22", eventType: "Wedding" },
  { id: "B005", orderId: "ORD-2026-004", customerName: "Layla Khalid", customerEmail: "layla@gmail.com", vendorName: "DJ Kareem Al-Rashid", vendorId: "V004", serviceName: "DJ Entertainment", serviceCategory: "Entertainment", eventDate: "2026-05-30", amount: 2500, paidAmount: 1250, status: "Payment Pending (Balance)", createdAt: "2026-04-18", eventType: "Birthday" },
  { id: "B006", orderId: "ORD-2026-005", customerName: "Mohammed Al-Maktoum", customerEmail: "mo@gmail.com", vendorName: "Desert Rose Catering", vendorId: "V007", serviceName: "Banquet Catering", serviceCategory: "Catering", eventDate: "2026-05-08", amount: 15000, paidAmount: 7500, status: "Rejected (Vendor)", createdAt: "2026-04-19", eventType: "Corporate" },
  { id: "B007", orderId: "ORD-2026-006", customerName: "Noura Al-Hamdan", customerEmail: "noura@gmail.com", vendorName: "Magic Moments Decor", vendorId: "V008", serviceName: "Full Event Decoration", serviceCategory: "Decoration", eventDate: "2026-06-12", amount: 5500, paidAmount: 2750, status: "Accepted", createdAt: "2026-04-21", eventType: "Wedding" },
  { id: "B008", orderId: "ORD-2026-007", customerName: "Khalid Al-Zaabi", customerEmail: "khalid@gmail.com", vendorName: "Elite Spaces UAE", vendorId: "V001", serviceName: "Outdoor Garden Venue", serviceCategory: "Venue", eventDate: "2026-07-01", amount: 22000, paidAmount: 0, status: "Rejected (Admin – No Response)", createdAt: "2026-04-15", eventType: "Wedding" },
];

export const mockRefunds: Refund[] = [
  { id: "R001", bookingId: "B006", customerName: "Mohammed Al-Maktoum", vendorName: "Desert Rose Catering", amount: 7500, reason: "Vendor rejected booking", status: "Pending", createdAt: "2026-04-19" },
  { id: "R002", bookingId: "B008", customerName: "Khalid Al-Zaabi", vendorName: "Elite Spaces UAE", amount: 0, reason: "Admin rejected – no vendor response", status: "Pending", createdAt: "2026-04-16" },
  { id: "R003", bookingId: "B009", customerName: "Hind Al-Marri", vendorName: "Bloom & Petal Decorations", amount: 4500, reason: "Customer cancellation", status: "Processed", createdAt: "2026-04-10", processedAt: "2026-04-12" },
  { id: "R004", bookingId: "B010", customerName: "Yousef Ibrahim", vendorName: "Savory Bites Catering", amount: 3000, reason: "Vendor cancellation", status: "Processed", createdAt: "2026-04-08", processedAt: "2026-04-09" },
];

export const mockCoupons: Coupon[] = [
  { id: "C001", code: "WELCOME20", discountType: "Percentage", discountValue: 20, minOrderValue: 500, usageLimit: 500, usedCount: 342, validFrom: "2026-01-01", validUntil: "2026-12-31", isActive: true },
  { id: "C002", code: "EID2026", discountType: "Fixed", discountValue: 200, minOrderValue: 1000, usageLimit: 200, usedCount: 187, validFrom: "2026-03-01", validUntil: "2026-04-30", isActive: false },
  { id: "C003", code: "CORP15", discountType: "Percentage", discountValue: 15, minOrderValue: 5000, usageLimit: 100, usedCount: 23, validFrom: "2026-04-01", validUntil: "2026-06-30", isActive: true },
  { id: "C004", code: "SUMMER25", discountType: "Percentage", discountValue: 25, minOrderValue: 2000, usageLimit: 300, usedCount: 0, validFrom: "2026-06-01", validUntil: "2026-08-31", isActive: true },
];

export const mockEmployees: Employee[] = [
  { id: "E001", name: "Rania Al-Hassan", email: "rania@eventstan.com", role: "Super Admin", permissions: ["all"], isActive: true, joinedAt: "2025-01-15", lastLogin: "2026-04-23" },
  { id: "E002", name: "Tariq Mahmoud", email: "tariq@eventstan.com", role: "Operations Manager", permissions: ["vendors", "bookings", "notifications"], isActive: true, joinedAt: "2025-03-01", lastLogin: "2026-04-22" },
  { id: "E003", name: "Hessa Al-Nuaimi", email: "hessa@eventstan.com", role: "Finance Manager", permissions: ["refunds", "coupons", "bookings"], isActive: true, joinedAt: "2025-05-10", lastLogin: "2026-04-23" },
  { id: "E004", name: "Zayed Al-Falasi", email: "zayed@eventstan.com", role: "Support Agent", permissions: ["bookings", "notifications"], isActive: false, joinedAt: "2025-07-20", lastLogin: "2026-03-15" },
];

export const revenueChartData = [
  { month: "Nov", revenue: 380000, bookings: 142 },
  { month: "Dec", revenue: 520000, bookings: 198 },
  { month: "Jan", revenue: 410000, bookings: 156 },
  { month: "Feb", revenue: 680000, bookings: 241 },
  { month: "Mar", revenue: 750000, bookings: 278 },
  { month: "Apr", revenue: 620000, bookings: 214 },
];
