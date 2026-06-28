import { NextResponse } from "next/server";
import { searchWithFallback, type SearchResult } from "@/lib/bm25";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── LLM call (Gemini Flash free tier — optional) ──────────────────────────────

async function callGemini(systemPrompt: string, userQuestion: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userQuestion }] }],
          generationConfig: { maxOutputTokens: 600, temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  }
}

// ── Template answer (no LLM key required) ─────────────────────────────────────

function buildTemplateAnswer(question: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return `I can speak to: CI/CD pipelines, Terraform & IaC, DevSecOps, Kubernetes platform engineering, AI/GenAI systems (RAG, agents, LLM routing), Observability & SRE, and AWS architecture.

Try: "How do you design a multi-LLM routing system?" or "Tell me about your RAG experience."`;
  }

  const top = results.slice(0, 3);
  const lines: string[] = [];

  for (const { chunk } of top) {
    lines.push(`${chunk.heading}`);
    lines.push("─".repeat(Math.min(chunk.heading.length, 52)));
    lines.push(chunk.body.slice(0, 480).trimEnd() + (chunk.body.length > 480 ? "…" : ""));

    if (chunk.type === "case-study") {
      // Extract result line from case study
      const resultMatch = chunk.body.match(/Result:(.+?)(?:\n|$)/);
      if (resultMatch) {
        lines.push(`\nKey outcome: ${resultMatch[1].trim()}`);
      }
    }

    const tools = chunk.tags
      .filter((t) => /^[A-Z]/.test(t) || ["kubernetes", "terraform", "rag", "faiss", "qdrant", "aws", "eks", "lambda", "argocd"].includes(t.toLowerCase()))
      .slice(0, 6);
    if (tools.length > 0) {
      lines.push(`\nTech: ${tools.join(" · ")}`);
    }

    lines.push("");
  }

  return lines.join("\n").trim();
}

// ── System prompt for LLM mode ─────────────────────────────────────────────────

function buildSystemPrompt(results: SearchResult[]): string {
  const context = results
    .slice(0, 5)
    .map((r) => `## ${r.chunk.heading}\n${r.chunk.body}`)
    .join("\n\n---\n\n");

  return `You are an AI assistant answering questions about Vikash Jaiswal's engineering experience, projects, and technical skills. Answer only based on the provided context. Be concise, direct, and technically accurate. Use bullet points where it improves clarity. End with one line summarising Vikash's impact if relevant. Do not invent facts.

CONTEXT FROM VIKASH'S KNOWLEDGE BASE:
${context}

VIKASH'S PROFILE:
- Lead Platform Engineer & Principal DevOps Architect, 16+ years experience
- 19 Kubernetes clusters, 7 global regions, 100+ CI/CD pipelines, 99.99% uptime
- Projects: AI FORGE (enterprise AI OS), forge-router (multi-LLM engine), AI-ForgeStream (K8s media), EBS auto-resize (serverless automation), ai-router (Node.js LLM routing)`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let question: string;
  try {
    ({ question } = await req.json());
  } catch {
    return NextResponse.json({ answer: "Invalid request." }, { status: 400 });
  }

  if (!question?.trim()) {
    return NextResponse.json({ answer: "Please ask a question." });
  }

  const results = searchWithFallback(question, 5);

  // Try LLM first — falls back to template if no API key or timeout
  const systemPrompt = buildSystemPrompt(results);
  const llmAnswer = await callGemini(systemPrompt, question);

  if (llmAnswer?.trim()) {
    return NextResponse.json({ answer: llmAnswer.trim() });
  }

  // Template fallback — always works
  const answer = buildTemplateAnswer(question, results);
  return NextResponse.json({ answer });
}
