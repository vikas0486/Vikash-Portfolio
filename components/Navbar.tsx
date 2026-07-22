"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/engineering", label: "Engineering" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route/hash navigation
  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight select-none">
          <Image src="/logo.png" alt="Vikash Jaiswal" width={32} height={32} className="rounded-lg" priority />
          <span className="ml-1.5 text-zinc-500 font-normal text-sm hidden sm:inline">
            / Lead Platform Engineer
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Network
          </span>
          <Link
            href="/#contact"
            className="hidden md:inline-block bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Know Me
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-zinc-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-zinc-800/50"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="text-zinc-300 hover:text-white text-base font-medium py-3 border-b border-zinc-800/60 last:border-b-0 transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={closeMobile}
                className="mt-4 text-center bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors duration-150"
              >
                Know Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
