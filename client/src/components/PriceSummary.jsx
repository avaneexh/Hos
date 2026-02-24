import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const PriceSummary = () => {
  const [open, setOpen] = useState(false);

  const cartTotal = useCartStore((s) => s.cartTotal);
  const deliveryType = useCartStore((s) => s.deliveryType);

  const subtotal = Number(cartTotal());
  const deliveryFee = deliveryType === "delivery" ? 1.5 : 0;

  const VAT_AMOUNT = subtotal > 0 ? 0.99 : 0;

  const total = subtotal + deliveryFee + VAT_AMOUNT;

  return (
    <div className="bg-[#faf6ef] border border-[#e5ddd1] rounded-2xl p-4 shadow-sm space-y-3">
      <h3 className="font-semibold text-[#3E3A36] text-sm">
        Price Summary
      </h3>

      <div className="flex justify-between text-sm text-[#3E3A36]">
        <span>Subtotal</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-[#3E3A36]">
        <span>Delivery</span>
        <span>
          {deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}
        </span>
      </div>

      <div className="flex justify-between text-sm text-[#3E3A36]">
        <span>VAT</span>
        <span>£{VAT_AMOUNT.toFixed(2)}</span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-xs text-[#6b645c]"
      >
        <span>View tax details</span>
        <ChevronDown
          size={14}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="bg-[#f3eadd] rounded-xl p-3 text-xs space-y-2 text-[#3E3A36]">
          <div className="flex justify-between">
            <span>VAT (Fixed)</span>
            <span>£{VAT_AMOUNT.toFixed(2)}</span>
          </div>

          <div className="text-[11px] text-gray-500">
            Flat service VAT applied
          </div>
        </div>
      )}

      <div className="border-t pt-3 flex justify-between font-semibold text-[#b23a2f]">
        <span>Total</span>
        <span>£{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceSummary;