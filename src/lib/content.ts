import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        ...(data as ProjectMeta),
        slug,
        content,
      } as Project;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as ProjectMeta), slug, content } as Project;
}

export function getAbout(): string {
  const filePath = path.join(CONTENT_DIR, "about.mdx");
  if (!fs.existsSync(filePath)) return "";
  const { content } = matter(fs.readFileSync(filePath, "utf-8"));
  return content;
}

export function getExperience(): string {
  const filePath = path.join(CONTENT_DIR, "experience.mdx");
  if (!fs.existsSync(filePath)) return "";
  const { content } = matter(fs.readFileSync(filePath, "utf-8"));
  return content;
}

export function getResume(): string {
  const filePath = path.join(CONTENT_DIR, "resume.mdx");
  if (!fs.existsSync(filePath)) return "";
  const { content } = matter(fs.readFileSync(filePath, "utf-8"));
  return content;
}

// ─── Content Chunks for Semantic Search ───────────────────
export interface ContentChunk {
  id: string;
  source: string;
  heading: string;
  text: string;
}

export function getAllContentChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // Chunk all projects
  const projects = getAllProjects();
  for (const project of projects) {
    const sections = project.content.split(/^## /m).filter(Boolean);
    for (const section of sections) {
      const lines = section.trim().split("\n");
      const heading = lines[0].replace(/^#+\s*/, "").trim();
      const text = lines.slice(1).join("\n").trim();
      if (text.length > 50) {
        chunks.push({
          id: `project:${project.slug}:${heading}`,
          source: `Project: ${project.title}`,
          heading,
          text: `${project.title} — ${project.subtitle}\n\n${text}`,
        });
      }
    }
  }

  // Chunk experience
  const experience = getExperience();
  if (experience) {
    const sections = experience.split(/^## /m).filter(Boolean);
    for (const section of sections) {
      const lines = section.trim().split("\n");
      const heading = lines[0].trim();
      const text = lines.slice(1).join("\n").trim();
      if (text.length > 50) {
        chunks.push({
          id: `experience:${heading}`,
          source: "Experience",
          heading,
          text,
        });
      }
    }
  }

  // Chunk about
  const about = getAbout();
  if (about) {
    chunks.push({
      id: "about",
      source: "About",
      heading: "About Shikhar",
      text: about,
    });
  }

  return chunks;
}
