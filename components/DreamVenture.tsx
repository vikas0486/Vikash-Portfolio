"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PILLARS = ["Safe", "Smart", "Automate", "Secure"];

export default function DreamVenture() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Beyond the Day Job
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Dream: AI Forge Solutions LLP
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/40 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 transition-colors duration-300"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-zinc-700 shadow-lg shadow-cyan-900/20">
            <Image
              src="/ai-forge-solutions-logo.jpg"
              alt="AI Forge Solutions LLP"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <span className="inline-flex items-center text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-4">
              Build · Automate · Intelligently
            </span>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
              Alongside the day job, I run <span className="text-white font-semibold">AI Forge Solutions LLP</span> —
              my own venture for AI-driven automation, DevOps consulting, and infrastructure engagements.
              It&apos;s where ideas like this portfolio&apos;s AI FORGE platform get pointed at real client
              problems — including the <a href="/projects" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Saturs AWS cost-optimization engagement</a> featured
              in my projects. Still early — but it&apos;s the direction everything here is building toward.
            </p>

            <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
              {PILLARS.map((p) => (
                <span
                  key={p}
                  className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 rounded-md"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
