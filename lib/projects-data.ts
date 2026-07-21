export interface Project {
  tag: string;
  name: string;
  subtitle: string;
  description: string;
  impact: string[];
  tech: string[];
  github: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    tag: "Flagship Project",
    name: "forge-router",
    subtitle: "Enterprise AI Gateway & Multi-LLM Router",
    description:
      "A terminal-first multi-LLM orchestration engine, evolving into a self-hosted enterprise AI Gateway (v0.5.1). Routes prompts across 12 providers using intent-based classification with health-check-first automatic fallback. One standout piece of UX: the live preview window needs no manual trigger — the moment a response contains a diagram or image, forge-router detects it and pops the window open on its own. Phase 1 Gateway MVP adds an Anthropic-compatible POST /v1/messages endpoint with SHA-256-hashed virtual keys, per-key model allow-lists, and per-request usage metering — a cost-elimination path that reroutes traffic to free/cheap providers instead of paying per-token, inspired by enterprise gateways like Bifrost. Built entirely on a zero-spend, open-source stack.",
    impact: [
      "12 provider adapters with intent-based routing: Groq, Antigravity, Claude, OpenAI, Cerebras, Mistral, OpenRouter, Copilot, Ollama, and more",
      "Anthropic-compatible /v1/messages Gateway: virtual keys, per-key model allow-lists, per-request metering",
      "Live-verified: gateway → real provider round-trip in 0.33s, bad-key requests correctly rejected (401)",
      "Auto-opening live preview: the moment a response contains a diagram or image, a native macOS window pops up on its own — no manual toggle — rendering Mermaid, Graphviz, PlantUML, D2, or the image directly",
      "FAISS + SQLite RAG memory with auto-consolidation every 10 interactions",
    ],
    tech: [
      "Python 3.13",
      "FastAPI",
      "AsyncIO",
      "Groq",
      "Anthropic API",
      "OpenAI",
      "Ollama",
      "FAISS",
      "Rich TUI",
      "uv",
    ],
    github: "https://github.com/vikas0486/forge-router",
    color: "blue",
  },
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

export const ACCENT: Record<string, string> = {
  cyan:   "border-cyan-500/30 hover:border-cyan-500/60",
  blue:   "border-blue-500/30 hover:border-blue-500/60",
  violet: "border-violet-500/30 hover:border-violet-500/60",
  emerald:"border-emerald-500/30 hover:border-emerald-500/60",
  orange: "border-orange-500/30 hover:border-orange-500/60",
  rose:   "border-rose-500/30 hover:border-rose-500/60",
  amber:  "border-amber-500/30 hover:border-amber-500/60",
};

export const TAG_COLOR: Record<string, string> = {
  cyan:   "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  blue:   "text-blue-400 bg-blue-400/10 border-blue-400/20",
  violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  emerald:"text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  rose:   "text-rose-400 bg-rose-400/10 border-rose-400/20",
  amber:  "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export const DOT_COLOR: Record<string, string> = {
  cyan:   "bg-cyan-400",
  blue:   "bg-blue-400",
  violet: "bg-violet-400",
  emerald:"bg-emerald-400",
  orange: "bg-orange-400",
  rose:   "bg-rose-400",
  amber:  "bg-amber-400",
};
