"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ SAVE USER TO LOCAL STORAGE (THIS WAS MISSING)
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.userId,
        name: data.name,
        role: data.role,
      })
    );

    // ✅ ROLE BASED REDIRECT
    if (data.role === "loser") {
      router.push("/dashboard/loser");
    } else if (data.role === "finder") {
      router.push("/finderdashboard/finder");
    } else {
      alert("Invalid role assigned");
    }
  } catch (error) {
    alert("Server error. Try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-black px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <Input
          icon={<FaUser />}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          icon={<FaLock />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-sky-400 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </motion.form>
    </section>
  );
}

/* Reusable Input */
function Input({ icon, ...props }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-black/30 rounded-xl border border-white/10 focus-within:border-sky-500/50">
        <span className="text-gray-400">{icon}</span>
        <input
          {...props}
          required
          className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
        />
      </div>
    </div>
  );
}
