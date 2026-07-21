"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { PROJECTS, ACCENT, TAG_COLOR, DOT_COLOR } from "@/lib/projects-data";

export default function Projects() {
  return (
    <section id="projects" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I&apos;ve Built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Projects & Platforms
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Production systems, open-source tools, and architecture initiatives — each solving
            a real enterprise problem.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative bg-zinc-900/50 border rounded-2xl p-7 transition-all duration-300 ${ACCENT[p.color]}`}
            >
              {/* Tag */}
              <span
                className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border mb-5 ${TAG_COLOR[p.color]}`}
              >
                {p.tag}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-1">{p.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{p.subtitle}</p>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {p.description}
              </p>

              {/* Impact bullets */}
              <ul className="space-y-2 mb-6">
                {p.impact.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_COLOR[p.color]}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <ExternalLink size={14} />
                  Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
