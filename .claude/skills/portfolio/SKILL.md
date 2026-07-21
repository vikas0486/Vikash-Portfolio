---
name: portfolio
description: Work on the Vikash-Portfolio Next.js 15 site — dev/build/lint, resume Markdown→PDF pipeline, engineering case studies, the "Ask Engineer" BM25 knowledge-base chat, and Vercel deploys. Use when the user asks to run, build, edit, or ship anything in this portfolio project.
---

# Vikash Portfolio

Enterprise-grade personal portfolio built with **Next.js 15 (App Router) + React 19 + TypeScript + TailwindCSS 4 + Framer Motion**. It showcases Platform Engineering / DevOps / Cloud / GenAI work, an automated resume system, engineering case studies, and a build-time RAG-style "Ask Engineer" chat.

Live site: https://vikash-portfolio-alpha.vercel.app

## ⚠️ Read this first

This project pins **Next.js 15** and follows the note in `AGENTS.md`: the installed Next.js may differ from training data. **Before writing App Router / routing / config code, read the relevant guide in `node_modules/next/dist/docs/`** and heed deprecation notices. Do not assume older Next.js conventions.

## Repository map

```
app/
  page.tsx                     # home page (Hero, Skills, Projects, Terminal, Timeline, Contact)
  layout.tsx                   # root layout
  globals.css
  engineering/page.tsx         # case studies index
  engineering/[slug]/page.tsx  # dynamic case study page
  api/ask-engineer/route.ts    # "Ask Engineer" chat API (BM25 over knowledge base)
components/                    # Hero, Navbar, Skills, Projects, Terminal, Timeline,
                               # ResumeDownload, EngineeringChat, FloatingChat, Contact, etc.
content/case-studies/*.md      # cicd, devsecops, observability, terraform-state, terraform-plugin-framework
lib/
  bm25.ts                      # BM25 ranking used by the chat
  knowledge-base.json          # indexed knowledge chunks
  profile.ts                   # profile data
resume/
  resume.md                    # ← SOURCE OF TRUTH for the DETAILED resume (full, ~15+ pages)
  resume-professional.md       # ← SOURCE OF TRUTH for the ATS PROFESSIONAL resume (~2 pages)
build-scripts/generate-resume-pdf.js  # Markdown → PDFs via markdown-it + puppeteer
public/
  resume-detailed.pdf          # generated from resume.md
  resume-professional.pdf      # generated from resume-professional.md
  resume.pdf                   # alias/copy of resume-detailed.pdf (legacy path)
.github/workflows/resume-pdf.yml      # CI that regenerates the resume PDFs
```

## Common tasks

### Run the dev server
```bash
npm install        # first time / after dependency changes
npm run dev        # http://localhost:3000  (falls back to :3001/:3002 if busy)
```

### Build & lint (always before deploy)
```bash
npm run build      # uses NODE_OPTIONS=--max-old-space-size=4096
npm run lint       # eslint .
```
A clean deploy requires the build to compile with lint + types passing.

### Regenerate the resume PDFs
There are **two resumes**, each authored **only** in Markdown. Never edit the PDFs directly.
- `resume/resume.md` → **Detailed** resume (full detail, diagrams) → `public/resume-detailed.pdf`
- `resume/resume-professional.md` → **ATS Professional** resume (brief, all companies + key projects, ~2 pages) → `public/resume-professional.pdf`

```bash
node build-scripts/generate-resume-pdf.js   # writes both PDFs + resume.pdf alias
```
The script also copies the detailed PDF to `public/resume.pdf` as a legacy alias.
Keep the Professional resume within **3–4 pages** and ATS-clean (no mermaid, simple tables/lists).
Keep both resumes consistent with the site's current role (see below).
If puppeteer hangs, prefer `waitUntil: "domcontentloaded"` over `networkidle0` (already set in the script).

### Add / edit an engineering case study
1. Add or edit a Markdown file in `content/case-studies/` (e.g. `kubernetes.md`).
2. It surfaces at `/engineering` and `/engineering/[slug]` — the slug is the filename without `.md`.
3. If the content should be answerable by the chat, update `lib/knowledge-base.json` accordingly.

### Work on "Ask Engineer" chat
- API: `app/api/ask-engineer/route.ts` — ranks `lib/knowledge-base.json` chunks with `lib/bm25.ts`.
- UI: `components/EngineeringChat.tsx` and `components/FloatingChat.tsx`.
- This is build-time / static retrieval — **no external vector DB, no runtime API cost**. Keep it that way unless the user explicitly asks otherwise.

### Deploy (Vercel)
```bash
npm run build      # verify locally first
vercel             # preview
vercel --prod      # production
```

## Conventions & guardrails

- **Current role**: Vikash is **Consultant – Platform Engineering at Hitachi Group** (since Jul 2026) — focused on onboarding governance, modernizing legacy DevOps practices with AI-native processes, and automation (NOT Terraform Provider development — that's a personal lab project, unrelated to the Hitachi role, see the `terraform-plugin-framework` case study); prior role was Lead DevOps/SRE at Devo Technology (Apr 2023 – Jun 2026). Keep the role consistent across `components/*`, `lib/knowledge-base.json`, `lib/profile.ts`, and both resumes.
- **Resume**: two sources — edit `resume/resume.md` (detailed) and `resume/resume-professional.md` (ATS) only; regenerate PDFs via the build script. Never hand-edit the PDFs. Keep both in sync with each other and the site.
- **Next.js 15**: consult `node_modules/next/dist/docs/` before routing/config changes (see `AGENTS.md`).
- **Styling**: TailwindCSS 4 utility classes; animations via Framer Motion.
- **Knowledge base**: keep retrieval static (BM25 over local JSON) — don't introduce Pinecone/Weaviate/paid infra without an explicit request.
- After editing `lib/knowledge-base.json`, validate it parses (`node -e "JSON.parse(require('fs').readFileSync('lib/knowledge-base.json','utf8'))"`).
- Run `npm run build` and `npm run lint` before declaring UI/route work done.

## What to do when invoked

Ask the user (or infer from their request) which task they want, then follow the matching section above. If they just say "run it" → start the dev server. If they mention the resume → the PDF pipeline. If they mention case studies or the chat → the content/knowledge-base sections.
