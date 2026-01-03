import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginSignup from "../components/LoginSignup";
import { User } from "lucide-react";


const LOGO_URL =
  "https://res.cloudinary.com/duxy05sxc/image/upload/v1766947230/hos_logo_xud1dk.svg";

const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F7F1E8]/80 backdrop-blur border-b border-[#E6DCCF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Logo" className="h-15" />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/menu"
                className="text-sm font-bold text-[#3E3A36] hover:text-[#8B5E3C]"
              >
                AboutUs
              </Link>

              <button
                onClick={() => setOpenAuth(true)}
                className="flex items-center ml-10 gap-2 rounded-xl text-[#3E3A36] bg-black/5 px-4 py-3 cursor-pointer text-sm font-bold hover:bg-[#cdc5c0] hover:text-[#8B5E3C]"
              >
               <User className="h-4 w-4" />
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {openAuth && <LoginSignup onClose={() => setOpenAuth(false)} />}
    </>
  );
};

export default Navbar;
