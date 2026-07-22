"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPERIENCE = [
  {
    period: "Jul 2026 – Present",
    role: "Consultant – Platform Engineering",
    company: "Hitachi Group",
    location: "Noida, India",
    type: "Full-time",
    bullets: [
      "Establishing onboarding governance frameworks that standardize how new projects, teams, and services are brought onto the platform",
      "Modernizing legacy, monolithic DevOps practices by embedding AI-native processes and steps across the software delivery lifecycle",
      "Driving automation initiatives across infrastructure, operations, and delivery pipelines to reduce manual toil",
    ],
    tags: ["Platform Engineering", "DevOps Governance", "AI-Native DevOps", "Process Modernization", "Automation"],
  },
  {
    period: "Apr 2023 – Jun 2026",
    role: "Lead DevOps Engineer / SRE",
    company: "Devo Technology",
    location: "Noida, India",
    type: "Full-time",
    bullets: [
      "Architected and delivered AI FORGE — enterprise GenAI operational platform on AWS Bedrock, reducing engineer troubleshooting ramp-up by ~60%",
      "Managed 19+ Kubernetes clusters across 7 global regions (EU, US, US3, APAC, SANT, GCP, NCSC) using ArgoCD GitOps + Helm",
      "Built unified observability platform: OpenTelemetry collectors + Prometheus + Grafana with GitOps-managed alert lifecycle (YAML-as-code)",
      "Eliminated on-call manual toil for EBS storage events via event-driven Lambda automation — 45-min pages → 3-min zero-touch resolution",
      "Integrated OpenBao/Vault across all Kubernetes, Jenkins, GitLab, and infrastructure pipelines — zero hardcoded credentials",
      "Led Terraform/Terragrunt IaC standardization across APAC, EU, and US production regions — single change, three regions, consistent result",
      "Developed Custom Terraform Provider using Plugin SDK — built internal infrastructure abstractions not available in off-the-shelf providers",
      "Resolved JVM OutOfMemoryError incidents on mission-critical CaixaBank cluster via heap-dump investigation and object isolation fixes",
    ],
    tags: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Bedrock", "OpenTelemetry"],
  },
  {
    period: "Feb 2022 – Apr 2023",
    role: "Senior Cloud Consultant",
    company: "GlobalXperts Inc",
    location: "Noida, India",
    type: "Full-time",
    bullets: [
      "Owned production operations for NHL live streaming on AWS MediaLive, MediaConnect, CloudFront, and Route53 — strict SLA environment",
      "Architected VPC subnets, load balancers, DNS configurations, and CloudFront CDN footprints for high-volume media streams",
      "Built multi-platform metrics aggregation combining Datadog, CloudWatch, and Grafana for streaming health monitoring",
      "Led incident response, root cause analysis, and service recovery for customer-facing media services",
      "Delivered Terraform-based cloud modernization advisory for enterprise clients across multiple verticals",
    ],
    tags: ["AWS", "MediaLive", "MediaConnect", "Terraform", "Datadog", "Grafana"],
  },
  {
    period: "Aug 2019 – Feb 2022",
    role: "Assistant Manager – Cloud & RF Engineer",
    company: "Hughes Communications India Ltd",
    location: "Noida, India",
    type: "Full-time",
    bullets: [
      "Engineered cloud-integrated streaming media architectures for nationwide corporate and government e-learning platforms",
      "Deployed hybrid AWS Media Services + VSAT satellite pipelines across constrained edge-network environments",
      "Conducted satellite Link Budget calculations, EIRP tracking, and transponder bandwidth mapping across remote sites",
      "Led enterprise customer migrations from on-premise to AWS — infrastructure modernization and automation buildout",
    ],
    tags: ["AWS", "Media Services", "VSAT", "RF Engineering", "Cloud Migration"],
  },
  {
    period: "Apr 2012 – Jul 2019",
    role: "Assistant Manager – Broadcast Operations",
    company: "Tata Sky Ltd (Tata Sky Binge)",
    location: "Delhi NCR, India",
    type: "Full-time",
    bullets: [
      "Governed real-time transmission and live ingestion pipelines for 450+ TV channels and Tata Sky Binge OTT platform serving millions of subscribers",
      "Orchestrated serverless media workflows using AWS Lambda + Step Functions for stream transcoding, HLS/DASH packaging, and manifest generation",
      "Programmed Python health-check modules polling telemetry from bare-metal hardware, transcoders, and central storage arrays",
      "Led broadcast operations: compression systems, RF infrastructure, uplink services, multiplexing, content delivery, and SLA management",
      "Partnered with OTT, CDN, product, and infrastructure teams supporting content onboarding, metadata workflows, and subscriber-facing digital experiences",
    ],
    tags: ["AWS Lambda", "Step Functions", "Python", "HLS/DASH", "CDN", "OTT"],
  },
  {
    period: "Apr 2010 – Apr 2012",
    role: "Broadcast Engineer",
    company: "Essel Shyam Communication Ltd",
    location: "Delhi NCR, India",
    type: "Full-time",
    bullets: [
      "Managed broadcast automation platforms and master control room distribution for Star India, Disney, Hotstar, and Discovery TV",
      "Supported Harris automation suites, automated playback loops, and baseband hardware routing for strict 24x7 SLA uptime",
    ],
    tags: ["Broadcast Automation", "Harris Systems", "Playout", "SLA Management"],
  },
  {
    period: "Aug 2009 – Mar 2010",
    role: "Service Engineer",
    company: "TVS-E Service Tec (Nokia)",
    location: "Delhi NCR, India",
    type: "Full-time",
    bullets: [
      "Executed chip-level diagnostics and Layer-4 hardware evaluations on mobile development platform prototypes",
    ],
    tags: ["Hardware", "Diagnostics", "Nokia"],
  },
];

export default function Timeline() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Career History
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience
          </h2>
          <p className="mt-4 text-zinc-400">
            15+ years spanning Broadcast Operations → OTT/Media Engineering → Cloud/SRE → Platform Engineering → GenAI
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-800" />

          <div className="space-y-6">
            {EXPERIENCE.map((job, i) => {
              const isOpen = expanded === i;

              return (
                <motion.div
                  key={`${job.company}-${i}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-400 -translate-x-0.5" />

                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full text-left group"
                  >
                    {/* Period */}
                    <div className="text-xs font-mono text-zinc-500 mb-2">{job.period}</div>

                    {/* Role + company */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {job.role}
                        </h3>
                        <span className="text-zinc-600">·</span>
                        <span className="text-cyan-400 font-semibold text-sm">{job.company}</span>
                      </div>
                      <span className="text-zinc-600 text-lg leading-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-600">
                      {job.location} · {job.type}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          {/* Bullets */}
                          <ul className="space-y-2 mb-5">
                            {job.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed"
                              >
                                <span className="mt-2 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((t) => (
                              <span
                                key={t}
                                className="text-xs font-mono text-zinc-500 bg-zinc-800/70 border border-zinc-700/60 px-2.5 py-1 rounded-md"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education + Certs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid md:grid-cols-2 gap-6"
        >
          {/* Education */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              Education
            </h4>
            <div className="space-y-4">
              <div>
                <div className="text-white font-semibold">MBA – IT & Project Management</div>
                <div className="text-zinc-500 text-sm mt-0.5">
                  Sikkim Manipal University · 2012
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">B.Tech – Electronics & Communication Engineering</div>
                <div className="text-zinc-500 text-sm mt-0.5">
                  UPTU Lucknow · 2009
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              Certifications
            </h4>
            <div className="space-y-3">
              {[
                { name: "AWS Certified Solutions Architect – Associate", year: "2023–2026" },
                { name: "AWS Certified Cloud Practitioner", year: "" },
                { name: "ITIL Foundation Certification", year: "" },
                { name: "ServiceNow Fundamentals", year: "" },
                { name: "Claude 101 – Anthropic AI Certification", year: "" },
              ].map((cert) => (
                <div key={cert.name} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-zinc-300">{cert.name}</span>
                    {cert.year && (
                      <span className="text-zinc-600 text-xs ml-2">{cert.year}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
