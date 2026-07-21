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

// ── Template answer (no LLM key required) ──────────────────────────────────────
//
// Without an LLM, this can't truly synthesize — it's still retrieval underneath.
// But it should read like a direct answer, not a raw dump of ranked chunks:
// one clean paragraph from the single best-matching chunk, with light intent-
// aware sentence extraction for common "where/what/how many" style questions,
// and at most a one-line pointer to a second chunk if it's genuinely relevant.

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z(])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildTemplateAnswer(question: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return `I can speak to: CI/CD pipelines, Terraform & IaC, DevSecOps, Kubernetes platform engineering, AI/GenAI systems (RAG, agents, LLM routing), Observability & SRE, and AWS architecture.

Try: "How do you design a multi-LLM routing system?" or "Tell me about your RAG experience."`;
  }

  const q = question.toLowerCase();
  const top = results[0].chunk;
  const sentences = splitSentences(top.body);

  // Intent-aware extraction: if the question is asking about current role/company/
  // location, prefer whichever sentence actually contains that fact over just
  // taking the chunk's opening sentences.
  const intents: { pattern: RegExp; keywords: RegExp }[] = [
    { pattern: /where.*(work|works|working|employ)|current(ly)?\s*(role|company|job|employ)/, keywords: /currently.*(consultant|hitachi)|hitachi group/i },
    { pattern: /where.*(live|located|based)/, keywords: /based in/i },
    { pattern: /how many years|years of experience|how long/, keywords: /\d+\+?\s*years/i },
    { pattern: /flagship|main project|best project/, keywords: /flagship/i },
    { pattern: /contact|email|reach (him|you)|hire/, keywords: /contact|email|linkedin/i },
  ];

  for (const { pattern, keywords } of intents) {
    if (pattern.test(q)) {
      const hit = sentences.find((s) => keywords.test(s));
      if (hit) {
        return hit;
      }
    }
  }

  // Default: lead with the top chunk's most relevant sentences as one coherent
  // paragraph, not a raw dump with headings/dividers/tag lists.
  let answer = sentences.slice(0, 3).join(" ");
  if (answer.length > 550) {
    answer = answer.slice(0, 550).trimEnd() + "…";
  }

  // Case studies often end with a quantified result — surface it if it wasn't
  // already included in the first 3 sentences.
  if (top.type === "case-study") {
    const resultMatch = top.body.match(/Result:?\s*(.+?)(?:\n|$)/i);
    if (resultMatch && !answer.includes(resultMatch[1].slice(0, 30))) {
      answer += `\n\nResult: ${resultMatch[1].trim()}`;
    }
  }

  // A second chunk is only worth mentioning if it's meaningfully close in
  // relevance — otherwise it's noise, not signal.
  const second = results[1];
  if (second && second.score > results[0].score * 0.65 && second.chunk.id !== top.id) {
    answer += `\n\nAlso relevant: ${second.chunk.heading}`;
  }

  return answer;
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
