import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MenuPage from "./pages/MenuPage";
import { Loader } from "lucide-react";

import { useAuthStore } from './store/useAuthStore';


function App() {
  const {  checkAuth, isCheckingAuth } = useAuthStore();
 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MenuPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
