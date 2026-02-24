import { useCartStore } from "../store/useCartStore";
import CartItemsSection from "./CartLeft";
import DeliverySelector from "./DeliverySelector";
import PriceSummary from "./PriceSummary";
import PaymentMethod from "./PaymentMethod";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const deliveryType = useCartStore((s) => s.deliveryType);
  const paymentMethod = useCartStore((s) => s.paymentMethod);
  const cartTotal = useCartStore((s) => s.cartTotal);

  const subtotal = Number(cartTotal());

  const deliveryFee = deliveryType === "delivery" ? 1.5 : 0;

  const VAT_AMOUNT = subtotal > 0 ? 0.99 : 0;

  const payableTotal = subtotal + deliveryFee + VAT_AMOUNT;

  const handlePay = () => {
    if (!items.length) return;

    console.log({
      items,
      deliveryType,
      paymentMethod,
      subtotal,
      vatAmount: VAT_AMOUNT,
      deliveryFee,
      total: payableTotal,
    });

    navigate("/checkout-loading");
  };

  return (
    <div className="bg-[#faf6ef] min-h-screen px-2 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        <div className="space-y-4 lg:h-[calc(100vh-120px)] lg:overflow-y-auto">
          <div className="lg:hidden">
            <DeliverySelector />
          </div>

          <CartItemsSection />
        </div>

        <div className="space-y-4 h-fit lg:sticky lg:top-24">
          <div className="hidden lg:block">
            <DeliverySelector />
          </div>

          <PriceSummary />

          <PaymentMethod />

          <button
            onClick={handlePay}
            disabled={!items.length}
            className="
              w-full py-3 rounded-xl bg-[#b23a2f] text-white font-semibold text-sm
              hover:opacity-90 transition disabled:opacity-50
            "
          >
            Pay £{payableTotal.toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;