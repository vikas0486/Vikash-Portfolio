export const profile = {
  identity: {
    name: "Vikash Jaiswal",
    title: "Lead Platform Engineer",
    location: "Noida / Gurgaon, India",
    availability: "Open to Network",
  },

  roles: [
    "Lead Platform Engineer",
    "Principal DevOps Engineer",
    "AWS Cloud Architect",
    "Site Reliability Engineer",
    "AI Systems Builder",
  ],

  summary:
    "I design and operate enterprise-scale cloud and AI platforms using Kubernetes, Terraform, and GenAI systems across multi-region AWS environments. Focused on reliability, automation, and AI-driven platform engineering.",

  // =========================
  // CORE SKILLS (UI + AI)
  // =========================
  skills: [
    "Kubernetes",
    "Terraform",
    "AWS",
    "CI/CD",
    "DevSecOps",
    "Observability",
    "System Design",
    "Platform Engineering",
    "SRE",
    "GenAI Systems",
    "RAG Architectures",
  ],

  // =========================
  // STRUCTURED EXPERTISE (RAG CORE)
  // =========================
  expertise: {
    cloud: ["AWS"],
    infra: ["Kubernetes", "Terraform", "Helm", "ArgoCD"],
    cicd: ["GitHub Actions", "Jenkins"],
    observability: ["Prometheus", "Grafana", "Dynatrace", "OpenTelemetry"],
    security: ["IAM", "Secrets Management", "DevSecOps Practices"],
    ai: ["AWS Bedrock", "LLMs", "AI Agents", "RAG Systems"],
  },

  // =========================
  // IMPACT METRICS
  // =========================
  impact: {
    clusters: 19,
    regions: 7,
    pipelines: 100,
    uptime: "99.99%",
  },

  // =========================
  // TAGS (FOR FILTERING + RAG SEARCH)
  // =========================
  tags: [
    "devops",
    "platform-engineering",
    "cloud-architecture",
    "ai-systems",
    "kubernetes",
    "terraform",
    "observability",
  ],

  // =========================
  // KNOWLEDGE BASE (RAG READY CHUNKS)
  // =========================
  knowledgeAreas: {
    cicd:
      "Design scalable CI/CD pipelines using GitHub Actions and Jenkins with automated testing, security gates, artifact management, and rollback strategies.",

    terraform:
      "Implement Infrastructure as Code using Terraform modules, remote state management, state locking, and multi-environment deployment strategies.",

    devsecops:
      "Embed security into pipelines using SAST, DAST, dependency scanning, secrets management, IAM policies, and compliance automation.",

    observability:
      "Build observability systems using Prometheus, Grafana, OpenTelemetry, logs, metrics, and distributed tracing for cloud-native systems.",

    ai:
      "Design AI-powered engineering systems using LLMs, embeddings, RAG pipelines, and knowledge-driven assistants for DevOps automation.",
  },
};