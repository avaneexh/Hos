import React from "react";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const CartItemsSection = () => {
  const navigate = useNavigate();

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
        relative
        cart-scroll
        bg-[#faf6ef]
        border border-[#e5ddd1]
        rounded-2xl
        shadow-[0_12px_30px_rgba(0,0,0,0.06)]
        flex flex-col
        lg:h-full
      "
    >

      <div
        className="
          sticky top-0 z-10
          bg-[#faf6ef]
          px-5 py-4
          border-b border-[#e5ddd1]
          rounded-t-2xl
          flex items-center gap-3
        "
      >
        <button
          onClick={() => navigate("/")}
          className="
            w-8 h-8
            flex items-center justify-center
            rounded-full
            border border-[#e5ddd1]
            hover:bg-[#f3eadd]
            transition
          "
        >
          <ArrowLeft size={16} className="text-[#3E3A36]" />
        </button>

        <div>
          <h2 className="text-base font-semibold text-[#3E3A36]">
            Your Cart
          </h2>
          <p className="text-xs text-gray-500">
            {items.reduce((s, i) => s + i.quantity, 0)} items
          </p>
        </div>
      </div>

      <div
        className="
          flex-1
          overflow-y-auto
          px-4 sm:px-5
          divide-y divide-[#e5ddd1]
        "
      >
        {items.map((item) => {
          const unit = Number(item.unitPrice || 0);
          const total = unit * item.quantity;

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
              className="py-4 flex items-start gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-[#3E3A36] truncate">
                  {item.name}
                </h3>

                {(sizeText || addonsText) && (
                  <p className="text-xs text-gray-500 truncate">
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
                <div className="flex items-center gap-2 border border-[#b23a2f] rounded-lg px-2 py-1 bg-[#f3eadd]">
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

                <span className="text-sm font-semibold text-[#6b645c]">
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-[#faf6ef] to-transparent rounded-b-2xl" />
    </div>
  );
};

export default CartItemsSection;