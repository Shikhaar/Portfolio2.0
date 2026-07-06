"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory } from "@/types";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "LLMs",
  "Computer Vision",
  "Time Series",
  "Voice AI",
  "Backend",
];

interface ProjectsSectionProps {
  projects: Project[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [search, setSearch] = useState("");

  // Separate shipped production systems from concept/R&D projects
  const shippedProjects = projects.filter((p) => p.status !== "concept");
  const conceptProjects = projects.filter((p) => p.status === "concept");

  const filtered = shippedProjects.filter((p) => {
    const matchesCategory =
      activeFilter === "All" || p.category.includes(activeFilter);
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <SectionWrapper id="projects" className="bg-[var(--surface)]/50">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Projects</span>
        <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
          Production AI, <span className="gradient-text">end-to-end.</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl">
          Each project is a case study in real-world AI engineering — from problem statement to architecture to production impact.
        </p>
      </motion.div>

      {/* Filter + Search Bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-150 ${
                activeFilter === cat
                  ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto">
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>
      </motion.div>

      {/* Shipped Projects Grid */}
      <motion.div
        variants={itemVariants}
        layout
        className="grid md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 text-center py-20 text-[var(--muted)]"
          >
            No projects found for &ldquo;{search}&rdquo; in {activeFilter}.
          </motion.p>
        )}
      </motion.div>

      {/* Concept / R&D Projects — shown only when no category filter active */}
      {activeFilter === "All" && !search && conceptProjects.length > 0 && (
        <motion.div variants={itemVariants} className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 border-t border-dashed border-[var(--border)]" />
            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest px-2">
              Exploring / R&amp;D
            </span>
            <div className="h-px flex-1 border-t border-dashed border-[var(--border)]" />
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-2xl">
            Architectural concepts and systems in active design — not yet shipped to production.
          </p>
          <div className="grid md:grid-cols-2 gap-6 border border-dashed border-[var(--border)] rounded-3xl p-6">
            {conceptProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isConcept />
            ))}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
