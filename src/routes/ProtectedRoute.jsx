import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getToken } from "../api/apiAuth";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { user, admin, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  // Check token validity
  const token = getToken();
  if (!token) {
    logout(); // Clear auth state if token is missing
    return <Navigate to="/" replace />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute && !admin) {
    return <Navigate to="/" replace />;
  }

  if (!isAdminRoute && !user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;