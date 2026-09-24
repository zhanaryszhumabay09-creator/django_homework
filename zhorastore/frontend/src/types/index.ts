// AI-GENERATED: Qoder
export interface Category {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  category_name: string;
  price: string;
  image: string;
  is_available: boolean;
  created_at: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: string;
  items_count: number;
}

export interface OrderItem {
  id: number;
  product: number | null;
  product_name: string;
  price: string;
  quantity: number;
  subtotal: string;
}

export interface Order {
  id: number;
  status: string;
  status_display: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  total: string;
  created_at: string;
  items: OrderItem[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
}
