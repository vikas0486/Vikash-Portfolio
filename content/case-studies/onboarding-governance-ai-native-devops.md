# Onboarding Governance & AI-Native DevOps — Modernizing Monolithic Practices (In Progress)

## Problem Statement

Large, established DevOps organizations accumulate practices the same way legacy codebases do: incrementally, under deadline pressure, without much revisiting. The result is often monolithic — a single sprawling onboarding runbook instead of a modular checklist, manual steps that were automatable years ago but never got prioritized, and process knowledge that lives in individual engineers' heads rather than in anything a new team could self-serve from.

None of that is a criticism unique to one organization — it's the default failure mode of DevOps practices left to accumulate without deliberate governance.

**Status note:** this is Vikash's current, active focus at Hitachi Group (started July 2026) — the section below describes the problem framing and approach, not a completed transformation with a finished set of metrics. It will be updated as the work matures.

---

## What's Changing

Three parallel threads, all aimed at the same underlying goal — reducing the effort and risk of bringing something new onto the platform:

1. **Onboarding governance** — standardizing how new projects, teams, and services get brought on, so onboarding is a repeatable, checklist-driven process rather than a bespoke conversation every time.
2. **Modernizing monolithic DevOps practices** — breaking down legacy, all-in-one runbooks and processes into modular, independently-improvable steps, and replacing manual steps with automation where the manual step no longer earns its cost.
3. **Embedding AI-native processes into that lifecycle** — not "add an AI chatbot," but genuinely rethinking specific steps (code review triage, runbook/documentation generation, incident-triage assistance) around what an AI-assisted step can now do that a fully manual step couldn't.

---

## Approach

```
Legacy onboarding: tribal knowledge, ad-hoc runbook, manual approval chains
    |
    v
Governance layer: standardized checklist + templates + explicit approval gates
    |
    v
Automation layer: replace manual steps that are now automatable
    |
    v
AI-native layer: AI-assisted steps embedded where they add real leverage
    (review triage · auto-generated runbooks/docs · incident-triage assistance)
```

The ordering matters — governance before automation before AI. Automating an ungoverned process just makes the inconsistency happen faster; adding an AI-assisted step to a process nobody has actually standardized yet just adds a new source of unpredictability on top of an old one.

---

## What "AI-Native" Means Here, Concretely

- **Review triage**: using AI-assisted analysis to route and prioritize pull requests and change requests, not to replace human review judgment
- **Runbook and documentation generation**: reducing the cost of keeping onboarding documentation current, so it doesn't silently rot the way most manually-maintained runbooks do
- **Incident-triage assistance**: surfacing likely-relevant context (recent changes, known runbook entries) faster than a human searching cold, without removing the human from the actual decision

---

## Lessons So Far

- Governance and automation are not the same investment — a well-governed process that's still manual is still a huge improvement over an ungoverned one that's partially automated.
- "AI-native" is a design constraint on *where* AI gets embedded, not a label you can slap onto an existing process afterward — the steps have to actually be rethought, not just instrumented.
- Modernizing a monolithic practice one module at a time (rather than a big-bang rewrite) means the organization keeps operating throughout — the same lesson as strangler-fig migrations in application architecture, applied to process instead of code.
