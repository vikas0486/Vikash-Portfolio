"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function TestResume() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/resume/resume.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <div className="p-10 prose prose-invert max-w-3xl mx-auto">
      <h1>Resume Preview Test</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}