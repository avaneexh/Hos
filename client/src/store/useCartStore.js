import { create } from "zustand";
import { persist } from "zustand/middleware";

const createCartKey = (item) => {
  const sizeKey = item.size?.id || item.size?.name || "default";

  const addonsKey = (item.addons || [])
    .map((a) => String(a.id || a.name))
    .sort()
    .join("-");

  return `${item.dishId}_${sizeKey}_${addonsKey}`;
};

const calculateUnitPrice = (item) => {
  const sizePrice = item.size?.price || 0;

  const addonsPrice = (item.addons || []).reduce(
    (sum, a) => sum + (a.price || 0),
    0
  );

  return sizePrice + addonsPrice;
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const currentItems = get().items;

        const unitPrice = calculateUnitPrice(item);

        const preparedItem = {
          ...item,
          unitPrice,
          totalPrice: unitPrice * item.quantity,
        };

        const cartKey = createCartKey(preparedItem);

        const existing = currentItems.find(
          (i) => i.cartKey === cartKey
        );

        if (existing) {
          set({
            items: currentItems.map((i) =>
              i.cartKey === cartKey
                ? {
                    ...i,
                    quantity: i.quantity + preparedItem.quantity,
                    totalPrice:
                      i.unitPrice *
                      (i.quantity + preparedItem.quantity),
                  }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                ...preparedItem,
                cartItemId: crypto.randomUUID(),
                cartKey,
              },
            ],
          });
        }
      },

      removeFromCart: (cartItemId) => {
        set({
          items: get().items.filter(
            (item) => item.cartItemId !== cartItemId
          ),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter(
              (item) => item.cartItemId !== cartItemId
            ),
          });
          return;
        }

        set({
          items: get().items.map((item) =>
            item.cartItemId === cartItemId
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
        get().items.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),

      cartTotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
