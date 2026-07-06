export interface ProjectMeta {
  id: string;
  title: string;
  subtitle: string;
  category: string[];
  tags: string[];
  featured: boolean;
  recruiterHighlight: boolean;
  order: number;
  color: string;
  diagram: string;
  metrics: Array<{ label: string; value: string }>;
  // "concept" = not yet shipped (shown in R&D section); omitted/shipped = production
  status?: "shipped" | "concept";
  // Per-project links — leave empty string to hide the button
  repoUrl?: string;
  demoUrl?: string;
  outcome?: string;
}

export interface Project extends ProjectMeta {
  slug: string;
  content: string;
}

export interface SkillDomain {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: Array<{ name: string; tier: "Expert" | "Proficient" | "Familiar" }>;
  projects: string[];
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  available: boolean;
  availabilityNote: string;
  email: string;
  calLink: string;
  resumeUrl: string;
  seo: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    twitterHandle: string;
  };
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
  cal: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type ProjectCategory =
  | "All"
  | "LLMs"
  | "Computer Vision"
  | "Time Series"
  | "Voice AI"
  | "Backend";
