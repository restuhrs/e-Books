import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Gagal logout:", error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold">ReadSpace</h1>

        {/* Logout (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl shadow transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
        <div className="relative sm:hidden">
          <button
            className="p-2 rounded-xl border border-white/40 hover:bg-white/20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg ring-1 ring-black/10 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 rounded-lg"
              >
                <LogOut size={20} className="text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
