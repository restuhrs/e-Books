import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/config/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/" replace />;

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:5173" },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20" />

      <Card className="relative w-[380px] shadow-xl backdrop-blur-sm border border-stone-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
              alt="Logo"
              className="h-20 w-20 rounded-lg shadow-md bg-white p-2"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-stone-800">
            ReadSpace
          </CardTitle>
          <CardDescription className="text-stone-600">
            Login untuk mengakses koleksi e-books
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            onClick={signInWithGoogle}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2"
          >
            <div className="p-1 bg-white rounded-lg">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </div>
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
