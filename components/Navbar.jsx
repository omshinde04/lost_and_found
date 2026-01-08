"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearchLocation } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  /* ✅ Sync user on every route change */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [pathname]);

  /* ✅ Logout */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  /* ✅ Dashboard route */
const dashboardRoute =
  user?.role === "loser"
    ? "/dashboard/loser"
    : "/finderdashboard/finder";


  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur border-b border-[#1F2933]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <FaSearchLocation className="text-sky-400" />
          Lost<span className="text-sky-400">&</span>Found
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <NavItem href="/">Home</NavItem>

          {!user ? (
            <>
              <NavItem href="/login">Login</NavItem>
              <NavItem href="/signup">Signup</NavItem>

              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <NavItem href={dashboardRoute}>Dashboard</NavItem>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-black transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0B0F19] border-t border-[#1F2933]"
          >
            <div className="flex flex-col gap-6 px-6 py-6 text-gray-300">
              <NavItem href="/" onClick={() => setOpen(false)}>Home</NavItem>

              {!user ? (
                <>
                  <NavItem href="/login" onClick={() => setOpen(false)}>Login</NavItem>
                  <NavItem href="/signup" onClick={() => setOpen(false)}>Signup</NavItem>

                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center px-5 py-3 rounded-xl bg-sky-500 text-black font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <NavItem href={dashboardRoute} onClick={() => setOpen(false)}>
                    Dashboard
                  </NavItem>

                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="px-5 py-3 rounded-xl border border-red-500/40 text-red-400 text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* NAV ITEM */
function NavItem({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="relative group">
      <span className="hover:text-white transition">{children}</span>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
    </Link>
  );
}
