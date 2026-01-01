import React from "react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://res.cloudinary.com/duxy05sxc/image/upload/v1766947230/hos_logo_xud1dk.svg"; 

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F7F1E8]/80 backdrop-blur border-b border-[#E6DCCF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="Restaurant Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="text-lg font-semibold text-[#3E3A36] tracking-wide">
              Restaurant
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/menu"
              className="text-sm font-medium text-[#3E3A36] hover:text-[#8B5E3C] transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/login"
              className="rounded-full bg-[#8B5E3C] px-4 py-1.5 text-sm font-medium text-[#FDFBF8] hover:bg-[#7A4F32] transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
