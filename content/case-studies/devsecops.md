# DevSecOps — Shifting Security Left Across 100+ Pipelines

## Problem Statement

Security was a bottleneck. PRs sat for days waiting for manual security sign-off. Container images were being deployed with known CVEs because scanning happened post-deployment. IAM policies used wildcard resources for convenience. Secrets had appeared in git history. There was no consistent security posture across microservices.

---

## What Changed

Built a layered, automated DevSecOps programme across all 100+ pipelines — removing manual gates and replacing them with automated enforcement at every stage of the SDLC.

---

## Architecture

```
PR Created
    |
    v
SAST (SonarQube + Semgrep)          <- blocks on high-severity findings
    |
    v
Dependency Scan (Trivy SCA)          <- blocks on known vulnerable deps
    |
    v
Docker Build
    |
    v
Container Image Scan (Trivy CVE)     <- blocks if Critical CVE found
    |
    v
Push to ECR (only clean images)
    |
    v
OPA/Rego Admission Control           <- enforced on every K8s deployment
    |
    v
Runtime: Kubernetes + IRSA           <- least-privilege at execution time
```

---

## Key Implementations

**Shift-Left Scanning**
- SonarQube and Semgrep integrated as PR checks — build fails on SAST findings above HIGH severity
- Trivy SCA scans all dependency trees per PR

**Container Security**
- Trivy container image scanning in every pipeline before ECR push
- Images with Critical CVEs are rejected — never reach a registry
- Base image pinned to specific SHA digest, not a mutable tag

**Secrets Management**
- External-secrets operator syncs AWS Secrets Manager values into Kubernetes Secrets at pod start
- Zero hardcoded credentials in any Dockerfile, ConfigMap, or application code
- TruffleHog and git-secrets in pre-commit hooks to catch credentials before they land in git

**IAM Least Privilege**
- IRSA (IAM Roles for Service Accounts) scopes every pod to its own IAM role
- All wildcard resource ARNs replaced with specific resource patterns
- Quarterly IAM permission reviews using AWS IAM Access Analyzer

**Kubernetes Admission Control**
- OPA/Rego policies enforced on every deployment:
  - Block privileged containers
  - Enforce CPU/memory resource limits
  - Require non-root user in all containers
  - Ban `latest` image tag
  - Reject images from non-approved registries

---

## Results

| Metric | Before | After |
|---|---|---|
| High-severity CVEs reaching prod | ~3/month | 0 |
| Security review wait time | 3-5 days | Automated |
| Secret exposure incidents (18mo) | Unknown | 0 |
| IAM permission scope reduction | — | ~65% |

---

## Lessons

- Automated gates eliminate the "security vs. velocity" false trade-off — both improve together
- Fail early and fail loudly: catching a CVE in PR review costs minutes; post-production costs hours
- IRSA is the correct Kubernetes-native secrets pattern; avoid environment variable injection of AWS creds entirely
