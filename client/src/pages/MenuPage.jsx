import React from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <Hero />

      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
