"use client";

import { motion } from "framer-motion";
import { FaSearch, FaQrcode, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
   <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0B0F19] via-[#020617] to-black px-4 sm:px-6">


      {/* Glow Background (soft on mobile) */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-sky-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-400/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-xl sm:max-w-3xl lg:max-w-4xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-5 px-4 py-1 rounded-full border border-sky-500/30 text-sky-400 text-xs sm:text-sm"
        >
          College-Level • Secure • Smart
        </motion.div>

        {/* Heading */}
        <h1 className="font-extrabold leading-tight
          text-3xl
          sm:text-4xl
          md:text-6xl
          lg:text-7xl"
        >
          Virtual{" "}
          <span className="text-sky-400 drop-shadow-[0_0_16px_rgba(56,189,248,0.5)]">
            Lost
          </span>{" "}
          &{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_16px_rgba(34,211,238,0.5)]">
            Found
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 sm:mt-8 text-gray-400
          text-sm
          sm:text-base
          md:text-lg
          leading-relaxed"
        >
          A smart platform to report lost items, find what matters,
          and reconnect securely using QR-based identification.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/login")}
            className="flex items-center justify-center gap-2
              w-full sm:w-auto
              max-w-xs mx-auto
              px-6 py-3
              rounded-xl
              bg-sky-500 text-black
              font-semibold
              text-sm sm:text-base
              shadow-md shadow-sky-500/30
              hover:bg-sky-400 transition"
          >
            <FaSearch />
            Report Lost
            <FaArrowRight />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/login")}
            className="flex items-center justify-center gap-2
              w-full sm:w-auto
              max-w-xs mx-auto
              px-6 py-3
              rounded-xl
              border border-sky-500/50
              text-sky-400
              font-semibold
              text-sm sm:text-base
              hover:bg-sky-500/10 transition"
          >
            <FaQrcode />
            Found Item
            <FaArrowRight />
          </motion.button>

        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-14 sm:mt-16
           grid grid-cols-3

            gap-6 sm:gap-8
            text-gray-400"
        >
          <Stat number="100+" label="Items Recovered" />
          <Stat number="50+" label="Active Users" />
          <Stat number="QR Based" label="Verification" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Stat Component */
function Stat({ number, label }) {
  return (
    <div className="text-center">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        {number}
      </p>
      <p className="mt-1 text-xs sm:text-sm">{label}</p>
    </div>
  );
}
