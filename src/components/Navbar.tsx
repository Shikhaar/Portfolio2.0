"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ThemeToggle } from "./ThemeToggle";
import type { SiteConfig, Socials } from "@/types";

interface NavbarProps {
  socials: Socials;
  siteConfig: SiteConfig;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ socials, siteConfig }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    
    // Intersection Observer to highlight active section in navbar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = ["about", "projects", "skills", "experience", "education", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handler);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`relative flex items-center justify-between w-full max-w-5xl h-14 px-5 rounded-full border transition-all duration-350 ${
          scrolled
            ? "bg-[var(--surface)]/85 backdrop-blur-md border-[var(--border)] shadow-[var(--shadow-md)]"
            : "bg-[var(--surface)]/45 backdrop-blur-sm border-[var(--border)]/45 shadow-sm"
        }`}
      >
        {/* Left: Logo wrapped in a flex-1 container */}
        <div className="flex-1 flex justify-start z-10">
          <a
            href="#"
            className="h-8 flex items-center group tracking-tight text-[var(--text)] gap-1"
          >
            {/* Main name */}
            <span className="font-black text-sm tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--primary)]">
              shikhar
            </span>
            
            {/* Creative rotating AI spark instead of dot */}
            <span className="relative flex items-center justify-center w-3 h-3 text-[var(--primary)] transition-transform duration-500 ease-out group-hover:rotate-90 select-none">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C12 0 12 12 0 12C12 12 12 12 12 24C12 24 12 12 24 12C12 12 12 0 12 0Z" />
              </svg>
            </span>
            
            {/* Monospace dev label */}
            <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text)] select-none">
              dev
            </span>
          </a>
        </div>

        {/* Center: Desktop Nav (Perfectly centered using flexbox column layout) */}
        <div
          className="hidden md:flex items-center gap-1 h-8 z-10"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative h-8 px-4 flex items-center justify-center text-xs font-semibold tracking-wide transition-colors duration-250 rounded-full select-none ${
                  isActive
                    ? "text-white font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                
                {/* Active sliding pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-[var(--primary)] rounded-full -z-10 shadow-[0_2px_8px_rgba(231,71,60,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover sliding pill */}
                {hoveredIdx === idx && !isActive && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-[var(--surface-hover)] border border-[var(--border)]/40 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right: Actions Toolbar wrapped in a flex-1 container */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-1.5 z-10 h-8">
          <button
            onClick={() => {
              const event = new CustomEvent("open-command-palette");
              window.dispatchEvent(event);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
            aria-label="Search"
          >
            <Search size={14} />
          </button>

          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size={14} />
          </a>
          
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={14} />
          </a>

          <ThemeToggle />

          <a
            href={siteConfig.resumeUrl}
            className="ml-1 h-8 px-4 flex items-center justify-center text-xs font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-full transition-all duration-150 shadow-[var(--shadow-sm)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu trigger wrapped in z-10 container */}
        <div className="md:hidden flex items-center z-10">
          <button
            className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-4 right-4 z-40 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-[var(--shadow-xl)] backdrop-blur-md overflow-hidden p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] rounded-2xl transition-colors font-semibold"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--border)] flex items-center gap-3 mt-2 px-2">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                  aria-label="GitHub"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={16} />
                </a>
                
                <ThemeToggle />
                
                <a
                  href={siteConfig.resumeUrl}
                  className="ml-auto px-4 py-2 text-xs font-semibold text-white bg-[var(--primary)] rounded-full"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
