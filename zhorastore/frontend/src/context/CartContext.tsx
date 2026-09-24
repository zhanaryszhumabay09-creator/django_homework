// AI-GENERATED: Qoder
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../api/client";
import type { Cart } from "../types";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_CART: Cart = { id: 0, items: [], total: "0", items_count: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get<Cart>("/cart/");
      setCart(data);
    } catch {
      setCart(EMPTY_CART);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = async (productId: number, quantity = 1) => {
    const { data } = await api.post<Cart>("/cart/items/", {
      product_id: productId,
      quantity,
    });
    setCart(data);
  };

  const updateItem = async (itemId: number, quantity: number) => {
    const { data } = await api.patch<Cart>(`/cart/items/${itemId}/`, { quantity });
    setCart(data);
  };

  const removeItem = async (itemId: number) => {
    const { data } = await api.delete<Cart>(`/cart/items/${itemId}/`);
    setCart(data);
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, refresh, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart должен использоваться внутри CartProvider");
  return ctx;
}
