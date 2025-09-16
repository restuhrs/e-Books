import { useEffect } from "react";
import { supabase } from "@/config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("[AuthCallback] session:", data, error);
      navigate("/", { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return <p className="text-center mt-10">Menyelesaikan login...</p>;
}
