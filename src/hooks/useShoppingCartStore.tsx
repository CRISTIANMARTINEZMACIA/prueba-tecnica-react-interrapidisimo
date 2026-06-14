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
          const { product, amount } = shoppingCart;
          const subTotal = product.price * amount;
          const tax = subTotal * 0.19;

          const exists = state.shoppingCart.find(
            (item) => item.product.id === shoppingCart.product.id
          );
          if (exists) {
            const newShoppingCart = state.shoppingCart.filter(
              (item) => item.product.id !== exists.product.id
            );
            return {
              shoppingCart: [
                ...newShoppingCart,
                {
                  ...exists,
                  amount: exists.amount + amount,
                  subTotal: (exists.subTotal ?? 0) + subTotal,
                  tax: (exists.tax ?? 0) + tax,
                  total: (exists.total ?? 0) + subTotal + tax,
                },
              ],
            };
          }

          const newShoppingCart = {
            ...shoppingCart,
            subTotal: subTotal,
            tax: tax,
            total: subTotal + tax,
          };

          return { shoppingCart: [...state.shoppingCart, newShoppingCart] };
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
