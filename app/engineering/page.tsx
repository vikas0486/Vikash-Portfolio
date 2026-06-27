"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// ✅ Lazy load AI Chat (IMPORTANT for performance + avoids build stress)
const EngineeringChat = dynamic(
  () => import("@/components/EngineeringChat"),
  { ssr: false }
);

const sections = [
  {
    title: "CI/CD Architecture",
    slug: "cicd",
    desc: "Jenkins vs GitHub Actions, pipelines, rollback strategies",
  },
  {
    title: "Terraform State Management",
    slug: "terraform-state",
    desc: "Remote state, locking, multi-env infra design",
  },
  {
    title: "DevSecOps Implementation",
    slug: "devsecops",
    desc: "SAST, DAST, secrets management, IAM security patterns",
  },
  {
    title: "Observability Stack",
    slug: "observability",
    desc: "Prometheus, Grafana, OpenTelemetry pipelines",
  },
];

export default function Engineering() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-white">
            Engineering Case Studies
          </h1>

          <p className="text-zinc-400 mb-12 max-w-2xl">
            A structured breakdown of real-world DevOps, Cloud, and Platform Engineering scenarios.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 border border-zinc-800 rounded-xl hover:border-cyan-500 transition"
            >
              <h2 className="text-xl font-semibold text-cyan-400">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2">{item.desc}</p>

              <Link
                href={`/engineering/${item.slug}`}
                className="inline-block mt-4 text-sm text-white border border-zinc-700 px-4 py-2 rounded-lg hover:border-cyan-500 transition"
              >
                Open Case Study →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* AI ENGINEERING ASSISTANT */}
        <div className="mt-20 border-t border-zinc-800 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              🧠 Ask Vikash Architecture
            </h2>

            <p className="text-zinc-500 mb-6">
              Ask real DevOps / Cloud / System Design questions. Built on my engineering experience.
            </p>

            {/* Lazy loaded = prevents build + hydration load spike */}
            <EngineeringChat />
          </motion.div>
        </div>

      </div>
    </section>
  );
}