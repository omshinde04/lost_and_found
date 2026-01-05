"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("loser");

  const handleLogin = (e) => {
    e.preventDefault();

    // FRONTEND ROLE-BASED REDIRECT (TEMP)
    if (role === "loser") router.push("/dashboard/loser");
    else if (role === "finder") router.push("/dashboard/finder");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#020617] to-black px-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <div className="flex items-center gap-3 mt-1 px-4 py-3 bg-black/30 rounded-xl border border-white/10">
            <FaUser className="text-gray-400" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Password</label>
          <div className="flex items-center gap-3 mt-1 px-4 py-3 bg-black/30 rounded-xl border border-white/10">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              required
              placeholder="••••••••"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">
            Login as
          </label>

          <div className="flex gap-3 mt-2">
            {[
              { key: "loser", label: "Lost an Item" },
              { key: "finder", label: "Found an Item" },
            ].map((r) => (
              <button
                type="button"
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition
                  ${
                    role === r.key
                      ? "bg-sky-500 text-black"
                      : "border border-white/10 text-gray-300 hover:border-sky-500/50"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 transition"
        >
          Login
        </button>

        {/* Signup */}
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
