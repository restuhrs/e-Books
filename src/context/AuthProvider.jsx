import { createContext, useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId) => {
    try {
      console.log("[fetchRole] Mulai ambil role untuk userId:", userId);
      const { data, error } = await supabase
        .from("accounts")
        .select("role")
        .eq("id", userId)
        .single();

      if (error || !data) {
        console.warn("[fetchRole] Role tidak ditemukan:", error?.message);
        setRole("user"); // fallback
      } else {
        console.log("[fetchRole] Role ditemukan:", data.role);
        setRole(data.role);
      }
    } catch (err) {
      console.error("[fetchRole] Exception:", err);
      setRole("user");
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log("[AuthProvider] getSession result:", data, error);

        if (data?.session) {
          setUser(data.session.user);
          fetchRole(data.session.user.id);
        } else {
          setUser(null);
          setRole(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[AuthProvider] Auth state changed:", event, session);

        if (session?.user) {
          setUser(session.user);
          fetchRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  console.log(
    "[AuthProvider] Render: user=",
    user,
    "role=",
    role,
    "loading=",
    loading
  );

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
