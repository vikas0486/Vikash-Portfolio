# portfolio-builder

You are working inside **Vikash Jaiswal's personal portfolio** — a Next.js 15 app deployed on Vercel at `https://vikash-portfolio-alpha.vercel.app`.

## Project identity
- Owner: Vikash Jaiswal — Lead Platform Engineer / Principal DevOps / AWS Cloud Architect
- GitHub repo: `vikas0486/Vikash-Portfolio` (branch: `main`, auto-deploys to Vercel)
- Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, jsPDF, Mermaid

## Directory map
```
app/
  page.tsx                  — main landing page (section order: Hero → StatsBar → Terminal → QuickActions → Projects → Skills → Timeline → Contact)
  layout.tsx                — root layout; FloatingChat renders here (appears on every page)
  engineering/
    page.tsx                — Engineering Case Studies index with EngineeringChat AI assistant
    [slug]/page.tsx         — Markdown-rendered case study (reads from content/case-studies/)
  api/
    ask-engineer/route.ts   — keyword-matched AI chat API (no external LLM; uses profile.knowledgeAreas)

components/
  Hero.tsx                  — name (VIKASH JAISWAL, all-caps), animated roles, ResumeDownload button
  Navbar.tsx                — fixed top nav; links: About / Projects / Skills / Experience / Contact + "Hire Me" CTA
  StatsBar.tsx              — impact numbers bar
  Terminal.tsx              — animated CLI terminal section
  InfraArchitecture.tsx     — modal with 5 tabbed Mermaid diagrams (CI/CD, K8s, Terraform, Observability, Platform)
  SkillSnapshot.tsx         — "Capability Report" modal + jsPDF download (Vikash-Jaiswal-Capability-Report.pdf)
  FloatingChat.tsx          — floating ArchForge button (bottom-right, links to /engineering)
  EngineeringChat.tsx       — AI chat input/output widget used inside /engineering
  Projects.tsx              — project cards
  Skills.tsx                — skills grid
  Timeline.tsx              — experience timeline
  Contact.tsx               — contact section; email is a plain hyperlink (not a button)
  ResumeDownload.tsx        — download link for public/resume.pdf

lib/
  profile.ts                — SINGLE SOURCE OF TRUTH for all personal data
                              (identity, roles, summary, skills, expertise, impact, tags, knowledgeAreas)
                              Edit this file to update content across the entire site.

content/case-studies/       — Markdown files for engineering case studies
  cicd.md / terraform-state.md / devsecops.md / observability.md

public/
  resume.pdf                — downloadable resume

build-scripts/
  generate-resume-pdf.js    — PDF generation script (triggered by GitHub Actions)

.github/workflows/
  resume-pdf.yml            — GitHub Actions: auto-generates resume PDF on push
```

## Key conventions
- **All personal data lives in `lib/profile.ts`** — never hardcode Vikash's name, skills, or metrics in components
- **Name is always ALL CAPS** — use `.toUpperCase()` when rendering `profile.identity.name`
- **No external LLM calls** — the engineering chat uses keyword matching against `profile.knowledgeAreas`
- **Mermaid diagrams** are rendered client-side via dynamic import in `InfraArchitecture.tsx`
- **PDF generation** uses jsPDF directly in the browser (no server) — see `downloadReport()` in `SkillSnapshot.tsx`
- **`"use client"`** is required on any component using useState, useEffect, framer-motion, or browser APIs
- **Deployment**: push to `main` → Vercel auto-deploys. Run `npm run build` locally before pushing to catch errors

## Design system
- Background: `bg-black` / `bg-zinc-950` / `bg-zinc-900`
- Primary accent: `cyan-400` / `cyan-500` / `cyan-600`
- Text hierarchy: `text-white` (headings) → `text-zinc-300` (body) → `text-zinc-500` (muted)
- Borders: `border-zinc-800` (default) → `border-cyan-500` (hover/active)
- Button style — filled: `bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-4 rounded-xl`
- Button style — outlined: `border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-300 font-semibold px-8 py-4 rounded-xl`
- Animations: Framer Motion `initial/animate/whileInView` — always `viewport={{ once: true }}`

## Common tasks

**Add a new skill or update profile data**
→ Edit `lib/profile.ts` only. Components read from it automatically.

**Add a new engineering case study**
→ Create `content/case-studies/<slug>.md` and add `{ title, slug, desc }` to the `sections` array in `app/engineering/page.tsx`

**Add a new section to the main page**
→ Create component in `components/`, import in `app/page.tsx`, insert in the section order above

**Add a new Mermaid diagram**
→ Add entry to the `DIAGRAMS` array in `components/InfraArchitecture.tsx`

**Update the PDF capability report**
→ Edit the `downloadReport()` function in `components/SkillSnapshot.tsx`

**Deploy**
```bash
npm run build   # verify locally first
git add <files>
git commit -m "message"
git push origin main   # Vercel auto-deploys
```

## Build gotchas
- Next.js 15: `params` in `[slug]/page.tsx` is a `Promise<{slug}>` — always `await params`
- jsPDF and Mermaid must be dynamically imported (`await import(...)`) — never static imports at top level for these
- ESLint treats unused catch variables as errors in Vercel builds — use `catch {` not `catch (err) {`
- `NODE_OPTIONS=--max-old-space-size=4096` is set in the build script (already in package.json)
