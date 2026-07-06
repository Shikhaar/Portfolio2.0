"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Briefcase, Code2, User, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();

  const COMMANDS: Command[] = [
    {
      id: "projects",
      label: "View Projects",
      description: "Go to projects section",
      icon: <Code2 size={16} />,
      action: () => { document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "about",
      label: "About",
      description: "Learn about Shikhar",
      icon: <User size={16} />,
      action: () => { document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work history and timeline",
      icon: <Briefcase size={16} />,
      action: () => { document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: <Mail size={16} />,
      action: () => { document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Get the PDF",
      icon: <FileText size={16} />,
      action: () => { window.open("/resume.pdf", "_blank"); setOpen(false); },
      category: "Actions",
    },
    {
      id: "chat",
      label: "Open AI Assistant",
      description: "Ask me anything",
      icon: <Search size={16} />,
      action: () => { window.dispatchEvent(new CustomEvent("open-chat")); setOpen(false); },
      category: "Actions",
    },
    {
      id: "theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      description: "Toggle color theme",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); },
      category: "Preferences",
    },
  ];

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-palette", handler);
    return () => window.removeEventListener("open-command-palette", handler);
  }, []);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  const filtered = COMMANDS.filter(
    (cmd) =>
      !query ||
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
              <Search size={16} className="text-[var(--muted)] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, sections, commands..."
                className="flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--muted)] text-sm focus:outline-none"
              />
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category}>
                  <p className="px-4 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">
                    {category}
                  </p>
                  {cmds.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--surface-hover)] transition-colors group"
                    >
                      <span className="p-1.5 rounded-lg bg-[var(--surface-hover)] text-[var(--primary)] group-hover:bg-[var(--primary-muted)]">
                        {cmd.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text)]">{cmd.label}</p>
                        {cmd.description && (
                          <p className="text-xs text-[var(--muted)]">{cmd.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-sm text-center text-[var(--muted)]">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>

            <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-3">
              <kbd className="text-[10px] bg-[var(--surface-hover)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">↵</kbd>
              <span className="text-[10px] text-[var(--muted)]">to select</span>
              <kbd className="text-[10px] bg-[var(--surface-hover)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">esc</kbd>
              <span className="text-[10px] text-[var(--muted)]">to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
