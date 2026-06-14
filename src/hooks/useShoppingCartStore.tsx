import { create } from "zustand";
import type { ShoppingCart } from "../models/shoppingCart";
import { persist } from "zustand/middleware";

interface ShoppingCartState {
  shoppingCart: ShoppingCart[];
  addToCart: (shoppingCart: ShoppingCart) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set) => ({
      shoppingCart: [],

      addToCart: (shoppingCart: ShoppingCart) =>
        set((state) => {
          const exists = state.shoppingCart.some(
            (item) => item.product.id === shoppingCart.product.id
          );
          if (exists) return state;
          return { shoppingCart: [...state.shoppingCart, shoppingCart] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.filter(
            (item) => item.product.id !== productId
          ),
        })),

      clearCart: () => set({ shoppingCart: [] }),
    }),
    {
      name: "shopping-cart",
    }
  )
);
