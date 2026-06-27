"use client";

import { motion } from "framer-motion";
import EngineeringChat from "@/components/EngineeringChat";

const sections = [
  {
    title: "CI/CD Architecture",
    desc: "Jenkins vs GitHub Actions, pipelines, rollback strategies",
    slug: "cicd",
  },
  {
    title: "Terraform & State Management",
    desc: "Remote state, locking, multi-env infrastructure design",
    slug: "terraform-state",
  },
  {
    title: "DevSecOps Implementation",
    desc: "SAST, DAST, secrets management, IAM security patterns",
    slug: "devsecops",
  },
  {
    title: "Observability Stack",
    desc: "Prometheus, Grafana, OpenTelemetry pipelines",
    slug: "observability",
  },
  {
    title: "Real Interview Scenarios",
    desc: "System design + DevOps problem-solving questions",
    slug: "interview-scenarios",
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

        <p className="text-zinc-400 mb-12 max-w-3xl">
          Real-world DevOps, Cloud, Platform Engineering, Terraform, Kubernetes,
          and CI/CD scenarios based on production experience, architecture
          decisions, and modern engineering practices.
        </p>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((item, index) => (
            <motion.a
              key={item.title}
              href={`/engineering/${item.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="
                block
                p-6
                border
                border-zinc-800
                rounded-xl
                bg-zinc-950
                hover:border-cyan-500
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <h2 className="text-xl font-semibold text-cyan-400">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2">{item.desc}</p>

              <div className="mt-4 text-sm text-white">
                Open Case Study →
              </div>
            </motion.a>
          ))}
        </div>

        {/* AI Engineering Assistant */}
        <EngineeringChat />
      </div>
    </section>
  );
}