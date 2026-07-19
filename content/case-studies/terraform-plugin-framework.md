# Terraform Plugin Framework — Custom Provider for On-Premises Banking Infrastructure

## Background

While at Devo Technology, Vikash worked on infrastructure for CIBC (Canadian Imperial Bank of Commerce), specifically supporting their European on-premises operations. Regulatory data-residency requirements meant the environment ran entirely on-premises — no AWS, Azure, or GCP. Every infrastructure change (VM provisioning, database instances, network segmentation, keystore/HSM management) was executed manually against CIBC's internal systems: ticket-driven, ClickOps-style, with no declarative source of truth and no drift detection.

---

## The Problem with Manual On-Prem Infrastructure

- No IaC coverage at all — public-cloud Terraform providers (AWS/Azure/GCP) don't apply when there's no public cloud to point them at
- Every change was a manual runbook execution against internal systems
- No audit trail beyond ticket history; drift between "what's documented" and "what's actually running" was invisible until it caused an incident
- Onboarding new engineers meant tribal knowledge about which internal system did what — no unified, declarative interface

---

## What's Being Built: A Custom Terraform Provider (in progress)

This case study documents the design of a solution to that problem — **not something already delivered to CIBC**, but the exact pattern Vikash is currently building hands-on in a personal reference project ([terraform-plugin-framework-lab](https://github.com/vikas0486), Day 2→3 of its own roadmap), directly informed by that real on-prem banking experience: a custom Terraform Provider, written in Go with the Terraform Plugin Framework, that talks to an internal on-prem infrastructure control plane instead of a public cloud API.

### Proposed Architecture

```
Terraform CLI
      │
      ▼
Terraform Core
      │
      ▼  (Terraform Provider Protocol — gRPC)
custom-provider-onprem (Go, Plugin Framework)
      │
      ▼  (internal gRPC service — protobuf-defined)
On-Prem Infrastructure Control Plane
      │
      ├──▶ VM Provisioning (hypervisor API)
      ├──▶ Database Instance Management (schema + credentials)
      ├──▶ HSM / Keystore Provisioning
      └──▶ Network Segmentation (VLAN / firewall rules)
```

Two separate gRPC layers matter here, and it's easy to conflate them. Terraform Core already talks to *any* provider over gRPC — that's the standard Provider Protocol, agnostic to whatever is on the other side. What makes this pattern useful for an on-prem bank is the *second* gRPC layer: the provider's own client talking to the bank's internal infrastructure control plane via a purpose-built protobuf schema, instead of a REST client hitting AWS/Azure/GCP endpoints. That second layer is the part no off-the-shelf provider can do, because it doesn't know how to speak to a proprietary internal system.

### Example Resource Design

```hcl
resource "onprem_database_instance" "core_banking" {
  name        = "eu-core-db-01"
  schema      = "core_banking_v4"
  environment = "production"
}

resource "onprem_keystore" "hsm_payment_keys" {
  name          = "payment-signing-keys"
  hsm_partition = "eu-partition-01"
}
```

Each resource follows the same CRUD lifecycle already implemented for the `hitachi_resource` proof-of-concept resource in the lab: `Create`/`Read` are fully wired end-to-end; `Update`/`Delete`/`ImportState` and plan modifiers (e.g. `RequiresReplace` on immutable field changes) are the current work in progress.

---

## Projected Impact (design target — not yet measured)

| Metric | Manual process (as experienced) | With custom provider (target) |
|---|---|---|
| Infrastructure change lead time | Hours (ticket + manual execution) | Minutes (`terraform apply`) |
| Drift visibility | None — invisible until an incident | `terraform plan` shows drift directly |
| Audit trail | Ticket history only | Full state + plan history in version control |
| Onboarding new engineers | Weeks of tribal knowledge | Days — same `.tf` workflow any Terraform user already knows |

---

## Why This Matters

Public-cloud-only DevOps experience doesn't transfer to regulated, on-premises-only environments — a large share of banking, defense, and government infrastructure will never touch AWS, Azure, or GCP. The Plugin Framework's core value is that it makes *any* system with an API — gRPC or REST — addressable through the same declarative Terraform workflow engineers already trust. That's a materially rarer skill than configuring existing cloud providers, and it's exactly the gap this lab project is built to close.
