"use client";

import { motion } from "framer-motion";
import { FaUsers, FaQrcode, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "User Friendly",
    desc: "Simple and intuitive portals for reporting lost and found items.",
  },
  {
    icon: <FaQrcode />,
    title: "QR Code System",
    desc: "Quick identification and communication using QR-based access.",
  },
  {
    icon: <FaLock />,
    title: "Secure & Trusted",
    desc: "A college-safe workflow focused on privacy and trust.",
  },
];

export default function About() {
  return (
    <section className="relative bg-[#020617] py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Why Virtual Lost & Found?
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Designed to make lost item recovery simple, secure, and stress-free
            for college environments.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.04 }}
              className="group bg-[#111827] p-6 sm:p-8
                rounded-2xl border border-[#1F2933]
                hover:border-sky-500/40
                transition-all duration-300
                flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center
                w-14 h-14 sm:w-16 sm:h-16
                rounded-xl
                bg-sky-500/10
                text-sky-400
                text-2xl sm:text-3xl
                mb-5
                group-hover:scale-110 transition"
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold">
                {f.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
