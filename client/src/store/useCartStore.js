import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) =>
            i.dishId === item.dishId &&
            JSON.stringify(i.size) === JSON.stringify(item.size) &&
            JSON.stringify(i.addons) === JSON.stringify(item.addons)
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === existing.id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    totalPrice: i.totalPrice + item.totalPrice,
                  }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                id: crypto.randomUUID(),
              },
            ],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  totalPrice:
                    (item.totalPrice / item.quantity) * quantity,
                }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      cartCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      cartTotal: () =>
        get().items.reduce((sum, item) => sum + item.totalPrice, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
