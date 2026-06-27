"use client";

import { useState } from "react";

export default function EngineeringChat() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask-engineer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("❌ Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* INPUT BOX (THIS WAS MISSING) */}
      <div className="flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask CI/CD, Terraform, Kubernetes, AWS..."
          className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-cyan-500"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {/* ANSWER BOX */}
      {answer && (
        <div className="mt-6 p-5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}