"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CaseStudyViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none text-zinc-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}