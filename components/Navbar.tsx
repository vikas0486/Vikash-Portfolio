"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
  { href: "/engineering", label: "Engineering" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-bold text-lg tracking-tight select-none">
          <span className="text-cyan-400">V</span>
          <span className="text-white">J</span>
          <span className="ml-2 text-zinc-500 font-normal text-sm hidden sm:inline">
            / Lead Platform Engineer
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={
                label === "Engineering"
                  ? "text-cyan-400 hover:text-cyan-300 text-sm font-semibold border border-cyan-800 px-3 py-1 rounded-lg hover:border-cyan-500 transition-all duration-150"
                  : "text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-150"
              }
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Work
          </span>
          <a
            href="#contact"
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Hire Me
          </a>
        </div>
      </div>
    </motion.header>
  );
}
