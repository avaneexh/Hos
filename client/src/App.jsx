import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import MenuPage from "./pages/MenuPage";
import { Loader } from "lucide-react";

import { useAuthStore } from './store/useAuthStore';
import AdminRoute from "./components/AdminRoute";
import AddItem from "./pages/AddItem";


function App() {
  const {authUser, checkAuth, isCheckingAuth } = useAuthStore();
 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth ) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#faf6ef]">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MenuPage />} />
        </Route>

        <Route element={<AdminRoute/>}>
          <Route
            path="/addItem"
            element={authUser ? <AddItem /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
