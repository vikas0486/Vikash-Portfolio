import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";

export async function POST(req: Request) {
  const { question } = await req.json();

  const prompt = `
You are Vikash Jaiswal's Engineering AI Assistant.

You answer ONLY based on his profile and DevOps expertise.

PROFILE:
${JSON.stringify(profile, null, 2)}

USER QUESTION:
${question}

RULES:
- Answer like a Principal DevOps / Platform Engineer
- Use CI/CD, Terraform, Kubernetes, AWS, Observability knowledge
- Provide real-world architecture thinking
- Include examples when needed
- Keep answers interview-ready
`;

  // For now mock response (we will connect LLM next step)
  return NextResponse.json({
    answer: `🧠 Engineering Response:

Based on your question: "${question}"

A production-grade CI/CD system should follow:
- Git-based workflow
- CI via GitHub Actions or Jenkins
- Artifact storage in ECR/S3
- CD via ArgoCD (GitOps)
- Observability via Prometheus + Grafana

Key principle: Everything must be declarative + auditable + rollback-safe.`,
  });
}