"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-black py-28 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Let&apos;s Talk
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Open to Connect
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Currently Consultant – AI Architect at Hitachi Group, always happy to connect with fellow engineers,
            leaders, and builders. If you&apos;re working on something ambitious, let&apos;s talk.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              icon: MapPin,
              label: "Location",
              value: "Noida / Gurgaon, India",
              sub: "Remote / PAN India preferred",
            },
            {
              icon: Clock,
              label: "Status",
              value: "Open to Network",
              sub: "Currently @ Hitachi Group",
            },
            {
              icon: Mail,
              label: "Email",
              value: "vikashjaiswal.486",
              sub: "@gmail.com",
            },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-center"
            >
              <Icon className="mx-auto text-cyan-400 mb-3" size={20} />
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                {label}
              </div>
              <div className="text-white font-semibold text-sm">{value}</div>
              <div className="text-zinc-500 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Email link */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <a
            href="mailto:vikashjaiswal.486@gmail.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-150"
          >
            <Mail size={14} />
            vikashjaiswal.486@gmail.com
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 text-zinc-600"
        >
          {[
            { href: "https://github.com/vikas0486", Icon: FaGithub, label: "GitHub" },
            { href: "https://www.linkedin.com/in/linked2vikashjaiswal/", Icon: FaLinkedin, label: "LinkedIn" },
            { href: "https://medium.com/@vikash.jaiswal", Icon: FaMedium, label: "Medium" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-white transition-colors duration-150"
            >
              <Icon size={30} />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
