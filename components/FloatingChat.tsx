"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const GREETING: Message = {
  role: "assistant",
  text: "Hi, I'm ArchForge — ask me anything about Vikash's architecture, DevOps, cloud, or AI engineering work. Press Enter to send.",
};

export default function FloatingChat() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show the launcher after a short delay so it doesn't clash with page load animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const askQuestion = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.answer || "No answer available." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Error reaching ArchForge — please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Chat Panel ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed bottom-28 right-5 sm:right-7 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[70vh] max-h-[560px] flex flex-col rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-900/40 bg-zinc-950"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #164e63, #0891b2)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">🧠</span>
                    <div className="leading-tight">
                      <div className="text-white font-semibold text-sm">Vikash Jaiswal</div>
                      <div className="text-cyan-200 font-normal text-xs">
                        ArchForge — Ask Vikash Architecture
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="text-cyan-100 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-950">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap rounded-2xl px-4 py-2.5 ${
                          m.role === "user"
                            ? "bg-cyan-600 text-white rounded-br-sm"
                            : "bg-zinc-800/80 border border-zinc-700 text-zinc-200 rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-800/80 border border-zinc-700 text-zinc-400 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex-shrink-0 border-t border-zinc-800 bg-zinc-900/60 p-3 flex items-center gap-2">
                  <input
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Ask about CI/CD, Terraform, Kubernetes, AI Gateway..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={askQuestion}
                    disabled={loading || !input.trim()}
                    aria-label="Send"
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Launcher Button ── */}
          <motion.button
            onClick={() => setOpen((o) => !o)}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 40 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            aria-label={open ? "Close ArchForge chat" : "Open ArchForge chat"}
            className="fixed bottom-6 right-5 sm:right-7 z-50 select-none"
          >
            {/* Pulsing glow ring */}
            {!open && (
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.55) 0%, transparent 70%)" }}
              />
            )}
            <div
              className="relative flex items-center gap-3 pl-4 pr-5 py-4 rounded-full shadow-xl shadow-cyan-900/50 border border-cyan-400/40"
              style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)" }}
            >
              <span className="relative flex items-center justify-center w-7 h-7">
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="w-7 h-7 text-white" />
                    </motion.span>
                  ) : (
                    <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Bot className="w-7 h-7 text-white" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-white font-bold text-base tracking-tight hidden sm:inline">
                ArchForge
              </span>
              {!open && (
                <Sparkles className="w-4 h-4 text-cyan-100 hidden sm:inline" />
              )}
            </div>
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
