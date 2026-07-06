"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PenLine, ArrowRight } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

export function BlogSection() {
  return (
    <SectionWrapper id="blog">
      <motion.div variants={itemVariants} className="mb-12">
        <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Writing</span>
        <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
          Technical notes &amp; <span className="gradient-text">ideas.</span>
        </h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 items-start"
      >
        {/* Coming soon card */}
        <div className="w-full sm:max-w-sm p-6 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-3xl">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-muted)] flex items-center justify-center mb-4">
            <PenLine size={20} className="text-[var(--primary)]" />
          </div>
          <h3 className="font-bold text-[var(--text)] mb-1">Upcoming Articles</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Technical notes on production AI engineering, voice pipelines, time-series forecasting, and lessons learned shipping production AI.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {["Building Voice AI for Low-Literacy Markets", "Zero-Shot Time-Series Forecasting at Scale", "Prompt Injection in Production Chatbots"].map((title) => (
              <div
                key={title}
                className="flex items-center gap-2 text-xs text-[var(--muted)]"
              >
                <ArrowRight size={10} className="flex-shrink-0 text-[var(--primary)]" />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topics chips */}
        <div className="flex-1 flex flex-wrap gap-2 pt-2">
          {["Voice AI", "LLMs", "Production ML", "FastAPI", "Time Series", "Computer Vision", "Agentic AI", "RAG Pipelines", "System Design", "Real-time Systems"].map((topic) => (
            <span
              key={topic}
              className="px-4 py-2 text-sm rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
