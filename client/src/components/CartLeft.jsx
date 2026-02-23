import React from "react";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItemsSection = () => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartTotal = useCartStore((state) => state.cartTotal);

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 text-gray-400">
        Your cart is empty
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        lg:max-w-xl
        xl:max-w-2xl
        mx-auto
        bg-[#faf6ef]
        border border-[#e5ddd1]
        rounded-2xl
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        p-4 sm:p-5
        flex flex-col
      "
    >
      {items.map((item) => {
        const unit = Number(item.unitPrice || 0);
        const total = unit * (item.quantity || 0);

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
            key={item.cartItemId}
            className="w-full flex items-start gap-3 sm:gap-4 py-4 border-b border-[#e5ddd1]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-[#3E3A36] truncate">
                {item.name}
              </h3>

              {(sizeText || addonsText) && (
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {sizeText}
                  {sizeText && addonsText ? " • " : ""}
                  {addonsText}
                </p>
              )}

              <p className="text-[#b23a2f] font-medium text-sm mt-1">
                £{unit.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 border border-[#b23a2f] rounded-lg mt-2 px-1 py-1 text-sm bg-[#f3eadd]">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.cartItemId,
                      item.quantity - 1
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center text-[#b23a2f]"
                >
                  <Minus size={14} />
                </button>

                <span className="w-5 text-center text-sm font-semibold text-[#3E3A36]">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.cartItemId,
                      item.quantity + 1
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center text-[#b23a2f]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <span className="text-sm font-semibold text-[#3E3A36]">
                £{total.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemsSection;