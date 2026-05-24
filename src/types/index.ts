export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  tagline?: string;
  images: string[];
  stock: number;
  bestseller?: boolean;
  featured?: boolean;
  created_at?: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderStatus =
  | "pending_payment"
  | "waiting_verification"
  | "paid"
  | "packed"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "uploaded" | "verified" | "rejected";

export type Order = {
  order_id: string;
  customer_name: string;
  whatsapp: string;
  address: string;
  city: string;
  postal_code: string;
  delivery_notes?: string;
  items: CartItem[];
  subtotal: number;
  unique_code: number;
  total_payment: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  proof_image?: string | null;
  created_at: string;
  verified_at?: string | null;
};

export type CustomerInfo = {
  customer_name: string;
  whatsapp: string;
  address: string;
  city: string;
  postal_code: string;
  delivery_notes?: string;
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
};
