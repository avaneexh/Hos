import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminRoute = () => {
    const {authUser , isCheckingAuth} = useAuthStore()

     if (isCheckingAuth) {
      return <div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin" /></div>;
    }
  
    if(!authUser || authUser.role !== "ADMIN"){
        return <Navigate to="/"/>;
    }

  return (
    <div className=" bg-[#faf6ef]">
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default AdminRoute
