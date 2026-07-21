import Link from "next/link";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects & Platforms — Vikash Jaiswal",
  description:
    "The full list of production systems, open-source tools, and architecture initiatives built by Vikash Jaiswal.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <Projects />

      <div className="max-w-7xl mx-auto px-6 pb-24 -mt-8">
        <div className="border-t border-zinc-800 pt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            Curious how the systems behind these projects were designed?
          </p>
          <Link
            href="/engineering"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Engineering Case Studies →
          </Link>
        </div>
      </div>
    </main>
  );
}
