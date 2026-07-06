"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import socials from "../../content/socials.json";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur-sm py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <p className="text-sm font-semibold text-[var(--text)] select-none">
            © {currentYear} Shikhar Srivastava
          </p>
          <p className="text-xs text-[var(--muted)]">
            Built with Next.js, TypeScript, Custom Vanilla CSS, & Framer Motion. <span className="text-[var(--primary)]">✦</span>
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="p-2 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={socials.resume}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all"
            aria-label="Resume"
          >
            <FileText size={16} />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] bg-[var(--surface-hover)] hover:bg-[var(--border)] border border-[var(--border)] rounded-full transition-all cursor-pointer select-none"
          aria-label="Scroll to top"
        >
          <span>Back to top</span>
          <ArrowUp size={12} className="animate-bounce" />
        </button>

      </div>
    </footer>
  );
}
