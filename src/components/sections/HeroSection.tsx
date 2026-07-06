"use client";

import { motion } from "framer-motion";
import { HeroAvatar } from "@/components/HeroAvatar";
import { BackgroundKeywords } from "@/components/BackgroundKeywords";
import type { SiteConfig } from "@/types";

interface HeroSectionProps {
  siteConfig: SiteConfig;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection({ siteConfig }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
    >
      <BackgroundKeywords />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">

            {/* Headline */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-[var(--text)]">
                {siteConfig.name
                  .split(" ")
                  .map((part, i) =>
                    i === 0 ? (
                      <span key={i}>{part} </span>
                    ) : (
                      <span key={i} className="gradient-text block sm:inline">
                        {part}
                      </span>
                    )
                  )}
              </h1>
              <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-medium">
                {siteConfig.title}{" "}
                <span className="text-[var(--muted)] text-lg">/ {siteConfig.tagline}</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-2xl transition-colors duration-150 text-sm"
              >
                View Projects
              </a>
              <button
                onClick={() => {
                  const event = new CustomEvent("open-chat");
                  window.dispatchEvent(event);
                }}
                className="px-6 py-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:scale-[1.02] active:scale-[0.98] text-[var(--text)] font-semibold rounded-2xl transition-all duration-[var(--duration-fast)] shadow-[var(--shadow-sm)] cursor-pointer"
              >
                Ask me anything ✦
              </button>
            </motion.div>

          </div>
          
          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <HeroAvatar />
          </motion.div>
        </div>

        {/* Dynamic Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[var(--border)] flex justify-center p-1 hover:border-[var(--primary)] transition-colors duration-150">
            <motion.div
              className="w-1 h-2 rounded-full bg-[var(--primary)]"
              animate={{
                y: [0, 10, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
