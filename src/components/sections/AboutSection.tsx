"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const focuses = [
  { label: "LLMs & Agentic AI", desc: "Tool-calling systems, streaming inference, RAG pipelines" },
  { label: "Computer Vision", desc: "Damage detection, OCR, and face verification pipelines" },
  { label: "Voice AI", desc: "Real-time multilingual voice assistants with WebRTC" },
  { label: "Time-Series ML", desc: "Demand forecasting with foundation models" },
  { label: "Backend Systems", desc: "FastAPI async services, Redis, and MySQL for high-throughput workloads" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any } },
};

const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any } },
};

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      {/* Section Header (Full Width) */}
      <motion.div variants={itemVariants} className="mb-10 lg:mb-12">
        <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">About</span>
        <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
          I build AI systems that work <span className="gradient-text block sm:inline">in production.</span>
        </h2>
      </motion.div>

      {/* Grid Columns */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Side: Text Paragraphs */}
        <motion.div
          variants={slideLeft}
          className="lg:col-span-7 space-y-5 text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg"
        >
          <p>
            I enjoy building production AI systems rather than research prototypes. My work sits at the intersection of large language models, real-time voice AI, computer vision, and the backend infrastructure that makes these systems reliable in production.
          </p>
          <p>
            I joined Zypp Electric as an early member of the AI team and have since built AI systems that support operations serving <strong>25,000+ active delivery riders</strong> across India.
          </p>
          <p>
            To me, building an AI system is about much more than training a model. It needs to handle edge cases gracefully, fail safely, and remain reliable in real-world conditions. Whether it's a voice assistant operating in noisy environments or a credit scoring engine that needs to be consistent across different cities, I believe the engineering behind an AI system is just as important as the model itself.
          </p>
        </motion.div>

        {/* Right Side: Focus Areas */}
        <motion.div
          variants={slideRight}
          className="lg:col-span-5 space-y-4"
        >
          <motion.p variants={itemVariants} className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">
            What I Focus On
          </motion.p>

          <div className="space-y-3">
            {focuses.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="group p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all duration-[var(--duration-fast)]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[var(--text)] text-sm">{item.label}</p>
                    <p className="text-[var(--muted)] text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
