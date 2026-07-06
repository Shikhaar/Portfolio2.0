"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Building2, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-[var(--surface)]/30">
      <motion.div variants={itemVariants} className="mb-12">
        <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Experience</span>
        <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
          My Professional <span className="gradient-text">Journey.</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl">
          A summary of my impact at Zypp Electric (India&apos;s largest EV-first last-mile delivery platform).
        </p>
      </motion.div>

      <div className="space-y-12">
        
        {/* 1. Full-time Role */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)] hover:border-[var(--primary)] transition-all duration-350"
        >
          {/* Accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] rounded-t-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-muted)] flex items-center justify-center flex-shrink-0">
                <Building2 size={24} className="text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">AI/ML Engineer</h3>
                <p className="text-sm font-semibold text-[var(--primary)]">Zypp Electric</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:items-end gap-1 text-[var(--text-secondary)]">
              <span className="text-sm flex items-center gap-1.5 font-medium">
                <Calendar size={14} className="text-[var(--primary)]" /> July 2026 - Present
              </span>
              <span className="text-sm flex items-center gap-1.5">
                <MapPin size={14} /> Gurgaon, India
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-4">Core Scale & Agentic Orchestration</h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Real-Time Voice Pipeline</span>
                    Scaled and deployed <span className="font-semibold text-[var(--text)]">Zypp Saathi</span> voice assistant for <span className="font-semibold text-[var(--text)]">25,000+ active riders</span> using <span className="font-semibold text-[var(--text)]">Pipecat, OpenAI Realtime API, and LiveKit WebRTC</span>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Agentic Framework Migration</span>
                    Architected the B2C & B2B conversational core in <span className="font-semibold text-[var(--text)]">Zia Chatbot (Phase 3.0)</span> using <span className="font-semibold text-[var(--text)]">LangGraph state machines</span>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">High-Performance CRM Ingestion</span>
                    Developed a robust <span className="font-semibold text-[var(--text)]">FastMCP (Model Context Protocol)</span> server for real-time lead captures with duplicate filters.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Deep Vision & OCR Systems</span>
                    Integrated <span className="font-semibold text-[var(--text)]">Nvidia Nemotron-Parse</span> for EV component image OCR to automate parts validation.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[var(--surface-hover)] border border-[var(--border)]/50 rounded-2xl">
              <h5 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-2">Focus & System Impact</h5>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                In my full-time engineering role, my focus shifted to <span className="font-semibold text-[var(--text)]">system design, throughput scaling, and cost containment</span>. I worked on reducing API latency over WebSockets, managing concurrent streaming token states, and building secure server-to-server connection layers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2. Internship Role */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)] hover:border-[var(--primary)] transition-all duration-350"
        >
          {/* Accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--border)] rounded-t-3xl group-hover:bg-[var(--primary)]" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-[var(--text-secondary)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">AI/ML Intern</h3>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Zypp Electric</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:items-end gap-1 text-[var(--text-secondary)]">
              <span className="text-sm flex items-center gap-1.5 font-medium">
                <Calendar size={14} /> June 2025 - June 2026
              </span>
              <span className="text-sm flex items-center gap-1.5">
                <MapPin size={14} /> Gurgaon, India
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-6 space-y-6">
            
            {/* Recruiter Highlight Bullet Points */}
            <div>
              <h4 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-4">Key Learnings & Production Milestones</h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Automated Damage Detection</span>
                    Mastered vision parsing by building a <span className="font-semibold text-[var(--text)]">GPT-4o Vision</span> validation pipeline to analyze 4 vehicle sides in parallel for ride-ends.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Proprietary Scoring Systems</span>
                    Engineered <span className="font-semibold text-[var(--text)]">Hustle Score (Zybil)</span>, mapping IoT telemetry, wallet records, and merchant stats into a 300-900 scale for gig worker credit.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">Demand Forecasting Pipelines</span>
                    Implemented spare parts consumption forecasting across <span className="font-semibold text-[var(--text)]">15+ cities</span> using <span className="font-semibold text-[var(--text)]">Amazon Chronos-2</span> with statistical TSB/SBA fallbacks.
                  </p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)] block mb-0.5">LLM Orchestration & RAG</span>
                    Developed initial runs of the <span className="font-semibold text-[var(--text)]">Zia Chatbot</span>, utilizing <span className="font-semibold text-[var(--text)]">Qdrant Vector DB</span> context injections and low-latency NDJSON streaming.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[var(--surface-hover)] border border-[var(--border)]/50 rounded-2xl">
              <h5 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-2">Engineering Focus & Growth</h5>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                During this year-long internship, I transitioned from experimental models to shipping <span className="font-semibold text-[var(--text)]">production-grade AI pipelines</span> serving thousands of riders daily. I gained hands-on experience in managing <span className="font-semibold text-[var(--text)]">LLM pricing boundaries, system latency bottlenecks, asynchronous task workers</span>, and structuring strict validation checks to prevent data leaks. Converted to full-time AI/ML Engineer in July 2026 after shipping 5 production systems across voice AI, computer vision, credit scoring, forecasting, and LLM orchestration during the internship.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
