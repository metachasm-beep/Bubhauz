import { create } from 'zustand';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  gst: number;
  images: string[];
  quantity: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totals: {
    subtotal: number;
    gstAmount: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totals: {
    subtotal: 0,
    gstAmount: 0,
    shippingCost: 0,
    discount: 0,
    total: 0,
  },
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cart`);
      set({
        items: response.data.items,
        totals: response.data.totals,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to fetch cart',
        isLoading: false,
      });
    }
  },

  addToCart: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/cart/items`, { productId, quantity });
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to add to cart',
        isLoading: false,
      });
    }
  },

  updateCartItem: async (cartItemId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/cart/items/${cartItemId}`, { quantity });
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to update cart',
        isLoading: false,
      });
    }
  },

  removeFromCart: async (cartItemId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/cart/items/${cartItemId}`);
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to remove from cart',
        isLoading: false,
      });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/cart`);
      set({
        items: [],
        totals: {
          subtotal: 0,
          gstAmount: 0,
          shippingCost: 0,
          discount: 0,
          total: 0,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to clear cart',
        isLoading: false,
      });
    }
  },
}));
