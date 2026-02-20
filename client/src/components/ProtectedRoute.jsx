import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth, openAuthModal } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {

      openAuthModal();
      navigate("/")
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
