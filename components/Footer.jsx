"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        mt-20 sm:mt-24 md:mt-28
        bg-[#020617]
        border-t border-[#1F2933]
        text-gray-400
      "
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-12">

        {/* Top Section */}
        <div
          className="
            grid gap-10
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
          "
        >

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white">
              Virtual <span className="text-sky-400">Lost</span> &{" "}
              <span className="text-cyan-400">Found</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed">
              A smart and secure platform to report lost items and
              reconnect owners with finders using modern web technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-sky-400 cursor-pointer">Home</li>
              <li className="hover:text-sky-400 cursor-pointer">Login</li>
              <li className="hover:text-sky-400 cursor-pointer">Signup</li>
              <li className="hover:text-sky-400 cursor-pointer">Lost Items</li>
              <li className="hover:text-sky-400 cursor-pointer">Found Items</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>QR Code Identification</li>
              <li>Secure Communication</li>
              <li>User-Friendly Dashboard</li>
              <li>College-Safe Workflow</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-sky-400" />
              <span>support@lostfound.com</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-xl">
              <FaGithub className="hover:text-white cursor-pointer transition" />
              <FaLinkedin className="hover:text-white cursor-pointer transition" />
              <FaInstagram className="hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#1F2933] text-center text-xs sm:text-sm">
          © {new Date().getFullYear()} Virtual Lost & Found • College Project
        </div>

      </div>
    </footer>
  );
}
