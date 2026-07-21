"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    tag: "Featured Project",
    name: "AI FORGE",
    subtitle: "Enterprise AI Agent Operating System",
    description:
      "An enterprise-grade AI operational platform that transforms Claude (via AWS Bedrock) into a domain-expert platform engineer. 11 modular skill packs covering every engineering domain — from Maqui LINQ and Kubernetes to Vault secrets and Jenkins CI/CD. Persistent cross-session memory, vault-grade zero-secret architecture, and structural deny-list safety across 7 global regions.",
    impact: [
      "~60% reduction in troubleshooting ramp-up time for engineers",
      "19+ Kubernetes clusters managed across 7 global regions",
      "11 domain Brain Packs — Maqui, K8s, Vault, Jenkins, Jira, MySQL",
      "Zero-secret architecture: credentials never enter AI context",
      "Structural deny-list blocks destructive ops at shell level",
    ],
    tech: [
      "Claude Code",
      "AWS Bedrock",
      "Sonnet 4.6",
      "Python",
      "Kubernetes",
      "Vault/OpenBao",
      "Terraform",
      "Jenkins",
      "Prometheus",
      "MCP-aligned",
    ],
    github: "https://github.com/vikas0486/AI-Forge",
    color: "cyan",
  },
  {
    tag: "Open Source",
    name: "forge-router",
    subtitle: "Multi-LLM AI Gateway & Router",
    description:
      "A production-ready multi-LLM routing engine built in Python. Implements a priority-sorted provider chain across 8 AI providers with health-check-first routing, automatic fallback, and an interactive TUI. Routes queries to the optimal available model — Groq for speed, Claude for reasoning, Ollama for data-sensitive on-premise workloads. Serves as the AI Gateway layer for AI FORGE.",
    impact: [
      "8 provider adapters: Antigravity, Gemini, Groq, Claude, Codex, Copilot, OpenAI, Ollama",
      "Health-check-first routing with automatic fallback chain",
      "Near-zero latency provider selection via priority sorting",
      "Vision/multimodal support with base64 image attachment",
      "forge doctor: full environment and API key diagnostics",
    ],
    tech: [
      "Python 3.13",
      "AsyncIO",
      "Groq",
      "Anthropic API",
      "Gemini",
      "OpenAI",
      "Ollama",
      "Rich TUI",
      "uv",
    ],
    github: "https://github.com/vikas0486/forge-router",
    color: "blue",
  },
  {
    tag: "Architecture",
    name: "Production RAG System",
    subtitle: "Enterprise Knowledge Retrieval Platform",
    description:
      "Designed a full enterprise RAG architecture: knowledge ingestion (S3 → Lambda → SQS → Glue → DynamoDB), embedding pipelines (Amazon Titan, OpenAI, BGE), OpenSearch Vector DB with HNSW indexing, Hybrid Search (BM25 + semantic), cross-encoder reranking, and an AI Gateway with token governance and PII redaction. LLM observability via Langfuse + Grafana.",
    impact: [
      "Hybrid BM25 + semantic search via OpenSearch Vector DB",
      "Multi-LLM Router: Claude · Gemini · OpenAI · Groq",
      "AI Gateway: AuthN/AuthZ, PII redaction, prompt guardrails",
      "LLM-as-a-Judge quality evaluation pipeline",
      "Langfuse observability + OpenTelemetry traces",
    ],
    tech: [
      "OpenSearch",
      "Amazon Titan",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Langfuse",
      "AWS Lambda",
      "DynamoDB",
      "Python",
      "Qdrant",
    ],
    github: "https://github.com/vikas0486",
    color: "violet",
  },
  {
    tag: "Infrastructure",
    name: "EBS Auto-Remediation Platform",
    subtitle: "Zero-Touch Storage Automation @ Devo",
    description:
      "Eliminated on-call engineer involvement for EBS storage capacity events at Devo. CloudWatch threshold breach triggers SNS → API Gateway → Lambda, which validates the alarm, identifies the volume, expands EBS, resizes XFS, and posts a Slack confirmation. Reduced response time from 30–60 minutes of manual work to 3 minutes of fully automated execution.",
    impact: [
      "30–60 min manual on-call response → 3 min zero-touch automation",
      "100% elimination of engineer involvement for storage events",
      "Event-driven: CloudWatch → SNS → API Gateway → Lambda",
      "Established pattern for all infra auto-remediation at Devo",
      "Slack-integrated: engineers notified after resolution",
    ],
    tech: [
      "AWS Lambda",
      "CloudWatch",
      "SNS",
      "API Gateway",
      "EBS",
      "Python",
      "Boto3",
      "Slack API",
    ],
    github: "https://github.com/vikas0486",
    color: "emerald",
  },
  {
    tag: "SRE Platform",
    name: "forge-SRE",
    subtitle: "Production Observability & SRE Governance",
    description:
      "A full SRE governance audit discovered 21/24 deviation score across 6 domains — fragmented tooling, zero distributed tracing, no SLO framework, and AI workloads running completely blind. Built a centralised observability stack: OTel Collector DaemonSet across 19 EKS clusters, SLO burn-rate alerting replacing 200+/day threshold noise, DORA metrics automated in real-time, and full LLM instrumentation for AI workloads.",
    impact: [
      "Alert volume: 200+/day noise → 12/day (all actionable)",
      "MTTR: 4.5 hours → 38 minutes",
      "99.99% uptime SLA maintained for 18 consecutive months",
      "DORA metrics: manual monthly estimate → real-time Grafana",
      "AI workloads: 0% → 100% per-call telemetry (TTFT · tokens · cost)",
    ],
    tech: [
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Loki",
      "Tempo",
      "Alertmanager",
      "PagerDuty",
      "Terraform",
      "Helm",
      "AWS EKS",
    ],
    github: "https://github.com/vikas0486/forge-SRE",
    color: "orange",
  },
  {
    tag: "ML Infrastructure",
    name: "AI-ForgeStream",
    subtitle: "Kubernetes-Native Media Processing Pipeline",
    description:
      "Replaced long-lived, idle EC2 instances with ephemeral Kubernetes Jobs spawned on demand by a FastAPI control plane. Two-pass FFmpeg loudness normalisation (EBU R128 / ITU-R BS.1770-4) enforced on every output. ABR ladder encoding (1080p · 720p · 480p) to HLS with structured telemetry per job. Pay only for compute during actual job execution — zero idle cost.",
    impact: [
      "Idle compute: 100% always-on EC2 → 0% (pods terminate on completion)",
      "Loudness: variable manual → ITU-R BS.1770-4 compliant every output",
      "Job trigger: SSH manual → REST API (POST /jobs/submit)",
      "Parallel capacity: 1 EC2 → Kubernetes horizontal scheduler",
      "Full job telemetry: metrics.json per transcode (LUFS · peak · timing)",
    ],
    tech: [
      "Kubernetes Jobs",
      "FastAPI",
      "FFmpeg",
      "Python",
      "HLS / ABR",
      "Docker",
      "Terraform",
      "PVC / EFS",
      "RBAC",
    ],
    github: "https://github.com/vikas0486/AI-ForgeStream",
    color: "rose",
  },
  {
    tag: "Freelance Engagement",
    name: "Saturs File Portal & Archive System",
    subtitle: "AWS Cost & Reliability Overhaul",
    description:
      "Migrated a business-critical file-drop web server from an oversized 1000GB EC2 instance to a right-sized instance with a new S3 Intelligent-Tiering archive layer, so aged data offloads automatically instead of growing the local disk forever. Replaced a broken third-party FTP-sync tool with a custom Python pipeline that auto-extracts PDFs from zip-only feeds, merges multi-part zips into a single correctly-named PDF, and gates downloads on file-size stability to avoid ingesting partial writes.",
    impact: [
      "Infrastructure cost cut ~86.5% via right-sized EC2 + S3 Intelligent-Tiering",
      "Replaced a buggy third-party sync tool with a custom 5-min cron pipeline",
      "Auto-extracts and merges PDFs from zip-only source feeds (~97 feed codes)",
      "Size-stability gate + 5-retry give-up logic eliminate corrupt/partial ingests",
      "Transparent S3 archive access via 404-fallback CGI — zero change to URLs",
    ],
    tech: [
      "AWS EC2",
      "Amazon S3",
      "S3 Intelligent-Tiering",
      "IAM",
      "Python",
      "Apache / CGI",
      "Cron",
      "pypdf",
      "Cost Explorer",
    ],
    github: "https://github.com/vikas0486",
    color: "amber",
  },
];

const ACCENT: Record<string, string> = {
  cyan:   "border-cyan-500/30 hover:border-cyan-500/60",
  blue:   "border-blue-500/30 hover:border-blue-500/60",
  violet: "border-violet-500/30 hover:border-violet-500/60",
  emerald:"border-emerald-500/30 hover:border-emerald-500/60",
  orange: "border-orange-500/30 hover:border-orange-500/60",
  rose:   "border-rose-500/30 hover:border-rose-500/60",
  amber:  "border-amber-500/30 hover:border-amber-500/60",
};

const TAG_COLOR: Record<string, string> = {
  cyan:   "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  blue:   "text-blue-400 bg-blue-400/10 border-blue-400/20",
  violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  emerald:"text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  rose:   "text-rose-400 bg-rose-400/10 border-rose-400/20",
  amber:  "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const DOT_COLOR: Record<string, string> = {
  cyan:   "bg-cyan-400",
  blue:   "bg-blue-400",
  violet: "bg-violet-400",
  emerald:"bg-emerald-400",
  orange: "bg-orange-400",
  rose:   "bg-rose-400",
  amber:  "bg-amber-400",
};

export default function Projects() {
  return (
    <section id="projects" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I&apos;ve Built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Projects & Platforms
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Production systems, open-source tools, and architecture initiatives — each solving
            a real enterprise problem.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative bg-zinc-900/50 border rounded-2xl p-7 transition-all duration-300 ${ACCENT[p.color]}`}
            >
              {/* Tag */}
              <span
                className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border mb-5 ${TAG_COLOR[p.color]}`}
              >
                {p.tag}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-1">{p.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{p.subtitle}</p>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {p.description}
              </p>

              {/* Impact bullets */}
              <ul className="space-y-2 mb-6">
                {p.impact.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_COLOR[p.color]}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <ExternalLink size={14} />
                  Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
