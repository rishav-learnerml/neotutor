import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "../assets/neotutorlogotr.png";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  const [tab, setTab] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT for JWT cookie
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign in failed");
      setIsLoggedIn(true);

      navigate("/"); // Redirect to home or dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      githubUsername: formData.get("githubUsername") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT for JWT cookie
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign up failed");
      setIsLoggedIn(true);

      navigate("/"); // Redirect after successful signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-500 blur-3xl"
      />

      {/* Auth Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <img src={logo} alt="NeoTutor" className="w-16 h-16" />
              <h1 className="text-2xl font-bold text-white">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  NeoTutor
                </span>
              </h1>
              <p className="text-slate-300 text-sm">
                Your AI-powered Personal Tutor
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center mb-4">{error}</p>
            )}

            {/* Tabs */}
            <Tabs
              value={tab}
              onValueChange={setTab}
              className="w-full text-gray-400"
            >
              <TabsList className="grid grid-cols-2 bg-white/10 rounded-full p-1">
                <TabsTrigger
                  value="signin"
                  className={cn(
                    "rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all"
                  )}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className={cn(
                    "rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all"
                  )}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin" className="mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="bg-white/20 text-white placeholder:text-slate-300 focus:ring-cyan-500"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="bg-white/20 text-white placeholder:text-slate-300 focus:ring-cyan-500"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/30 transition"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="bg-white/20 text-white placeholder:text-slate-300 focus:ring-cyan-500"
                  />
                  <Input
                    name="githubUsername"
                    type="text"
                    placeholder="GitHub Username"
                    required
                    className="bg-white/20 text-white placeholder:text-slate-300 focus:ring-cyan-500"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="bg-white/20 text-white placeholder:text-slate-300 focus:ring-cyan-500"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/30 transition"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
