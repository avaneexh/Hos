import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth, openAuthModal } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      openAuthModal();
    }
  }, [authUser, isCheckingAuth, openAuthModal]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
