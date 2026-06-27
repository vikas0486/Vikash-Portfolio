import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPICS: {
  key: keyof typeof profile.knowledgeAreas;
  label: string;
  keywords: string[];
  tools: string[];
  principles: string[];
}[] = [
  {
    key: "cicd",
    label: "CI/CD & Pipeline Architecture",
    keywords: ["ci", "cd", "cicd", "pipeline", "jenkins", "github actions", "deploy", "rollback", "artifact", "build", "release", "workflow"],
    tools: ["GitHub Actions", "Jenkins", "ArgoCD", "ECR", "S3", "Docker"],
    principles: [
      "Branch protection with PR-based merge gates",
      "Multi-stage pipelines: lint → test → SAST → build → deploy",
      "Artifact versioning in ECR / S3 with immutable tags",
      "GitOps deployment via ArgoCD with automatic sync",
      "Rollback strategy using Helm revision history",
    ],
  },
  {
    key: "terraform",
    label: "Terraform & Infrastructure as Code",
    keywords: ["terraform", "iac", "infrastructure", "state", "module", "remote state", "locking", "workspace", "provider", "resource", "tfstate"],
    tools: ["Terraform", "S3 (remote state)", "DynamoDB (locking)", "Terragrunt", "AWS Provider"],
    principles: [
      "Remote state in S3 with DynamoDB locking per environment",
      "Module-based structure: network / compute / security / observability",
      "Separate workspaces for dev / staging / prod",
      "Pin provider and module versions for reproducibility",
      "Drift detection via scheduled terraform plan in CI",
    ],
  },
  {
    key: "devsecops",
    label: "DevSecOps & Security Engineering",
    keywords: ["security", "devsecops", "sast", "dast", "secret", "iam", "compliance", "vulnerability", "scan", "policy", "rbac", "least privilege"],
    tools: ["Trivy", "Checkov", "AWS IAM", "Secrets Manager", "OPA / Rego", "SonarQube"],
    principles: [
      "Shift-left: SAST and dependency scanning in every PR",
      "Secrets never in code — use AWS Secrets Manager + external-secrets operator",
      "IAM least-privilege: roles scoped per service, no wildcard policies",
      "Container image scanning before ECR push",
      "OPA / Rego policies for Kubernetes admission control",
    ],
  },
  {
    key: "observability",
    label: "Observability & SRE",
    keywords: ["observability", "prometheus", "grafana", "monitoring", "alert", "log", "metric", "trace", "sre", "slo", "sla", "opentelemetry", "dynatrace", "uptime", "incident"],
    tools: ["Prometheus", "Grafana", "OpenTelemetry", "Dynatrace", "Loki", "Tempo"],
    principles: [
      "Three pillars: metrics (Prometheus), logs (Loki), traces (Tempo / OTEL)",
      "SLO-based alerting — alert on burn rate, not raw thresholds",
      "Dashboards as code: Grafana provisioning via ConfigMaps",
      "Distributed tracing with OpenTelemetry SDK across all services",
      "Runbooks linked directly from alert annotations",
    ],
  },
  {
    key: "ai",
    label: "AI / GenAI Platform Engineering",
    keywords: ["ai", "llm", "rag", "genai", "bedrock", "agent", "embedding", "vector", "prompt", "langchain", "model", "inference", "ml", "mlops"],
    tools: ["AWS Bedrock", "LangChain", "OpenAI", "Pinecone / pgvector", "Ray Serve"],
    principles: [
      "RAG pipeline: chunk → embed → store in vector DB → retrieve → generate",
      "LLM routing: fast model for triage, capable model for deep reasoning",
      "Observability on LLM calls: latency, token usage, failure rate",
      "Prompt versioning and A/B testing in production",
      "AI agents with tool-use for DevOps automation (infra queries, alerts)",
    ],
  },
];

function matchTopic(question: string) {
  const q = question.toLowerCase();
  let best: (typeof TOPICS)[0] | null = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    const score = topic.keywords.filter((kw) => q.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }
  return best;
}

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question?.trim()) {
    return NextResponse.json({ answer: "Please ask a question." });
  }

  const topic = matchTopic(question);

  if (!topic) {
    return NextResponse.json({
      answer: `Hi, I'm ${profile.identity.name} — ${profile.identity.title}.

I can answer questions on:
  · CI/CD & pipelines
  · Terraform & infrastructure design
  · DevSecOps & security engineering
  · Observability, SRE & monitoring
  · AI / GenAI platform engineering

Try asking something like "How do you design a CI/CD pipeline?" or "Explain Terraform state management."`,
    });
  }

  const knowledgeBase = profile.knowledgeAreas[topic.key];

  const answer = `${profile.identity.name} on ${topic.label}
${"─".repeat(48)}

${knowledgeBase}

TOOLS I USE
${topic.tools.map((t) => `  · ${t}`).join("\n")}

KEY PRINCIPLES
${topic.principles.map((p) => `  ✔ ${p}`).join("\n")}

IMPACT AT SCALE
  · ${profile.impact.clusters} Kubernetes clusters across ${profile.impact.regions} regions
  · ${profile.impact.pipelines}+ pipelines managed · ${profile.impact.uptime} uptime SLA

─────────────────────────────────────────────────
Have a deeper question? → vikashjaiswal.486@gmail.com`;

  return NextResponse.json({ answer });
}
