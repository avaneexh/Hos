import CartItemsSection from "./CartLeft";

const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 p-6">
      
      <div className="lg:col-span-2">
        <CartItemsSection />
      </div>


    </div>
  );
};

export default Cart;
