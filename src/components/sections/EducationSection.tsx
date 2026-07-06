"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GraduationCap, School, Mail, MapPin, Sparkles, BookOpen, ChevronDown } from "lucide-react";
import type { SiteConfig } from "@/types";
import educationData from "../../../content/education.json";

interface EducationSectionProps {
  siteConfig: SiteConfig;
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function EducationSection({ siteConfig }: EducationSectionProps) {
  const [coreExpanded, setCoreExpanded] = useState(false);

  // Core areas list tailored for Shikhar's production experience
  const coreAreas = [
    "AI Engineering & Systems",
    "LLM Apps (RAG / Agentic AI)",
    "Voice AI & Real-time Pipelines",
    "Computer Vision (GPT-4o Vision)",
    "Time Series & ML Forecasting",
    "Backend APIs (FastAPI Async)",
    "Database & Caching (MySQL, Redis)",
    "DevOps & Deployments (Docker, AWS)"
  ];

  return (
    <SectionWrapper id="education" className="bg-[var(--surface)]/30 border-t border-[var(--border)]">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Side: Professional Card & Core Info */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={itemVariants}>
            <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Overview</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text)]">
              My <span className="gradient-text">Background.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 sm:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-sm)] space-y-6 hover:shadow-[var(--shadow-md)] transition-all duration-[var(--duration-base)]"
          >
            {/* Professional Side Paragraph */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--primary)]" />
                My Professional Side
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                I am an AI/ML engineer focused on building production-grade agentic architectures and
                intelligent systems in production. I specialize in designing multi-agent workflows, real-time
                voice pipelines, computer vision, and forecasting models. I leverage strong backend
                engineering and modern ML frameworks to solve real-world automation challenges in
                production environments.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)]" />

            {/* Quick Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)]">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)]">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">Location</p>
                  <p className="text-sm text-[var(--text)] font-medium">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)]">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">Education</p>
                  <p className="text-sm text-[var(--text)] font-medium">
                    B.Tech in Computer Science and Engineering
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)]" />

            {/* Expandable Core Areas */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group/title select-none"
                onClick={() => setCoreExpanded(!coreExpanded)}
              >
                <h3 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider group-hover/title:text-[var(--primary)] transition-colors">
                  Core Areas
                </h3>
                <motion.div
                  animate={{ rotate: coreExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--muted)] group-hover/title:text-[var(--text)] transition-colors"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </div>
              
              <AnimatePresence initial={false}>
                {coreExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pt-1">
                      {coreAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:border-[var(--primary)] hover:text-[var(--text)] transition-colors select-none"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Education Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={itemVariants}>
            <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Timeline</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text)]">
              Academic <span className="gradient-text">Journey.</span>
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} className="relative pl-6 sm:pl-8 space-y-6 border-l border-[var(--border)]">
            {educationData.map((edu, idx) => {
              const isUniversity = idx === 0;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 hover:shadow-[var(--shadow-md)] hover:border-[var(--primary)] transition-all duration-[var(--duration-base)]"
                >
                  {/* Circle dot on vertical timeline */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full border-2 bg-[var(--background)] flex items-center justify-center transition-colors duration-[var(--duration-fast)] ${isUniversity ? "border-[var(--primary)]" : "border-[var(--muted)] group-hover:border-[var(--primary)]"
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isUniversity ? "bg-[var(--primary)]" : "bg-transparent group-hover:bg-[var(--primary)]"}`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      {edu.period && (
                        <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest">
                          {edu.period}
                        </span>
                      )}
                      <h3 className="mt-1 text-lg font-bold text-[var(--text)] flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-[var(--text-secondary)] mt-0.5">
                        {edu.degree}
                      </p>
                    </div>

                    <div className="sm:text-right mt-1 sm:mt-0 flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[var(--primary-muted)] text-[var(--primary)]">
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
}
