"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "7", label: "Global Regions" },
  { value: "19+", label: "K8s Clusters" },
  { value: "450+", label: "TV Channels Ops" },
  { value: "11", label: "AI Domain Skills" },
  { value: "8", label: "LLM Providers" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1.5 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
