import CartItemsSection from "./CartLeft";
import DeliverySelector from "./DeliverySelector";

const Cart = () => {
  return (
    <div className="bg-[#faf6ef] min-h-screen px-4 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">


        <div className="lg:h-[calc(100vh-120px)] lg:overflow-y-auto space-y-4">

          <div className="lg:hidden ">
            <DeliverySelector />
          </div>

          <CartItemsSection />

        </div>

        <div className="hidden lg:block space-y-4 lg:sticky lg:top-24 h-fit">
          <DeliverySelector />
        </div>

      </div>
    </div>
  );
};

export default Cart;