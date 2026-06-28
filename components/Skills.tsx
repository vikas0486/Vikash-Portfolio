"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  {
    title: "Cloud Platforms & Services",
    color: "cyan",
    skills: [
      "AWS", "Google Cloud (GCP)", "Microsoft Azure", "IBM Cloud",
      "Amazon EC2", "Amazon EKS", "Amazon S3", "AWS Lambda",
      "AWS CloudWatch", "AWS IAM", "Amazon VPC", "Amazon Route53",
      "Amazon CloudFront", "Amazon RDS", "Amazon DynamoDB",
      "Amazon SNS", "Amazon SQS", "AWS API Gateway",
      "AWS Step Functions", "AWS Secrets Manager", "AWS SSM",
      "AWS Bedrock", "AWS MediaLive", "AWS MediaConnect",
      "AWS MediaPackage", "Azure Virtual Machines",
      "Azure DevOps", "Azure Monitor", "Azure Storage",
      "Azure Networking", "GCP Kubernetes", "FinOps / Cost Optimization",
    ],
  },
  {
    title: "Infrastructure as Code",
    color: "blue",
    skills: [
      "Terraform", "Terragrunt", "Custom Terraform Provider (Plugin SDK)",
      "Terraform Modules", "Policy as Code (PaC)",
      "Infrastructure Automation", "GitOps",
      "Ansible", "Ansible Playbooks", "Ansible Roles",
      "Jinja2 Templates", "Inventory Management",
      "Configuration Drift Management",
      "Infrastructure Standardization",
      "CloudFormation", "Modular Infrastructure Design",
    ],
  },
  {
    title: "Containers & Platform Engineering",
    color: "violet",
    skills: [
      "Kubernetes", "Docker", "Amazon EKS",
      "Red Hat OpenShift", "Helm", "ArgoCD",
      "GitOps", "Blue-Green Deployments", "Canary Releases",
      "Rolling Updates", "Platform Engineering",
      "Internal Developer Platforms (IDP)",
      "DaemonSet / Sidecar Patterns",
      "Kubernetes Jobs (Batch Workloads)",
      "Ephemeral Workload Patterns",
      "K8s RBAC", "K8s Namespaces",
      "Multi-cluster Management",
      "Software-Defined Networking (SDN)",
    ],
  },
  {
    title: "CI/CD & DevOps",
    color: "orange",
    skills: [
      "Jenkins", "Jenkins Groovy Shared Libraries",
      "GitLab CI/CD", "GitHub Actions", "Azure DevOps",
      "ArgoCD", "Release Automation",
      "Deployment Automation", "Pipeline Governance",
      "Deployment Governance", "PR Quality Gates",
      "DORA Metrics", "Deployment Frequency",
      "Lead Time for Changes", "MTTR",
      "Change Failure Rate", "Branch Protection Rules",
      "GitOps Delivery Models",
    ],
  },
  {
    title: "Observability & SRE",
    color: "amber",
    skills: [
      "Prometheus", "Grafana", "OpenTelemetry",
      "Dynatrace", "Datadog", "AWS CloudWatch",
      "ELK Stack", "Elasticsearch", "Kibana",
      "Loki", "Alertmanager", "Tempo",
      "Site Reliability Engineering (SRE)",
      "SLI / SLO / SLA / Error Budgets",
      "SLO Burn-Rate Alerting",
      "Error Budget Engineering",
      "Tail Sampling (Collector-Level)",
      "MTTD / MTTR", "Incident Management",
      "Root Cause Analysis (RCA)",
      "Runbook Automation", "Capacity Planning",
      "Operational Excellence", "On-call Operations",
      "Telemetry Architecture", "OpenTelemetry Collectors",
      "OTel Collector DaemonSet",
      "SRE Governance Audits",
    ],
  },
  {
    title: "AI & GenAI Engineering",
    color: "pink",
    skills: [
      "Claude / Claude Code", "AWS Bedrock",
      "Gemini Enterprise", "Cursor AI",
      "GitHub Copilot", "Codex CLI",
      "Agentic AI Systems", "Multi-Agent Systems",
      "RAG Architectures", "LLMOps",
      "AI Observability", "AI Governance",
      "Model Context Protocol (MCP)",
      "Vector Databases", "OpenSearch Vector DB",
      "Qdrant", "ChromaDB",
      "Prompt Engineering",
      "AI Gateway Design", "Multi-LLM Routing",
      "Langfuse", "LangChain", "LangGraph", "LangSmith",
      "AI Platform Engineering",
      "LLM-as-a-Judge", "Hybrid Search (BM25 + Semantic)",
      "Cross-Encoder Reranking",
      "Embedding Pipelines", "Amazon Titan",
      "forge-router (Multi-LLM Gateway)",
      "forge-kb (Shared Knowledge Base)",
      "AI-assisted Operations (AIOps)",
    ],
  },
  {
    title: "Security & DevSecOps",
    color: "red",
    skills: [
      "HashiCorp Vault", "OpenBao",
      "Secrets Management", "Dynamic Credentials",
      "IAM / RBAC", "Zero-Trust Architecture",
      "DevSecOps", "SAST", "SCA",
      "Container Image Scanning",
      "Secret Scanning", "IaC Security Scanning",
      "SBOM Generation", "Artifact Signing",
      "Mutual TLS (mTLS)", "Network Policy Enforcement",
      "Cloud Governance", "Compliance as Code",
      "Deployment Approval Gates", "GitHub Advanced Security",
    ],
  },
  {
    title: "Programming & Scripting",
    color: "green",
    skills: [
      "Python", "Bash / Shell Scripting",
      "Groovy (Jenkins)", "YAML", "JSON",
      "TypeScript", "SQL",
      "Boto3 (AWS SDK)", "REST API Development",
      "API Integration", "Automation Scripting",
    ],
  },
  {
    title: "Databases & Storage",
    color: "teal",
    skills: [
      "MySQL", "Amazon RDS",
      "Elasticsearch / OpenSearch",
      "Amazon DynamoDB", "Amazon S3",
      "PostgreSQL", "Vector Databases",
      "HNSW Indexing",
    ],
  },
  {
    title: "Media, OTT & Broadcast",
    color: "purple",
    skills: [
      "OTT Platform Engineering",
      "Live Broadcast Operations",
      "AWS MediaLive", "AWS MediaConnect", "AWS MediaPackage",
      "CDN Operations", "Akamai CDN", "AWS CloudFront",
      "HLS / DASH Streaming", "Video Transcoding (FFmpeg)",
      "Adaptive Bitrate (ABR)", "Content Delivery Workflows",
      "EBU R128 Loudness Normalisation",
      "ITU-R BS.1770-4 Compliance",
      "2-Pass FFmpeg Pipeline",
      "VSAT / Satellite Communications",
      "RF Engineering", "Link Budget Calculations",
      "Uplink Services", "Playout Automation",
      "Baseband Hardware", "Harris Automation",
    ],
  },
  {
    title: "Leadership & Architecture",
    color: "slate",
    skills: [
      "Architecture Design", "Technical Strategy",
      "Cross-Functional Leadership",
      "Stakeholder Management",
      "Engineering Mentorship",
      "DevOps Maturity Assessment",
      "DORA Framework", "90-Day Transformation Planning",
      "Architecture Decision Records (ADR)",
      "Technical Documentation", "RFC Writing",
      "Agile / SAFe", "ITIL Foundation",
      "Change Management", "Incident Leadership",
      "FinOps Strategy", "Platform Roadmaps",
      "ServiceNow", "Jira", "Confluence",
    ],
  },
];

const COLOR_MAP: Record<string, { badge: string; heading: string; dot: string }> = {
  cyan:   { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300",   heading: "text-cyan-400",   dot: "bg-cyan-400" },
  blue:   { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-blue-500/50 hover:text-blue-300",   heading: "text-blue-400",   dot: "bg-blue-400" },
  violet: { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-violet-500/50 hover:text-violet-300", heading: "text-violet-400", dot: "bg-violet-400" },
  orange: { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-orange-500/50 hover:text-orange-300", heading: "text-orange-400", dot: "bg-orange-400" },
  amber:  { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-amber-500/50 hover:text-amber-300",  heading: "text-amber-400",  dot: "bg-amber-400" },
  pink:   { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-pink-500/50 hover:text-pink-300",   heading: "text-pink-400",   dot: "bg-pink-400" },
  red:    { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-red-500/50 hover:text-red-300",     heading: "text-red-400",    dot: "bg-red-400" },
  green:  { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-green-500/50 hover:text-green-300", heading: "text-green-400",  dot: "bg-green-400" },
  teal:   { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-teal-500/50 hover:text-teal-300",   heading: "text-teal-400",   dot: "bg-teal-400" },
  purple: { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-purple-500/50 hover:text-purple-300", heading: "text-purple-400", dot: "bg-purple-400" },
  slate:  { badge: "bg-zinc-800/80 border-zinc-700/50 text-zinc-300 hover:border-slate-400/50 hover:text-slate-300",  heading: "text-slate-400",  dot: "bg-slate-400" },
};

export default function Skills() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="skills" className="bg-black py-28 px-6">
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
            Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            15+ years of depth across cloud, infrastructure, DevOps, observability, security,
            and AI engineering — organized by domain. Click any category to expand.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => {
            const c = COLOR_MAP[cat.color];
            const isOpen = expanded === i;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className={`w-full text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 transition-all duration-200 hover:border-zinc-600 ${
                    isOpen ? "border-zinc-600 bg-zinc-900" : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                      <span className={`text-sm font-semibold ${c.heading}`}>
                        {cat.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-600">
                        {cat.skills.length} skills
                      </span>
                      <span className="text-zinc-600 text-lg leading-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Preview badges (always visible) */}
                  {!isOpen && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cat.skills.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="text-xs text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                      {cat.skills.length > 5 && (
                        <span className="text-xs text-zinc-600 px-2 py-0.5">
                          +{cat.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Expanded badges */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-zinc-900/40 border border-t-0 border-zinc-700 rounded-b-2xl px-5 py-5">
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors duration-150 cursor-default ${c.badge}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
