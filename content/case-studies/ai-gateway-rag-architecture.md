# AI Gateway & RAG Architecture — Enterprise Knowledge Retrieval Without the Vendor Lock-In or PII Risk

## Problem Statement

Enterprise knowledge lives scattered across Confluence runbooks, GitLab ADRs, Jira resolutions, and tribal memory. Engineers lose real time re-discovering answers that already exist somewhere in that sprawl. Pointing a single LLM vendor directly at that knowledge base raises two separate problems at once: sensitive/confidential queries shouldn't leave the building at all, and a single-vendor integration is both a cost risk and an availability single point of failure.

---

## What Changed

Designed a full enterprise RAG architecture with an AI Gateway governance layer sitting in front of a multi-LLM router (forge-router), rather than a single hardcoded LLM call. This is architecture-and-prototype work — the design target below reflects what the system is built to do, not a claim that every tier is running unattended in a 24/7 production environment today.

---

## Architecture

```
Knowledge Sources (Confluence · GitLab ADRs · Jira · SKILL.md docs)
    |
    v
Ingestion: S3 --> Lambda (semantic chunker, ~200 tokens) --> SQS --> Glue ETL
    |
    v
Embeddings: Amazon Titan / OpenAI / BGE
    |
    v
OpenSearch Vector DB (HNSW index, cosine similarity)  +  DynamoDB (metadata)
    |
    v
Query --> Hybrid Retrieval (BM25 keyword + semantic vector search, RRF fusion)
    |
    v
Cross-Encoder Reranker (top-5)
    |
    v
AI Gateway Governance Layer
    |-- Rate Limiter (token bucket per agent tier)
    |-- Circuit Breaker (CLOSED / OPEN / HALF-OPEN)
    |-- PII Classifier --> confidential queries routed to Ollama (local only)
    |-- Semantic Cache (cosine >= 0.95 returns cached response, skips the LLM call)
    |-- Token Budget Enforcer
    |-- Prompt Injection Detector
    |
    v
Multi-LLM Router (forge-router) --> Claude / Gemini / Groq / OpenAI
    |
    v
Langfuse (LLM tracing) + LLM-as-a-Judge (quality eval) + Grafana (infra metrics)
```

---

## Key Implementations

**Hybrid Retrieval, Not Pure Semantic Search**

- BM25 keyword search and dense vector search run in parallel and get fused (reciprocal rank fusion) rather than relying on embeddings alone — catches exact-match terms (error codes, resource names) that semantic similarity alone tends to miss
- Cross-encoder reranking on the top candidates before anything reaches the LLM context window

**AI Gateway as a Governance Layer, Not Just a Router**

- The gateway sits *between* retrieval and generation: rate limiting, circuit breaking, and a PII classifier all run before a single token reaches an external LLM
- Confidential-classified queries are hard-routed to Ollama (local, on-prem) — they never have the option to reach an external provider, by design, not by convention
- Semantic cache intercepts near-duplicate queries (cosine >= 0.95) and returns the cached answer, cutting both cost and latency for repeat questions

**Multi-LLM Routing Instead of a Single Vendor**

- The gateway hands off generation to forge-router (see the [forge-router](/#projects) project), which health-checks providers and falls back automatically — no single-vendor outage takes the whole system down
- Provider choice is tunable per intent: fast/cheap models for simple lookups, stronger reasoning models reserved for complex synthesis

**Observability as a First-Class Concern**

- Every LLM call is traced through Langfuse (latency, token count, cost)
- An LLM-as-a-Judge pass scores response quality asynchronously, so quality regressions surface without a human reviewing every answer

---

## Status & Honest Scope

This is architecture and design work, prototyped end-to-end rather than battle-tested against months of real production traffic. The individual pieces (hybrid search, AI Gateway governance tiers, multi-LLM routing, Langfuse tracing) are each real and independently working — the RAG pipeline dependencies (chunker, embeddings, OpenSearch) are the design's ingestion side; the gateway governance tiers are documented in the [Production RAG System](/#projects) and forge-router Gateway work. What's not yet claimed: a long-running production deployment with measured recall/precision numbers over live enterprise traffic.

---

## Lessons

- A PII classifier that runs *before* retrieval, not after generation, is the only version of this that's actually safe — "redact the LLM's output" is a much weaker guarantee than "the query never left the building."
- Semantic caching only pays off once you have redundant query traffic — for a rarely-repeated question set, it's dead weight; for an internal support/FAQ use case, it's often the single biggest cost lever.
- Multi-LLM routing turns "which model should power this?" from a one-time architecture decision into a per-request, per-intent choice — that flexibility is the whole point of not hardcoding a vendor.
