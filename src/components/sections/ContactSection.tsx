"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Mail, Calendar, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import type { SiteConfig, Socials } from "@/types";

interface ContactSectionProps {
  socials: Socials;
  siteConfig: SiteConfig;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const contactLinks = (socials: Socials, siteConfig: SiteConfig) => [
  {
    label: "Email",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${socials.email}`,
    icon: <Mail size={20} />,
    description: "Direct line",
  },
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: <LinkedinIcon size={20} />,
    description: "Professional profile",
  },
  {
    label: "GitHub",
    href: socials.github,
    icon: <GithubIcon size={20} />,
    description: "Code & projects",
  },
  ...(socials.cal
    ? [
        {
          label: "Book a Call",
          href: socials.cal,
          icon: <Calendar size={20} />,
          description: "30-min intro",
        },
      ]
    : []),
  {
    label: "Resume",
    href: siteConfig.resumeUrl,
    icon: <Download size={20} />,
    description: "Download PDF",
  },
];

export function ContactSection({ socials, siteConfig }: ContactSectionProps) {
  const links = contactLinks(socials, siteConfig);

  return (
    <SectionWrapper id="contact" className="bg-[var(--surface)]/40">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div variants={itemVariants}>
          <span className="text-sm font-semibold text-[var(--primary)] tracking-widest uppercase">Contact</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            Let&apos;s build something <span className="gradient-text">together.</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            I&apos;m open to collaborations and interesting conversations about AI engineering.
          </p>
        </motion.div>

        {/* Contact grid (2-2 layout) */}
        <motion.div
          variants={itemVariants}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-all duration-[var(--duration-fast)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]"
            >
              <span className="p-2.5 rounded-xl flex-shrink-0 bg-[var(--primary-muted)] text-[var(--primary)] transition-colors duration-250 group-hover:bg-[var(--primary)] group-hover:text-white">
                {link.icon}
              </span>
              <div className="text-left">
                <p className="font-semibold text-sm text-[var(--text)]">
                  {link.label}
                </p>
                <p className="text-xs mt-0.5 text-[var(--muted)]">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
