# Kubernetes Multi-Region Platform Engineering — 19 Clusters, 7 Regions, One Operating Model

## Problem Statement

Devo Technology's Kubernetes footprint grew organically across seven global regions — EU, US, US3, APAC, Santander (SANT), GCP/Telefonica, and NCSC Bahrain — as customer deployments expanded. Each region had drifted slightly: different Helm chart versions, inconsistent RBAC/namespace conventions, and some clusters still receiving manual `kubectl apply` changes alongside GitOps-managed ones.

The practical cost showed up as tribal knowledge — a platform engineer comfortable in the EU cluster couldn't safely operate on NCSC Bahrain without re-learning region-specific quirks. Onboarding a new service meant hand-copying manifests between regions and hoping nothing was missed.

---

## What Changed

Standardized all 19+ EKS clusters onto a single GitOps operating model: ArgoCD as the sole deployment mechanism (no direct `kubectl apply` to any managed namespace), Helm for templating, and a consistent RBAC/namespace convention applied fleet-wide.

---

## Architecture

```
Git Repository (source of truth)
    |
    |-- environments/eu/values.yaml
    |-- environments/us/values.yaml
    |-- environments/apac/values.yaml
    |-- environments/sant/values.yaml
    |-- environments/gcp/values.yaml
    |-- environments/ncsc/values.yaml
    |-- environments/us3/values.yaml
    |
    v
ArgoCD ApplicationSet (App-of-Apps)
    |
    +--> EU Cluster     (namespace + RBAC template)
    +--> US Cluster     (namespace + RBAC template)
    +--> APAC Cluster   (namespace + RBAC template)
    +--> Santander      (namespace + RBAC template)
    +--> GCP/Telefonica (namespace + RBAC template)
    +--> NCSC Bahrain   (namespace + RBAC template)
    +--> US3 Cluster    (namespace + RBAC template)

    Sync policy: automated + self-heal + prune
```

---

## Key Implementations

**ArgoCD App-of-Apps Across Regions**

- One ApplicationSet generator produces one ArgoCD Application per region, each pointing at the same Helm chart with a region-specific `values.yaml`
- Sync waves ensure namespace/RBAC objects land before workload manifests
- Automated + self-heal sync means manual `kubectl` drift gets reverted automatically instead of silently persisting

**Standardized RBAC & Namespace Model**

- Every region gets the same namespace-per-tenant convention and the same baseline `Role`/`RoleBinding` templates, parameterized per region only where genuinely required (e.g. NCSC Bahrain's stricter access list)
- New service onboarding became a values-file change instead of a bespoke manifest per region

**Multi-Cluster Add-On Management**

- Cluster add-ons (ingress controller, metrics-server, cert-manager) tracked as Helm releases under the same ArgoCD-managed lifecycle as application workloads — no more "add-ons installed by hand during cluster creation and never touched again"

**Terraform/Terragrunt for the Clusters Themselves**

- The EKS clusters, node groups, and VPC networking underneath ArgoCD are provisioned via Terraform/Terragrunt, standardized across the same seven regions — see the [Terraform State Management](/engineering/terraform-state) case study for the IaC side of this same effort

---

## Results

| Metric | Before | After |
|---|---|---|
| Deployment mechanism | Mixed — GitOps in some regions, manual `kubectl` in others | 100% ArgoCD-managed, self-healing |
| New service onboarding | Bespoke manifest per region | Single values-file change, ApplicationSet fans out |
| Add-on lifecycle | Installed once by hand, untracked | Helm-managed, version-pinned, upgradeable fleet-wide |
| Regions under standardized RBAC/namespace model | Inconsistent | 7 of 7 |

---

## Lessons

- A multi-region Kubernetes fleet is only as consistent as its *weakest* manually-managed cluster — one exception undermines the "it's all GitOps" story for the whole fleet.
- ApplicationSets turn "deploy to 7 regions" from 7 manual steps into 1 Git commit, but only if the underlying values are actually parameterized correctly — the discipline is in the templating, not the tool.
- Self-heal sync is the feature that actually enforces standardization long-term — without it, manual drift creeps back in within weeks.
