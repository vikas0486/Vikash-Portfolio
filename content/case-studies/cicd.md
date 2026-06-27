# CI/CD Architecture Design

## 🎯 Problem Statement
How do you design scalable CI/CD pipelines for microservices running in Kubernetes?

---

## 🏗️ Architecture

We use:

- GitHub Actions → Build + Test
- Docker → Containerization
- ECR → Image Registry
- ArgoCD → GitOps Deployment
- Kubernetes → Runtime

---

## 🔄 Deployment Flow

1. Developer pushes code
2. GitHub Actions triggers pipeline
3. Docker image built
4. Image pushed to registry
5. ArgoCD syncs cluster
6. Kubernetes deploys new version

---

## 🔁 Rollback Strategy

- Git revert triggers pipeline rollback
- ArgoCD automatically syncs previous manifest
- Zero downtime ensured

---

## 📊 Key Benefits

- Fully automated deployments
- Git as single source of truth
- Scalable across multiple clusters
- Production-grade reliability

---

## 🧠 Interview Insight

If asked:

> "How do you ensure zero downtime?"

Answer:

- Blue/Green deployment OR
- Canary rollout with health checks