"use client";

import { Variants } from "framer-motion";
import { profile } from "@/lib/profile";
import { motion } from "framer-motion";
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

      {/* Glow Effects */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-24">
        <div className="max-w-4xl">

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

          {/* Name (from profile.ts) */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight"
          >
            {profile.identity.name.split(" ")[0]}
            <br />
            <span className="text-zinc-500">
              {profile.identity.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Animated Roles (from profile.ts) */}
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

          {/* Bio (from profile.ts) */}
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
              Lead DevOps Engineer at Devo Technology
            </span>
            , building AI FORGE on AWS Bedrock and driving observability +
            automation at scale.
          </motion.p>

          {/* Location + Availability (from profile.ts) */}
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

          {/* CTA SECTION */}
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

            {/* Primary Action */}
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
              {
                href: "https://github.com/vikas0486",
                Icon: FaGithub,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/linked2vikashjaiswal/",
                Icon: FaLinkedin,
                label: "LinkedIn",
              },
              {
                href: "https://medium.com/@vikash.jaiswal",
                Icon: FaMedium,
                label: "Medium",
              },
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
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}