"use client";

import { motion } from "framer-motion";
import EngineeringChat from "@/components/EngineeringChat";
import Link from "next/link";

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

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Engineering Case Studies
        </motion.h1>

        <p className="text-zinc-400 mb-12 max-w-2xl">
          A structured breakdown of real-world DevOps, Cloud, and Platform Engineering scenarios.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {sections.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
      </div>
    </section>
  );
}