
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  deliveryMethod: "delivery" | "pickup";
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentDetails: PaymentDetails;
  orderDate: string;
  status: "pending" | "completed" | "cancelled";
}

export interface CustomerInfo {
  name: string;
  phone?: string;
  address?: string;
}

export type PaymentMethod = "credit" | "debit" | "cash" | "pix";

export interface PaymentDetails {
  changeNeeded?: boolean;
  changeAmount?: number;
  pixKey?: string;
}

export interface SalesReport {
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  topProducts: {
    id: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  dailySales: {
    date: string;
    sales: number;
    orders: number;
  }[];
  monthlySales: {
    month: string;
    sales: number;
    orders: number;
  }[];
}
