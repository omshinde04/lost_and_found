"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("loser");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully");
      router.push("/login");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-black px-4">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <Input
          icon={<FaUser />}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          icon={<FaEnvelope />}
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

        {/* Role */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Register as</label>
          <div className="flex gap-3 mt-2">
            {[
              { key: "loser", label: "Lost an Item" },
              { key: "finder", label: "Found an Item" },
            ].map((r) => (
              <button
                type="button"
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  role === r.key
                    ? "bg-sky-500 text-black"
                    : "border border-white/10 text-gray-300"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-sky-400 cursor-pointer"
          >
            Login
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
