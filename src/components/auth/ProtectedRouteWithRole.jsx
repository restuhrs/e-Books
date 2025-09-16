import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRouteWithRole({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // atau spinner loading
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // bisa diarahkan ke halaman lain (misalnya 403 page)
  }

  return children;
}
