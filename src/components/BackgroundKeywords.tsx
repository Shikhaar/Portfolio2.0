"use client";

import { motion } from "framer-motion";

const KEYWORDS = [
  "Generative AI",
  "Computer Vision",
  "Voice AI",
  "LLMs",
  "RAG",
  "Backend Systems",
  "Machine Learning",
  "FastAPI",
  "Python",
  "Agentic AI",
  "Time Series",
  "Transformers",
  "WebRTC",
  "Vector DB",
  "Embeddings",
];

// Fixed positions — all below the 80px navbar, staying in outer margins
const POSITIONS: React.CSSProperties[] = [
  { top: "18%", left: "2%" },
  { top: "28%", left: "1%" },
  { top: "44%", left: "2.5%" },
  { top: "60%", left: "1%" },
  { top: "72%", left: "3%" },
  { top: "84%", left: "2%" },
  { top: "16%", right: "1.5%" },
  { top: "30%", right: "2%" },
  { top: "46%", right: "1%" },
  { top: "58%", right: "2.5%" },
  { top: "70%", right: "1.5%" },
  { top: "82%", right: "2%" },
  { top: "20%", left: "48%" },
  { top: "75%", left: "45%" },
  { top: "50%", left: "44%" },
];

export function BackgroundKeywords() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ top: "64px" }} // Start below navbar
      aria-hidden="true"
    >
      {KEYWORDS.map((word, i) => (
        <motion.span
          key={word}
          className="absolute font-extrabold text-2xl sm:text-3xl text-[var(--text)] whitespace-nowrap"
          style={{
            ...POSITIONS[i % POSITIONS.length],
            opacity: 0,
            letterSpacing: "-0.02em",
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.022, 0.032, 0.022],
          }}
          transition={{
            duration: 7 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
