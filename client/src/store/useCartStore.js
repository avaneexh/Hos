import { create } from "zustand";
import { persist } from "zustand/middleware";

const createCartKey = (item) => {
  const sizeKey = item.size?.id || item.size?.name || "default";

  const addonsKey = (item.addons || [])
    .map((a) => a.id || a.name)
    .sort()
    .join("-");

  return `${item.dishId}_${sizeKey}_${addonsKey}`;
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const items = get().items;
        const cartKey = createCartKey(item);

        const existing = items.find((i) => i.cartKey === cartKey);

        if (existing) {
          set({
            items: items.map((i) =>
              i.cartKey === cartKey
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
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
                cartKey,
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
        if (quantity <= 0) {
          set({
            items: get().items.filter((item) => item.id !== id),
          });
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  totalPrice: item.unitPrice * quantity,
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
