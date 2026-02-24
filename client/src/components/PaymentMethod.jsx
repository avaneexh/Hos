import { useState } from "react";
import { ChevronDown, CreditCard, Smartphone } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const PaymentMethod = () => {
  const paymentMethod = useCartStore((s) => s.paymentMethod);
  const setPaymentMethod = useCartStore((s) => s.setPaymentMethod);

  const [open, setOpen] = useState(false);

  const options = [
    {
      id: "card",
      label: "Card Payment",
      icon: <CreditCard size={16} />,
    },
    {
      id: "google_pay",
      label: "Google Pay",
      icon: <Smartphone size={16} />,
    },
    {
      id: "apple_pay",
      label: "Apple Pay (Coming Soon)",
      icon: <Smartphone size={16} />,
      disabled: true,
    },
  ];

  const selected =
    options.find((o) => o.id === paymentMethod) || options[0];

  return (
    <div className="bg-[#faf6ef] border border-[#e5ddd1] rounded-2xl shadow-sm">
      <h3 className="px-4 pt-4 pb-2 text-sm font-semibold text-[#3E3A36]">
        Payment Method
      </h3>

      <div className="px-3 pb-3 relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-3 rounded-xl border border-[#e5ddd1] bg-white text-sm"
        >
          <span className="flex items-center gap-2">
            {selected.icon}
            {selected.label}
          </span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-[#e5ddd1] rounded-xl shadow-md overflow-hidden z-20">
            {options.map((opt) => (
              <button
                key={opt.id}
                disabled={opt.disabled}
                onClick={() => {
                  if (opt.disabled) return;
                  setPaymentMethod(opt.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-3 text-sm text-left
                ${
                  opt.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-[#f3eadd]"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;