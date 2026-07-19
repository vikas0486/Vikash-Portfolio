"use client";

export default function ResumeDownload() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a
        href="/resume-professional.pdf"
        target="_blank"
        download
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:scale-105 transition"
      >
        📄 Professional Resume
        <span className="text-xs font-normal opacity-80">ATS · 3–4 pages</span>
      </a>

      <a
        href="/resume-detailed.pdf"
        target="_blank"
        download
        className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/60 text-cyan-300 rounded-xl hover:bg-cyan-500/10 hover:scale-105 transition"
      >
        📑 Detailed Resume
        <span className="text-xs font-normal opacity-70">Full · 8–10 pages</span>
      </a>
    </div>
  );
}
