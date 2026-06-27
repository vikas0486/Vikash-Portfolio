"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LineType = "cmd" | "output" | "success" | "blank" | "muted";

interface Line {
  type: LineType;
  text: string;
  delay?: number;
}

const SCRIPT: Line[] = [
  { type: "cmd",     text: "$ whoami",                                     delay: 400 },
  { type: "output",  text: "Vikash Jaiswal",                                delay: 300 },
  { type: "muted",   text: "Lead DevOps Engineer · Devo Technology",        delay: 200 },
  { type: "blank",   text: "",                                               delay: 300 },
  { type: "cmd",     text: "$ cat profile.json",                            delay: 500 },
  { type: "output",  text: "{",                                              delay: 100 },
  { type: "output",  text: '  "experience"  : "15+ years",',               delay: 80  },
  { type: "output",  text: '  "cloud"       : "AWS · GCP · Azure · IBM",', delay: 80  },
  { type: "output",  text: '  "iac"         : "Terraform · Terragrunt · Ansible",', delay: 80 },
  { type: "output",  text: '  "containers"  : "Kubernetes (19 clusters) · Docker · Helm",', delay: 80 },
  { type: "output",  text: '  "cicd"        : "Jenkins · ArgoCD · GitHub Actions · GitLab",', delay: 80 },
  { type: "output",  text: '  "observability": "Prometheus · Grafana · OpenTelemetry · Dynatrace",', delay: 80 },
  { type: "output",  text: '  "ai"          : "Bedrock · Claude · Gemini · forge-router · MCP",', delay: 80 },
  { type: "output",  text: '  "regions"     : ["EU","US","US3","APAC","SANT","GCP","NCSC"]', delay: 80 },
  { type: "output",  text: "}",                                              delay: 200 },
  { type: "blank",   text: "",                                               delay: 300 },
  { type: "cmd",     text: "$ forge status",                                delay: 500 },
  { type: "success", text: "✓  Antigravity  healthy   priority 0",          delay: 120 },
  { type: "success", text: "✓  Groq         healthy   priority 2",          delay: 120 },
  { type: "success", text: "✓  Claude       healthy   priority 3",          delay: 120 },
  { type: "success", text: "✓  OpenAI       healthy   priority 6",          delay: 120 },
  { type: "success", text: "✓  Ollama       healthy   priority 7",          delay: 120 },
  { type: "blank",   text: "",                                               delay: 300 },
  { type: "cmd",     text: "$ echo $AVAILABILITY",                          delay: 500 },
  { type: "success", text: "OPEN_TO_LEADERSHIP_ROLES=true",                 delay: 300 },
];

const COLOR: Record<LineType, string> = {
  cmd:     "text-green-400",
  output:  "text-zinc-300",
  success: "text-cyan-400",
  blank:   "text-transparent",
  muted:   "text-zinc-500",
};

export default function Terminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= SCRIPT.length) return;
    const delay = SCRIPT[visible]?.delay ?? 200;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-xs text-zinc-600 font-mono">
              vikash@forge ~ zsh
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-7 font-mono text-sm leading-7 min-h-[420px]">
            {SCRIPT.slice(0, visible).map((line, i) => (
              <div key={i} className={COLOR[line.type]}>
                {line.text || " "}
              </div>
            ))}
            {/* Blinking cursor */}
            {visible < SCRIPT.length && (
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse align-middle" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
