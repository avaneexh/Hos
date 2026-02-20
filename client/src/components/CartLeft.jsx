import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItemsSection = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 text-gray-400">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {items.map((item) => {
        const unit = Number(item.unitPrice || 0);

        const sizeText =
          item.size?.name ||
          item.size?.label ||
          (typeof item.size === "string" ? item.size : "");

        const addonsText =
          item.addons?.length > 0
            ? item.addons
                .map((a) =>
                  typeof a === "string" ? a : a?.name || ""
                )
                .filter(Boolean)
                .join(", ")
            : "";

        return (
          <div
            key={item.id}
            className="w-full flex items-center gap-3 sm:gap-4 py-4 border-b"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base truncate">
                {item.name}
              </h3>

              {(sizeText || addonsText) && (
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {sizeText}
                  {sizeText && addonsText ? " • " : ""}
                  {addonsText}
                </p>
              )}

              <p className="text-red-500 font-medium mt-1 text-sm">
                £{unit.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2 border border-red-300 rounded-lg px-2 py-1">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                className="w-6 h-6 flex items-center justify-center text-red-500"
              >
                <Minus size={14} />
              </button>

              <span className="w-5 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                className="w-6 h-6 flex items-center justify-center text-red-500"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-1 sm:ml-2 text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemsSection;
