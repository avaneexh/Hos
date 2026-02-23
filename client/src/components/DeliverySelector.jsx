import React from "react";
import { Bike, Package } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const DeliverySelector = () => {
  const deliveryType = useCartStore((s) => s.deliveryType);
  const setDeliveryType = useCartStore((s) => s.setDeliveryType);

  return (
    <div
      className="
        bg-[#faf6ef]
        border border-[#e5ddd1]
        rounded-2xl
        shadow-[0_8px_20px_rgba(0,0,0,0.05)]
        p-2
      "
    >
      <div className="grid grid-cols-2 gap-2">


        <button
          onClick={() => setDeliveryType("delivery")}
          className={`
            flex items-center justify-center gap-2
            py-3 rounded-xl text-sm font-semibold
            transition
            ${
              deliveryType === "delivery"
                ? "bg-[#b23a2f] text-white"
                : "bg-transparent text-[#3E3A36] hover:bg-[#f3eadd]"
            }
          `}
        >
          <Bike size={16} />
          Delivery
        </button>

        <button
          onClick={() => setDeliveryType("takeaway")}
          className={`
            flex items-center justify-center gap-2
            py-3 rounded-xl text-sm font-semibold
            transition
            ${
              deliveryType === "takeaway"
                ? "bg-[#b23a2f] text-white"
                : "bg-transparent text-[#3E3A36] hover:bg-[#f3eadd]"
            }
          `}
        >
          <Package size={16} />
          Takeaway
        </button>

      </div>
    </div>
  );
};

export default DeliverySelector; 