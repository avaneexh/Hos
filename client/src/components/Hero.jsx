import React from "react";
import { Bike, ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full h-80 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://res.cloudinary.com/duxy05sxc/image/upload/v1768057823/aestc_hero_bg_sfodjo.jpg"
          alt="Restaurant food"
          className="
            absolute 
            top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            -rotate-90
            w-xl 
            h-auto 
            object-cover
            scale-110
          "
        />
      </div>

      <div className="relative z-10 h-full flex items-end">
        <div className="w-full max-w-6xl mx-auto px-4 pb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Vine Yard Chinese & English Takeaway
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              912 Broad Lane, Coventry
            </p>

            <div className="flex gap-4 mt-5">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b23a2f] text-white font-medium hover:bg-[#9d3128] transition">
                <Bike size={18} />
                Delivery
              </button>

              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1e6d8] text-[#b23a2f] font-medium hover:bg-[#eadcca] transition">
                <ShoppingBag size={18} />
                Takeaway
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
