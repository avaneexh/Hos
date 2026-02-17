import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const FloatingCartBtn = ({ onClick }) => {
  const items = useCartStore((s) => s.items);
  const cartCount = useCartStore((s) => s.cartCount());
  const cartTotal = useCartStore((s) => s.cartTotal());

  if (!items.length) return null;

  const lastItem = items[items.length - 1];

  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-3
        left-1/2
        -translate-x-1/2
        z-50
        w-[92%] max-w-md
        bg-[#b23a2f]
        text-white
        rounded-lg
        shadow-2xl
        px-3 py-1.5
        flex
        items-center
        justify-between
        hover:scale-[1.02]
        active:scale-95
        transition
      "
    >
      <div className="flex items-center gap-3">
        
        {lastItem?.image && (
          <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
            <img
              src={lastItem.image}
              alt={lastItem.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="text-left leading-tight">
          <p className="text-xs font-medium">
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </p>
          <p className="text-base font-semibold">
            £{cartTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold">
        <ShoppingCart size={18} />
        <span>BASKET</span>
      </div>
    </button>
  );
};

export default FloatingCartBtn;
