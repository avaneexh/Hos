import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const RepeatCustomizationPopup = ({
  open,
  dish,
  customizations = [],
  onClose,
  onAddNew,
}) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  if (!open || !dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg bg-[#f6efe4] rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm sm:text-base text-[#3E3A36]">
            Repeat last used customization?
          </h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {customizations.map((item) => {
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
                className="bg-[#efe6d8] rounded-xl p-3 flex items-center gap-3"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-12 h-12 rounded-md object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {dish.name}
                  </p>

                  {(sizeText || addonsText) && (
                    <p className="text-xs text-gray-600 truncate">
                      {sizeText}
                      {sizeText && addonsText ? " • " : ""}
                      {addonsText}
                    </p>
                  )}

                  <p className="text-xs text-[#b23a2f] mt-1">
                    £{Number(item.unitPrice || 0).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#e6ddcf] rounded-xl px-2 py-1">
                  {item.quantity === 1 ? (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#b23a2f]"
                    >
                      <Trash2 size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="text-[#b23a2f]"
                    >
                      <Minus size={14} />
                    </button>
                  )}

                  <span className="px-1 text-sm font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      addToCart({
                        dishId: dish.id,
                        name: dish.name,
                        image: dish.image,
                        isVeg: dish.isVeg,
                        size: item.size || null,
                        addons: item.addons || [],
                        quantity: 1,
                        unitPrice: item.unitPrice,
                        totalPrice: item.unitPrice,
                      })
                    }
                    className="text-[#b23a2f]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onAddNew}
          className="mt-5 w-full py-2 rounded-xl bg-[#b23a2f] text-white text-sm font-semibold"
        >
          Add new customisation
        </button>
      </div>
    </div>
  );
};

export default RepeatCustomizationPopup;
