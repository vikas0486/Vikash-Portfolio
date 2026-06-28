# Observability Platform — From Alert Noise to SLO-Based Operations

## Problem Statement

The monitoring setup was generating 200+ alerts per day. Most were false positives or threshold-based noise that didn't correlate with user impact.

Engineers had alert fatigue — critical pages were being ignored because they were buried in noise. There was no distributed tracing, so debugging a slow request meant manually correlating logs across 5+ services in 3 different tools. MTTR averaged 4.5 hours.

---

## What Changed

Rebuilt the entire observability stack on open standards — OpenTelemetry, Prometheus, Grafana, Loki, Tempo. Converted all alerting from threshold-based to SLO burn-rate-based. Added distributed tracing and LLM-specific observability for AI workloads.

---

## Architecture

```
Services (instrumented with OpenTelemetry SDK)
    |
    |-- Metrics -------> OTel Collector --> Prometheus --> Grafana (SLO dashboards)
    |
    |-- Logs ----------> OTel Collector --> Loki -------> Grafana (correlated view)
    |
    +-- Traces --------> OTel Collector --> Tempo ------> Grafana (trace explorer)

                 SLO Burn-Rate Alerts (not threshold)
                     |
                     v
                 Alertmanager --> PagerDuty (fast-burn) / Slack (slow-burn)

LLM Workloads:
    +-- Langfuse ------> Token usage · Latency · Quality scores
```

---

## Key Implementations

**SLO-Based Alerting**

- Defined SLOs for every critical service: availability (99.9%) and latency p99 (<500ms)

- Converted all alerts to burn-rate-based: only fires when the SLO error budget is burning at an unsustainable rate

- Multi-window rules: fast-burn (1h window, 14× rate) → PagerDuty; slow-burn (6h window, 6× rate) → Slack

- Alert volume: 200+/day reduced to 12/day — all 12 actionable

**Distributed Tracing**

- OpenTelemetry SDK instrumented across all services with automatic W3C TraceContext propagation

- Traces capture: request path, DB query timing, external API latency, cache hit/miss

- Grafana Explore: click a log line → jump directly to the full distributed trace

**Dashboards as Code**

- All Grafana dashboards stored as JSON in git, provisioned via Kubernetes ConfigMaps

- New services get a dashboard template automatically via Helm chart — no manual Grafana UI work

**Dynatrace for Full-Stack APM**

- OneAgent deployed on all 19 EKS cluster nodes (DaemonSet)

- Automatic service discovery — topology map built without manual configuration

- Used for deep JVM/container-level profiling on high-latency incidents

**AI Workload Observability**

- Langfuse integrated for LLM call tracing: per-request latency, token count, cost, quality score

- Custom Prometheus metrics: inference tokens/sec, queue depth, TTFT (time to first token)

- Alerts on token cost budget burn rate — not just per-call cost

---

## Results

| Metric | Before | After |
|---|---|---|
| Alert volume | 200+/day | 12/day (all actionable) |
| Alert actionability | ~7% | 92% |
| MTTR | 4.5 hours | 38 minutes |
| Debug time (slow request) | 2–4 hours (log correlation) | 5–15 minutes (trace) |
| Uptime SLA | Occasional breaches | 99.99% for 18 months |

---

## Lessons

- Threshold alerts measure system state. Burn-rate alerts measure user impact. Only the second one wakes you up for the right reasons.

- The three pillars (metrics/logs/traces) are only valuable when correlated in one view — Grafana Tempo + Loki + Prometheus in a single Explore session changes debugging completely.

- For AI systems, observability must extend to quality metrics — hallucination rate, relevance score, TTFT — not just latency and error rate. Running LLMs without this is like running a database with no slow query log.
