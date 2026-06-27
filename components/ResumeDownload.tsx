"use client";

export default function ResumeDownload() {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      download
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:scale-105 transition"
    >
      📄 Download Resume (PDF)
    </a>
  );
}