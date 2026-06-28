"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIAGRAMS = [
  {
    label: "CI/CD Pipeline",
    chart: `flowchart LR
  Dev([Developer]) --> PR[Pull Request]
  PR --> GHA[GitHub Actions]
  GHA --> SAST[SAST Scan]
  GHA --> Tests[Unit Tests]
  SAST --> Build[Docker Build]
  Tests --> Build
  Build --> ECR[(ECR Registry)]
  ECR --> Argo[ArgoCD Sync]
  Argo --> K8s[Kubernetes]`,
  },
  {
    label: "Kubernetes Platform",
    chart: `flowchart TD
  LB[AWS ALB] --> Ingress[Nginx Ingress]
  Ingress --> SvcA[Service A]
  Ingress --> SvcB[Service B]
  SvcA --> PodA1[Pod] & PodA2[Pod]
  SvcB --> PodB1[Pod] & PodB2[Pod]
  PodA1 & PodA2 --> DB[(RDS Aurora)]
  PodB1 & PodB2 --> Cache[(ElastiCache)]`,
  },
  {
    label: "Terraform State",
    chart: `flowchart LR
  Eng([Engineer]) --> Plan[terraform plan]
  Plan --> Lock[DynamoDB Lock]
  Lock --> State[(S3 Remote State)]
  Plan --> Apply[terraform apply]
  Apply --> VPC[VPC / Subnets]
  Apply --> EKS[EKS Cluster]
  Apply --> RDS[RDS / ElastiCache]`,
  },
  {
    label: "SRE Observability",
    chart: `flowchart TD
  subgraph SRC[Telemetry Sources]
    SVC[Platform Services\nOTel SDK]
    AI[AI Workloads\nLLM · tokens · TTFT]
    K8S[Kubernetes\nkubelet · cAdvisor · KSM]
  end
  subgraph COL[OTel Collector — DaemonSet]
    RCV[Receivers\nOTLP gRPC+HTTP · Prometheus scrape · filelog]
    PRC[Processors\nBatch · MemLimit · ResourceDetect · TailSample]
    EXP[Exporters\nPrometheus · Loki · Tempo]
    RCV --> PRC --> EXP
  end
  subgraph STORE[Backends]
    PROM[(Prometheus\n30d metrics)]
    LOKI[(Loki\n31d logs · S3)]
    TEMPO[(Tempo\n7d traces · S3)]
  end
  subgraph VIZ[Grafana — Single Pane]
    SLO[SLO Burn-Rate\nDashboard]
    DORA[DORA Metrics\nlive automated]
    AIDB[AI Workloads\ncost · TTFT · quality]
  end
  subgraph ALERT[SLO Alerting]
    RULER[Prometheus Ruler\nburn-rate rules]
    AM[Alertmanager]
    PD[PagerDuty\nfast-burn · critical]
    SLK[Slack\nslow-burn · warning]
  end
  SRC --> COL
  EXP --> PROM & LOKI & TEMPO
  PROM & LOKI & TEMPO --> VIZ
  PROM --> RULER --> AM --> PD & SLK`,
  },
  {
    label: "AI · Multi-LLM Gateway",
    chart: `flowchart TD
  User([Engineer / Agent]) --> CLI[forge CLI]
  CLI --> RT[RouterEngine\nintent classify · sub-1ms]
  subgraph INTENT[Intent → Provider Chain]
    CHAT[chat 15s\nGroq → Gemini → Claude]
    CODE[code 30s\nCodex → Claude → OpenAI]
    REAS[reasoning 45s\nHermes → Claude → OpenAI]
    AGNT[agentic 60s\nClaude → OpenAI → Hermes]
  end
  RT --> CHAT & CODE & REAS & AGNT
  subgraph GW[AI Gateway — Governance]
    RL[Rate Limiter\ntoken bucket]
    CB[Circuit Breaker\nCLOSED · OPEN · HALF]
    PII[PII Classifier\ndata sovereignty]
    SC[Semantic Cache\ncosine ≥ 0.95]
    RL --> CB --> PII --> SC
  end
  RT --> GW
  PII -- confidential --> OLL[Ollama\nlocal · no egress]
  subgraph KB[RAG Knowledge Base]
    FAISS[(FAISS 768-dim\ncosine · nomic-embed)]
    SQL[(SQLite\ninteractions · memory)]
  end
  RT --> KB
  GW --> OBS[Langfuse · DORA · Audit]`,
  },
  {
    label: "Platform Engineering",
    chart: `flowchart TD
  Dev([Developer]) --> Portal[Internal Dev Portal]
  Portal --> GT[Golden Templates]
  GT --> TFMod[Terraform Modules]
  GT --> CITpl[CI/CD Templates]
  TFMod --> AWS[AWS Infrastructure]
  CITpl --> K8s[Kubernetes Workloads]
  AWS --> K8s`,
  },
];

function MermaidChart({ chart, id }: { chart: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(async (m) => {
      if (cancelled) return;
      m.default.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#18181b",
          primaryColor: "#0e7490",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#0891b2",
          lineColor: "#4b5563",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          edgeLabelBackground: "#18181b",
          nodeTextColor: "#e2e8f0",
        },
      });
      try {
        const { svg } = await m.default.render(`mermaid-${id}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        // ignore render errors silently
      }
    });
    return () => { cancelled = true; };
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
    />
  );
}

export default function InfraArchitecture() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-300 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-sm w-full sm:w-auto"
      >
        Infra Architecture
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    Platform & Infrastructure
                  </p>
                  <h2 className="text-2xl font-bold text-white">
                    Architecture Diagrams
                  </h2>
                  <p className="text-zinc-500 text-sm mt-0.5">
                    Real production patterns from 16+ years of engineering
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

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {DIAGRAMS.map((d, i) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                      active === i
                        ? "bg-cyan-700 text-white"
                        : "border border-zinc-700 text-zinc-400 hover:border-cyan-700 hover:text-zinc-200"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Diagram */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 min-h-[280px] flex items-center justify-center">
                <MermaidChart
                  key={active}
                  chart={DIAGRAMS[active].chart}
                  id={`diag-${active}`}
                />
              </div>

              <p className="text-xs text-zinc-600 text-center mt-4">
                {DIAGRAMS[active].label} — production-grade pattern
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
