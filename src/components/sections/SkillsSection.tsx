"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Mic, Eye, Brain, TrendingUp, Server } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Mic: <Mic size={18} />,
  Eye: <Eye size={18} />,
  Brain: <Brain size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Server: <Server size={18} />,
};

const TIER_CONFIG: Record<string, { label: string; className: string }> = {
  Expert:     { label: "Expert",     className: "bg-[var(--primary-muted)] text-[var(--primary)] border border-[var(--primary)]/30" },
  Proficient: { label: "Proficient", className: "bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]" },
  Familiar:   { label: "Familiar",   className: "bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)]" },
};

interface SkillsSectionProps {
  skills: {
    domains: Array<{
      id: string;
      label: string;
      icon: string;
      color: string;
      skills: Array<{ name: string; tier: "Expert" | "Proficient" | "Familiar" }>;
      projects: string[];
    }>;
  };
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 22 },
  },
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeDomain, setActiveDomain] = useState(skills.domains[0]?.id ?? "");
  const domain = skills.domains.find((d) => d.id === activeDomain);

  return (
    <SectionWrapper id="skills">
      <motion.div variants={itemVariants} className="mb-12">
        <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Skills</span>
        <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
          Tools of the <span className="gradient-text">trade.</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl">
          Technologies I use in production, organised by domain. Tiers reflect hands-on production use - verified by the projects listed below each domain.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Domain selector */}
        <motion.div variants={itemVariants} className="space-y-2">
          {skills.domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDomain(d.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-[var(--duration-fast)] border ${
                activeDomain === d.id
                  ? "border-[var(--primary)] shadow-[var(--shadow-md)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
              }`}
              style={activeDomain === d.id ? { background: `${d.color}12`, borderColor: d.color } : {}}
              aria-pressed={activeDomain === d.id}
            >
              <span className="p-2 rounded-xl" style={{ background: `${d.color}18`, color: d.color }}>
                {ICONS[d.icon]}
              </span>
              <span
                className="text-sm font-semibold"
                style={activeDomain === d.id ? { color: d.color } : { color: "var(--text)" }}
              >
                {d.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills detail panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {domain && (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl" style={{ background: `${domain.color}18`, color: domain.color }}>
                    {ICONS[domain.icon]}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text)]">{domain.label}</h3>
                </div>

                {/* Tier legend */}
                <div className="flex gap-2 flex-wrap">
                  {(["Expert", "Proficient", "Familiar"] as const).map((t) => (
                    <span key={t} className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${TIER_CONFIG[t].className}`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Skills list with tier badges */}
                <div className="grid grid-cols-1 gap-2">
                  {domain.skills.map((skill, i) => {
                    const tier = TIER_CONFIG[skill.tier];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]/60"
                      >
                        <span className="text-sm font-medium text-[var(--text)]">{skill.name}</span>
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide ${tier.className}`}>
                          {tier.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Used-in project links - evidence anchor for tier claims */}
                <div>
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">Used in</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.projects.map((projectId) => (
                      <a
                        key={projectId}
                        href="#projects"
                        className="px-3 py-1 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-colors"
                      >
                        {projectId === "blacklisting"
                          ? "Fraud Detection"
                          : projectId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
