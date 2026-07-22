"use client";

export default function ResumeDownload() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a
        href="/resume-professional.pdf"
        target="_blank"
        download
        className="inline-flex items-center gap-2 border-2 border-violet-500/50 hover:border-violet-400 text-violet-300 hover:text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-500/30"
        style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.15))" }}
      >
        📄 Professional Resume
      </a>

      <a
        href="/resume-detailed.pdf"
        target="_blank"
        download
        className="inline-flex items-center gap-2 border-2 border-violet-500/50 hover:border-violet-400 text-violet-300 hover:text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-500/30"
        style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.15))" }}
      >
        📑 Detailed Resume
      </a>
    </div>
  );
}
