# Observability Platform — From Alert Noise to SLO-Based Operations

## Problem Statement

The monitoring setup was generating 200+ alerts per day. Most were false positives or threshold-based noise that didn't correlate with user impact. Engineers had alert fatigue — critical pages were being ignored. There was no distributed tracing, so debugging a slow request meant manually correlating logs across 5+ services. MTTR averaged 4.5 hours.

---

## What Changed

Rebuilt the entire observability stack on open standards (OpenTelemetry, Prometheus, Grafana), converted all alerting from threshold-based to SLO burn-rate-based, and added distributed tracing and LLM-specific observability for AI workloads.

---

## Architecture

```
Services (instrumented with OpenTelemetry SDK)
    |
    |-- Metrics -------> Prometheus --> Grafana (SLO dashboards)
    |
    |-- Logs ----------> Loki -------> Grafana (correlated view)
    |
    +-- Traces --------> Tempo ------> Grafana (trace explorer)

                 Alerts (burn-rate based, not threshold)
                     |
                     v
                 PagerDuty / Slack (runbook linked from annotation)

LLM Workloads:
    +-- Langfuse ------> Token usage, Latency, Quality scores
```

---

## Key Implementations

**SLO-Based Alerting**
- Defined SLOs for every critical service: availability (99.9%) and latency p99 (<500ms)
- Converted all alerts to burn-rate-based: only fire when the SLO error budget is burning at an unsustainable rate
- Multi-window burn-rate alerts: fast-burn (1h window, 14x rate) and slow-burn (6h window, 6x rate)
- Alert volume: 200+/day reduced to 12/day, all actionable

**Distributed Tracing**
- OpenTelemetry SDK instrumented across all services with automatic W3C TraceContext propagation
- Traces captured: request path, DB query timing, external API latency, cache hit/miss
- Correlated logs and traces in Grafana: click a log line, see the full trace

**Dashboards as Code**
- All Grafana dashboards defined as JSON, stored in git, provisioned via Kubernetes ConfigMaps
- New services get a dashboard template automatically via Helm chart

**Dynatrace for Full-Stack APM**
- OneAgent deployed on all 19 EKS cluster nodes (DaemonSet)
- Automatic service discovery: topology map built without manual configuration
- Used for deep JVM/container-level profiling on high-latency incidents

**AI Workload Observability**
- Langfuse integrated for LLM call tracing: per-request latency, token count, cost, quality score
- Custom Prometheus metrics: inference tokens/sec, queue depth, TTFT (time to first token)
- Alert on token cost budget burn rate, not just per-call cost

---

## Results

| Metric | Before | After |
|---|---|---|
| Alert volume | 200+/day | 12/day (all actionable) |
| MTTR | 4.5 hours | 38 minutes |
| Debug time (slow request) | Hours (log correlation) | Minutes (distributed trace) |
| Uptime SLA maintained | — | 99.99% for 18 months |

---

## Lessons

- Threshold alerts measure system state; burn-rate alerts measure user impact — only the second matters
- Three pillars are only useful when correlated in one view — Grafana Tempo + Loki + Prometheus together changes debugging completely
- For AI systems, observability must extend to quality metrics (hallucination rate, relevance score) not just latency and error rate
