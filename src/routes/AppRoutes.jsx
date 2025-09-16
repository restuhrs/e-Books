import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Login from "../components/auth/Login";
import Dashboard from "../pages/Dashboard";
import AuthCallback from "../components/auth/AuthCallback";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* fallback 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-center text-xl mt-10 text-blue-500">
            404 - Halaman tidak ditemukan
          </h1>
        }
      />
    </Routes>
  );
}
