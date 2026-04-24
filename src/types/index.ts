export type BookingStatus =
  | "Pending"
  | "Accepted"
  | "Rejected (Vendor)"
  | "Rejected (Admin – No Response)"
  | "Cancelled (Admin)"
  | "Cancelled (User)"
  | "Payment Pending (Balance)"
  | "Confirmed";

export type VendorStatus = "Active" | "Pending Approval" | "Suspended" | "Rejected";
export type VendorType = "Organization" | "Individual";
export type ServiceCategory = "Venue" | "Catering" | "Decoration" | "Entertainment" | "Other";

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  category: ServiceCategory;
  email: string;
  phone: string;
  status: VendorStatus;
  joinedAt: string;
  totalBookings: number;
  totalRevenue: number;
  rating: number;
  location: string;
}

export interface Booking {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  vendorId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  eventDate: string;
  amount: number;
  paidAmount: number;
  status: BookingStatus;
  createdAt: string;
  respondedAt?: string;
  eventType: string;
}

export interface Refund {
  id: string;
  bookingId: string;
  customerName: string;
  vendorName: string;
  amount: number;
  reason: string;
  status: "Pending" | "Processed" | "Rejected";
  createdAt: string;
  processedAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "Percentage" | "Fixed";
  discountValue: number;
  minOrderValue: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Operations Manager" | "Support Agent" | "Finance Manager";
  permissions: string[];
  isActive: boolean;
  joinedAt: string;
  lastLogin: string;
}

export interface DashboardStats {
  totalVendors: number;
  pendingVendors: number;
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  pendingRefunds: number;
  activeCustomers: number;
  confirmedBookings: number;
}
