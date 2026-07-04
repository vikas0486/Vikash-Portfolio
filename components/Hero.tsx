"use client";

import { Variants } from "framer-motion";
import { profile } from "@/lib/profile";
import { motion } from "framer-motion";
import Image from "next/image";
import ResumeDownload from "./ResumeDownload";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { ArrowDownRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.11,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const floatingBadges = [
  { label: "16+ Years", color: "cyan", x: "right-0", y: "top-[10%]" },
  { label: "AWS · EKS", color: "cyan", x: "-right-2", y: "bottom-[22%]" },
  { label: "GenAI / LLM", color: "blue", x: "-left-4", y: "top-[28%]" },
  { label: "Open to Network", color: "emerald", x: "-left-2", y: "bottom-[30%]" },
  { label: "Terraform", color: "cyan", x: "left-1/2 -translate-x-1/2", y: "-top-3" },
];

const colorMap: Record<string, string> = {
  cyan: "border-cyan-500/40 text-cyan-400 shadow-cyan-500/10",
  blue: "border-blue-500/40 text-blue-400 shadow-blue-500/10",
  emerald: "border-emerald-500/40 text-emerald-400 shadow-emerald-500/10",
};

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />
      {/* Photo-side glow */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_460px] items-center gap-12 xl:gap-20">

          {/* ── Left: Content ── */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              15+ Years · Cloud · DevOps · Platform Engineering · GenAI
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight"
            >
              {profile.identity.name.split(" ")[0].toUpperCase()}
              <br />
              <span className="text-zinc-500">
                {profile.identity.name.split(" ").slice(1).join(" ").toUpperCase()}
              </span>
            </motion.h1>

            {/* Animated Roles */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-xl md:text-3xl font-semibold text-cyan-400 h-10"
            >
              <TypeAnimation
                sequence={profile.roles.flatMap((role) => [role, 2000])}
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed"
            >
              {profile.summary}{" "}
              Currently{" "}
              <span className="text-white font-medium">
                Technical Lead at Thales Group
              </span>
              , building custom Terraform Providers and integrating GenAI-driven
              automation tooling into enterprise infrastructure workflows.
            </motion.p>

            {/* Location + Availability */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center gap-3 mt-6 text-sm text-zinc-500"
            >
              <span>{profile.identity.location}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-emerald-400 font-medium">
                {profile.identity.availability}
              </span>
              <span className="text-zinc-700">·</span>
              <span>Remote / PAN India</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4 mt-10 items-center"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150"
              >
                View Projects
                <ArrowDownRight className="w-4 h-4" />
              </a>
              <ResumeDownload />
            </motion.div>

            {/* Social Links */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-6 mt-10"
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
                  className="text-zinc-600 hover:text-white transition-colors duration-150"
                >
                  <Icon size={22} />
                </a>
              ))}
              <span className="text-zinc-700 text-xs ml-1">
                {profile.identity.location}
              </span>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[480px] h-[520px] flex items-center justify-center">

              {/* Deep pulse glow — foundation layer */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.28, 0.12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
                }}
              />

              {/* Outer slow-spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute w-[462px] h-[462px] rounded-full"
                style={{
                  border: "1px dashed rgba(6,182,212,0.18)",
                }}
              />

              {/* Mid counter-spinning ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[396px] h-[396px] rounded-full"
                style={{
                  border: "1px dashed rgba(59,130,246,0.2)",
                }}
              />

              {/* Solid inner glow ring */}
              <motion.div
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[330px] h-[330px] rounded-full"
                style={{
                  border: "1px solid rgba(6,182,212,0.35)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.12), inset 0 0 20px rgba(6,182,212,0.04)",
                }}
              />

              {/* Orbit dots on outer ring */}
              {[0, 90, 180, 270].map((deg) => (
                <motion.div
                  key={deg}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[462px] h-[462px] rounded-full"
                  style={{ transformOrigin: "center" }}
                >
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translateX(230px) translateY(-50%)`,
                    }}
                  />
                </motion.div>
              ))}

              {/* ── Photo with melt/dissolve mask ── */}
              <div
                className="relative w-[430px] h-[458px]"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 48% 45% at 50% 42%, black 52%, rgba(0,0,0,0.88) 62%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.2) 82%, transparent 92%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 48% 45% at 50% 42%, black 52%, rgba(0,0,0,0.88) 62%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.2) 82%, transparent 92%)",
                }}
              >
                <Image
                  src="/vikash-photo.jpg"
                  alt="Vikash Jaiswal"
                  fill
                  className="object-contain object-top"
                  priority
                />
                {/* Cyan infusion overlay at dissolve edge */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 48% 45% at 50% 42%, transparent 50%, rgba(6,182,212,0.06) 65%, rgba(6,182,212,0.18) 78%, rgba(6,182,212,0.08) 90%)",
                  }}
                />
                {/* Subtle dark vignette bottom for photo-to-black blend */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              {/* ── Floating badge chips ── */}
              {floatingBadges.map(({ label, color, x, y }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                  className={`absolute ${x} ${y} bg-zinc-950/90 border ${colorMap[color]} backdrop-blur-md rounded-lg px-3 py-1.5 text-[11px] font-mono font-semibold shadow-lg`}
                >
                  {label}
                </motion.div>
              ))}

              {/* Corner accent lines */}
              <div className="absolute top-6 right-8 w-6 h-6 border-t border-r border-cyan-500/30" />
              <div className="absolute bottom-6 left-8 w-6 h-6 border-b border-l border-cyan-500/30" />

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
