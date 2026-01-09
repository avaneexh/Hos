import React, { useState, useRef, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSignup from "../components/LoginSignup";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LOGO_URL =
  "https://res.cloudinary.com/duxy05sxc/image/upload/v1766947230/hos_logo_xud1dk.svg";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  // console.log("auth user", authUser);
  
  const [openAuth, setOpenAuth] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const adminRef = useRef(null);


  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    let timeoutId;

    const handleOutsideClick = (e) => {
      if (openAdmin && adminRef.current && !adminRef.current.contains(e.target)) {
        timeoutId = setTimeout(() => {
          setOpenAdmin(false);
        }, 10); 
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      clearTimeout(timeoutId);
    };
  }, [openAdmin]);


  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F7F1E8]/80 backdrop-blur border-b border-[#E6DCCF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Logo" className="h-15" />
            </Link>

            <div className="flex items-center gap-4">
              

             {isAdmin && (
                <div ref={adminRef} className="relative">
                  <button
                    onClick={() => setOpenAdmin((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl bg-black/5 px-4 py-3 text-sm font-bold text-[#3E3A36] hover:bg-[#cdc5c0]"
                  >
                    Admin
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {openAdmin && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border">
                      <Link
                        to="/admin/add-items"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setOpenAdmin(false)}
                      >
                        Add Items
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setOpenAdmin(false)}
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setOpenAdmin(false)}
                      >
                        Orders
                      </Link>
                    </div>
                  )}
                </div>
             )}


              <Link
                to="/menu"
                className="text-sm font-bold text-[#3E3A36] hover:text-[#8B5E3C]"
              >
                AboutUs
              </Link>

              {!authUser ? (
                <button
                  onClick={() => setOpenAuth(true)}
                  className="flex items-center gap-2 rounded-xl bg-black/5 px-4 py-3 text-sm font-bold text-[#3E3A36] hover:bg-[#cdc5c0]"
                >
                  <User className="h-4 w-4" />
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {openAuth && <LoginSignup onClose={() => setOpenAuth(false)} />}
    </>
  );
};

export default Navbar;
