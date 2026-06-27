"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Show after a short delay so it doesn't clash with page load animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/engineering"
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
            transition: {
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            },
          }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="fixed bottom-7 right-7 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-cyan-900/40 select-none"
          style={{
            background: hovered
              ? "linear-gradient(135deg, #0891b2, #06b6d4)"
              : "linear-gradient(135deg, #164e63, #0891b2)",
            border: "1px solid rgba(6,182,212,0.4)",
            color: "#e0f7fa",
            transition: "background 0.25s ease",
          }}
        >
          <span className="text-base">⚙</span>
          <span>ArchForge</span>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-cyan-200 font-normal"
            >
              — Chat with me
            </motion.span>
          )}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
