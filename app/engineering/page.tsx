"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  {
    title: "Terraform Plugin Framework",
    slug: "terraform-plugin-framework",
    desc: "Custom providers over gRPC for on-premises infrastructure — no public cloud",
  },
];

export default function Engineering() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-10 transition-colors"
        >
          ← Back to Home
        </Link>

        {/* HEADER — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Engineering Case Studies
          </h1>

          <p className="text-zinc-400 mb-12 max-w-2xl">
            A structured breakdown of real-world DevOps, Cloud, and Platform Engineering scenarios.
          </p>
        </motion.div>

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

        {/* AI ENGINEERING ASSISTANT — heading + chat left, photo right */}
        <div className="mt-20 border-t border-zinc-800 pt-10">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">

            {/* ── Left: heading, description, chat ── */}
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

            {/* ── Right: styled photo panel (mirrors Hero's melt/glow treatment) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block"
            >
              <div className="relative w-[360px] h-[480px] mx-auto flex items-center justify-center">

                {/* Pulse glow */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.26, 0.12] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(6,182,212,0.28) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
                  }}
                />

                {/* Outer slow-spinning dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[346px] h-[346px] rounded-full"
                  style={{ border: "1px dashed rgba(6,182,212,0.18)" }}
                />

                {/* Mid counter-spinning ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[300px] h-[300px] rounded-full"
                  style={{ border: "1px dashed rgba(59,130,246,0.2)" }}
                />

                {/* Photo with melt/dissolve mask */}
                <div
                  className="relative w-[340px] h-[460px]"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 50% 46% at 50% 38%, black 55%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.15) 85%, transparent 94%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 50% 46% at 50% 38%, black 55%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.15) 85%, transparent 94%)",
                  }}
                >
                  <Image
                    src="/vikash-photo-bw.jpg"
                    alt="Vikash Jaiswal"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "40% 20%" }}
                    priority
                  />
                  {/* Cyan infusion overlay at dissolve edge */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 46% at 50% 38%, transparent 50%, rgba(6,182,212,0.06) 65%, rgba(6,182,212,0.16) 78%, rgba(6,182,212,0.08) 90%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}