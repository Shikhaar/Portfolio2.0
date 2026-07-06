"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/types";
import { ProjectDiagram } from "./ProjectDiagram";

interface ProjectCardProps {
  project: Project;
  isConcept?: boolean;
}

export function ProjectCard({ project, isConcept = false }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Parse sections from markdown content
  const sections = parseSections(project.content);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-[var(--shadow-xl)] hover:border-[var(--primary)] transition-[box-shadow,border-color] duration-[var(--duration-slow)] group"
    >
      {/* Header */}
      <div
        className="relative p-6 pb-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        aria-controls={`project-${project.id}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
      >
        {/* Color accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }}
        />

        <div className="flex items-start justify-between gap-4 mt-2">
          <div className="space-y-2 flex-1">
            {/* Categories + concept badge */}
            <div className="flex gap-2 flex-wrap items-center">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                  style={{ background: `${project.color}18`, color: project.color }}
                >
                  {cat}
                </span>
              ))}
              {isConcept && (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--surface-hover)] border border-dashed border-[var(--border)] text-[var(--muted)]">
                  Concept - Not Shipped
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[var(--text)] tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">{project.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.15 }}
                className="p-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors duration-[var(--duration-fast)] block"
                title="View Source Code"
              >
                <GithubIcon size={16} />
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ rotate: 45, scale: 1.1 }}
                transition={{ duration: 0.15 }}
                className="p-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors duration-[var(--duration-fast)] block"
                title="View Live Demo"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1"
            >
              <ChevronDown size={18} className="text-[var(--muted)]" />
            </motion.div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex gap-1.5 flex-wrap">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2 py-0.5 text-xs rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)]">
              +{project.tags.length - 5} more
            </span>
          )}
        </div>

        {/* Outcome Highlight Statement */}
        {project.outcome && (
          <p className="mt-4 text-xs sm:text-sm font-semibold text-[var(--text)] border-l-2 pl-3" style={{ borderColor: project.color }}>
            {project.outcome}
          </p>
        )}

        {/* Metrics preview */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 4).map((metric) => {
              const isTodo = metric.value.startsWith("TODO");
              return (
                <div
                  key={metric.label}
                  className={`p-2.5 rounded-xl ${isTodo ? "bg-orange-500/5 border border-dashed border-orange-500/20" : "bg-[var(--surface-hover)]"}`}
                >
                  <p className={`text-lg font-bold leading-none ${isTodo ? "text-orange-400 text-xs" : "text-[var(--text)]"}`}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{metric.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`project-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-6 border-t border-[var(--border)]">
              {/* Architecture Diagram */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-3">Architecture</p>
                <ProjectDiagram diagramId={project.diagram} color={project.color} />
              </div>

              {/* Case study sections */}
              {sections.map((section) => (
                <div key={section.heading}>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-2 flex items-center gap-2">
                    <span
                      className="w-1 h-4 rounded-full flex-shrink-0"
                      style={{ background: project.color }}
                    />
                    {section.heading}
                  </h4>
                  <div
                    className="text-sm text-[var(--text-secondary)] leading-relaxed prose-sm"
                    dangerouslySetInnerHTML={{ __html: simpleMarkdown(section.text) }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function parseSections(content: string) {
  const rawSections = content.split(/^## /m).filter(Boolean);
  return rawSections.map((s) => {
    const lines = s.trim().split("\n");
    return {
      heading: lines[0].replace(/^#+\s*/, "").trim(),
      text: lines.slice(1).join("\n").trim(),
    };
  }).filter((s) => s.text.length > 10);
}

function simpleMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-[var(--surface-hover)] rounded text-xs font-mono">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li[\s\S]*<\/li>)/, '<ul class="list-disc list-inside space-y-1">$1</ul>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
