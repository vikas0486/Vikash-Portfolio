"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";

const CATEGORY_LABELS: Record<string, string> = {
  cloud: "Cloud",
  infra: "Infrastructure",
  cicd: "CI / CD",
  observability: "Observability",
  security: "Security",
  ai: "AI / GenAI",
};

const CATEGORY_COLORS: Record<string, string> = {
  cloud: "border-orange-700 text-orange-300 bg-orange-900/20",
  infra: "border-cyan-700 text-cyan-300 bg-cyan-900/20",
  cicd: "border-blue-700 text-blue-300 bg-blue-900/20",
  observability: "border-yellow-700 text-yellow-300 bg-yellow-900/20",
  security: "border-red-700 text-red-300 bg-red-900/20",
  ai: "border-purple-700 text-purple-300 bg-purple-900/20",
};

async function downloadReport() {
  const { default: jsPDF } = await import("jspdf");
  const { identity, roles, summary, expertise, skills, knowledgeAreas, impact } = profile;
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 18;   // left margin
  const R = 192;  // right margin (210 - 18)
  const W = R - L;
  let y = 18;

  const rule = () => {
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(L, y, R, y);
    y += 5;
  };

  const thinRule = () => {
    doc.setDrawColor(230);
    doc.setLineWidth(0.2);
    doc.line(L, y, R, y);
    y += 4;
  };

  const sectionLabel = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(140);
    doc.text(text.toUpperCase(), L, y);
    y += 5;
  };

  const bodyText = (text: string, color = 60) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, W) as string[];
    doc.text(lines, L, y);
    y += lines.length * 5 + 1;
  };

  const rowLine = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(100);
    doc.text(label, L, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50);
    const valueLines = doc.splitTextToSize(value, W - 44) as string[];
    doc.text(valueLines, L + 44, y);
    y += Math.max(valueLines.length * 4.5, 5) + 1;
  };

  const tagLine = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70);
    const line = items.join("   ·   ");
    const wrapped = doc.splitTextToSize(line, W) as string[];
    doc.text(wrapped, L, y);
    y += wrapped.length * 4.8 + 2;
  };

  // ── Header ──────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160);
  doc.text(`TECHNICAL CAPABILITY REPORT  ·  ${date}`, L, y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(10);
  doc.text(identity.name.toUpperCase(), L, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(`${roles.slice(0, 3).join("  ·  ")}`, L, y);
  y += 5;
  doc.text(`${identity.location}  ·  ${identity.availability}`, L, y);
  y += 7;

  rule();

  // ── Summary ─────────────────────────────────────────
  sectionLabel("Professional Summary");
  bodyText(summary);
  y += 1;
  thinRule();

  // ── Roles ────────────────────────────────────────────
  sectionLabel("Core Roles");
  tagLine(roles);
  y += 1;

  rule();

  // ── Expertise ────────────────────────────────────────
  sectionLabel("Technical Expertise");
  for (const [cat, tools] of Object.entries(expertise)) {
    rowLine(CATEGORY_LABELS[cat] ?? cat, (tools as string[]).join("  ·  "));
  }
  y += 1;
  thinRule();

  // ── Competencies ─────────────────────────────────────
  sectionLabel("Platform Competencies");
  tagLine(skills);
  y += 1;

  rule();

  // ── Delivery Capability ──────────────────────────────
  sectionLabel("Delivery Capability");
  const capabilities: [string, string][] = [
    ["CI/CD & Pipelines", knowledgeAreas.cicd],
    ["Infrastructure as Code", knowledgeAreas.terraform],
    ["DevSecOps", knowledgeAreas.devsecops],
    ["Observability & SRE", knowledgeAreas.observability],
    ["AI / GenAI Engineering", knowledgeAreas.ai],
  ];
  for (const [label, desc] of capabilities) {
    rowLine(label, desc);
  }
  y += 1;

  rule();

  // ── Impact ───────────────────────────────────────────
  sectionLabel("Impact at Scale");
  const metrics = [
    `${impact.clusters} Kubernetes Clusters`,
    `${impact.regions} Global Regions`,
    `${impact.pipelines}+ Pipelines`,
    `${impact.uptime} Uptime SLA`,
  ];
  tagLine(metrics);

  rule();

  // ── Footer ───────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160);
  doc.text(
    `vikashjaiswal.486@gmail.com  ·  github.com/vikas0486  ·  ${identity.location}`,
    105,
    y,
    { align: "center" }
  );

  doc.save("Vikash-Jaiswal-Capability-Report.pdf");
}

export default function SkillSnapshot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-300 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-sm"
      >
        Stack Snapshot
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    Technical Capability Report
                  </p>
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    {profile.identity.name.toUpperCase()}
                  </h2>
                  <p className="text-cyan-400 text-sm mt-0.5">
                    {profile.identity.title} · {profile.identity.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Summary */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l-2 border-cyan-800 pl-4">
                {profile.summary}
              </p>

              {/* Expertise by category */}
              <div className="space-y-5 mb-8">
                {Object.entries(profile.expertise).map(([cat, tools]) => (
                  <div key={cat}>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(tools as string[]).map((tool) => (
                        <span
                          key={tool}
                          className={`text-xs px-3 py-1 rounded-full border font-medium ${CATEGORY_COLORS[cat]}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform competencies */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Platform Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full border border-zinc-600 text-zinc-300 bg-zinc-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact metrics */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Clusters", value: profile.impact.clusters },
                  { label: "Regions", value: profile.impact.regions },
                  { label: "Pipelines", value: `${profile.impact.pipelines}+` },
                  { label: "Uptime", value: profile.impact.uptime },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center"
                  >
                    <p className="text-xl font-bold text-cyan-400">{value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Roles */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 bg-zinc-900"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={downloadReport}
                  className="flex-1 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors"
                >
                  Download Capability Report
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
