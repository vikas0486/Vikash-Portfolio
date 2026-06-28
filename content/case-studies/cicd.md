# CI/CD Architecture Design

## Problem Statement

How do you design scalable CI/CD pipelines for microservices running in Kubernetes?

Inconsistent deployment practices across 100+ services — manual kubectl apply, no rollback standardisation, no deployment visibility across regions.

---

## Architecture

We use:

- GitHub Actions → Build + Test

- Docker → Containerization

- ECR → Image Registry

- ArgoCD → GitOps Deployment

- Kubernetes → Runtime

---

## Deployment Flow

1. Developer pushes code

2. GitHub Actions triggers pipeline

3. SAST scanning + unit tests run in parallel

4. Docker image built and pushed to ECR with immutable git SHA tag

5. ArgoCD detects manifest change and syncs cluster

6. Kubernetes deploys new version with health check validation

---

## Rollback Strategy

- Git revert triggers pipeline — ArgoCD automatically syncs previous manifest

- Rollback completes in under 3 minutes with zero downtime

- Canary rollouts via Argo Rollouts: 10% → 50% → 100% traffic progression

---

## Key Benefits

- Fully automated deployments — no manual kubectl apply anywhere

- Git as single source of truth for all cluster state

- Scalable across 19 clusters in 7 global regions via ArgoCD ApplicationSets

- Immutable image tags prevent "works on my machine" deploy drift

---

## Results

| Metric | Before | After |
|---|---|---|
| Deployment lead time | 4 hours | 45 minutes |
| Rollback time | 45 minutes | 3 minutes |
| Deployment frequency | 2×/week | 12×/week |
| Change failure rate | 15% | 4% |

---

## Interview Insight

If asked: *"How do you ensure zero downtime?"*

- Blue/Green deployment — switch service selector between two identical environments

- Canary rollout — Argo Rollouts shifts traffic incrementally with automated analysis

- PodDisruptionBudgets — guarantee minimum healthy pods during node drain or rolling update
