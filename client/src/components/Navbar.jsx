import React, { useState, useRef, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSignup from "../components/LoginSignup";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LOGO_URL =
  "https://res.cloudinary.com/duxy05sxc/image/upload/v1766947230/hos_logo_xud1dk.svg";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  const adminRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [openAuth, setOpenAuth] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        openAdmin &&
        adminRef.current &&
        !adminRef.current.contains(e.target)
      ) {
        setOpenAdmin(false);
      }

      if (
        openMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openAdmin, openMobileMenu]);



return (
  <>
    <nav className="sticky top-0 z-50 bg-[#F7F1E8]/80 backdrop-blur border-b border-[#E6DCCF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="h-15" />
          </Link>

          <div className="flex items-center gap-4">
            
            <div className="hidden lg:flex items-center gap-4">
              
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
                    <div  className="
                      absolute  right-4 mt-3 w-60
                      rounded-2xl bg-[#F7F1E8]
                      border border-[#E6DCCF]
                      shadow-xl z-50
                      overflow-hidden
                      transition-all duration-200 ease-out
                      animate-[fadeIn_0.2s_ease-out]
                    ">
                      <Link to="/addItem" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Add Items
                      </Link>
                      <Link to="/admin/users" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Users
                      </Link>
                      <Link to="/admin/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
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

            <button
              onClick={() => setOpenMobileMenu((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10"
            >
              {openMobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {openMobileMenu && (
      <div className="lg:hidden relative">
        <div
          ref={mobileMenuRef}
          className="
            fixed right-4 mt-3 w-60
            rounded-2xl bg-[#F7F1E8]
            border border-[#E6DCCF]
            shadow-xl z-50
            overflow-hidden
            transition-all duration-200 ease-out
            animate-[fadeIn_0.2s_ease-out]
          "
        >
          {isAdmin && (
            <>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#8B5E3C]">
                Admin
              </div>

              <Link
                to="/addItem"
                className="block px-5 py-3 text-sm font-medium text-[#3E3A36]
                          hover:bg-[#EFE4D6]"
              >
                Add Items
              </Link>

              <Link
                to="/admin/users"
                className="block px-5 py-3 text-sm font-medium text-[#3E3A36]
                          hover:bg-[#EFE4D6]"
              >
                Users
              </Link>

              <Link
                to="/admin/orders"
                className="block px-5 py-3 text-sm font-medium text-[#3E3A36]
                          hover:bg-[#EFE4D6]"
              >
                Orders
              </Link>

              <div className="mx-4 my-2 h-px bg-[#E6DCCF]" />
            </>
          )}

          <Link
            to="/menu"
            className="block px-5 py-3 text-sm font-semibold text-[#3E3A36]
                      hover:bg-[#EFE4D6]"
            onClick={() => setOpenMobileMenu(false)}
          >
            About Us
          </Link>

          {!authUser ? (
            <button
              onClick={() => {
                setOpenAuth(true);
                setOpenMobileMenu(false);
              }}
              className="w-full text-left px-5 py-3 text-sm font-semibold text-[#3E3A36]
                        hover:bg-[#EFE4D6]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setOpenMobileMenu(false);
              }}
              className="w-full text-left px-5 py-3 text-sm font-semibold text-[#B23A2F]
                        hover:bg-[#F1E6D8]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    )}


    {openAuth && <LoginSignup onClose={() => setOpenAuth(false)} />}
  </>
);

};

export default Navbar;
