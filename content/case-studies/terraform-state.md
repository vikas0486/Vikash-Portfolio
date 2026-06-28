# Terraform — Multi-Region Infrastructure as Code

## Problem Statement

Infrastructure across 7 regions and 3 environments (dev/staging/prod) was partially Terraform, partially ClickOps, and partially tribal knowledge. State files were local on engineers' laptops. There was no locking — two engineers running `terraform apply` simultaneously caused state corruption. Module versions were not pinned. Drift between actual cloud resources and declared IaC was invisible and growing.

---

## What Changed

Implemented a full Terraform platform with remote state, DynamoDB locking, module versioning, Terragrunt DRY wrappers, drift detection in CI, and complete IaC coverage across all 7 regions.

---

## Architecture

```
Repository Structure
|-- modules/
|   |-- network/         <- VPC, subnets, route tables, NAT
|   |-- compute/         <- EKS cluster, node groups, Karpenter
|   |-- security/        <- IAM roles, KMS, security groups
|   +-- observability/   <- Prometheus stack, CloudWatch, Loki
|
|-- environments/
|   |-- dev/             <- Terragrunt root, includes modules
|   |-- staging/
|   +-- prod/
|
+-- regions/             <- per-region stacks (eu-west-1, ap-south-1, etc.)

Remote State:
S3 bucket (per region) -------> Terraform state files (versioned)
DynamoDB table ------------> State lock (per environment)
```

---

## Key Implementations

**Remote State and Locking**
- S3 bucket per region with versioning enabled for state file history and rollback
- DynamoDB table per environment for state locking — prevents concurrent apply conflicts
- State encryption at rest (AES-256) and in transit (TLS)

**Module Architecture**
- Four core modules: network, compute, security, observability
- Each module has a clear interface (inputs/outputs), no cross-module imports
- Module versions pinned — no floating `source = "module@latest"`

**Terragrunt for DRY Configuration**
- Terragrunt `root.hcl` defines common S3/DynamoDB backend config once
- Each environment/region directory has a minimal `terragrunt.hcl` that includes the root and overrides variables
- Dependency graph managed by Terragrunt: network applies before compute

**Drift Detection in CI**
- Scheduled GitHub Actions job runs `terraform plan` daily across all environments
- Plan output diff'd against expected-empty result — any drift creates a GitHub issue automatically
- Engineers see drift accumulation before it becomes an incident

**Provider and Version Pinning**
- AWS provider pinned: `~> 5.0` (minor updates OK, no major version surprises)
- Terraform itself pinned via `.terraform-version` file
- Terraform lock file committed to git for full dependency reproducibility

**Import Strategy for Existing Resources**
- All pre-existing ClickOps resources brought under Terraform management via `terraform import`
- Import log documented in Architecture Decision Record

---

## Results

| Metric | Before | After |
|---|---|---|
| State corruption incidents | ~2/quarter | 0 (DynamoDB locking) |
| Drift detection | Manual / invisible | Automated daily CI |
| Environment parity | Low (manual deltas) | High (same modules) |
| Regions under full IaC coverage | 2 of 7 | 7 of 7 |
| ClickOps percentage | ~40% | <5% (legacy only) |

---

## Lessons

- Remote state with locking is not optional for teams of more than one person — it is table stakes
- Terragrunt earns its complexity when managing 3+ environments and 5+ regions; otherwise plain Terraform with workspaces is simpler
- Drift detection as a CI job is the highest-ROI addition after remote state — it makes the gap between intent and reality visible before it becomes an outage
