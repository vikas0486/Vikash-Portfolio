"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import InfraArchitecture from "@/components/InfraArchitecture";

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
  {
    title: "Terraform Plugin Framework",
    slug: "terraform-plugin-framework",
    desc: "Custom providers over gRPC for on-premises infrastructure — no public cloud",
  },
  {
    title: "Kubernetes Platform Engineering",
    slug: "kubernetes-platform-engineering",
    desc: "19 clusters, 7 regions, one GitOps operating model via ArgoCD + Helm",
  },
  {
    title: "AI Gateway & RAG Architecture",
    slug: "ai-gateway-rag-architecture",
    desc: "Hybrid retrieval, PII-aware governance, and multi-LLM routing without vendor lock-in",
  },
  {
    title: "Onboarding Governance & AI-Native DevOps",
    slug: "onboarding-governance-ai-native-devops",
    desc: "Modernizing monolithic DevOps practices with governance-first AI-native process design",
  },
  {
    title: "FinOps & Cloud Cost Optimization",
    slug: "finops-cloud-cost-optimization",
    desc: "Cutting an EC2 bill 86.5% through right-sizing and permanent S3 archiving",
  },
];

export default function Engineering() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-10 transition-colors"
        >
          ← Back to Home
        </Link>

        {/* HEADER + LOGO — left half: heading/desc/Dive Deeper stacked; right half: logo, height-matched */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Engineering Case Studies
              </h1>
              <p className="text-zinc-400 max-w-2xl">
                A structured breakdown of real-world DevOps, Cloud, and Platform Engineering scenarios.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 pt-4 border-t border-zinc-800/60">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                Dive Deeper
              </p>
              <InfraArchitecture />
            </div>
          </motion.div>

          {/* Right: logo only, bigger, height-matched to the left column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="relative w-full h-full min-h-[280px] rounded-3xl overflow-hidden border border-cyan-500/20 shadow-xl shadow-cyan-900/10 bg-black">
              <Image
                src="/engineering-portfolio-logo.jpg"
                alt="Engineering Portfolio Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* GRID — full width */}
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

      </div>
    </section>
  );
}
