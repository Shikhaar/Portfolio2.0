#!/usr/bin/env node
/**
 * Embeddings Generator
 *
 * Run: npm run generate-embeddings
 *
 * Reads all content markdown files, splits them into sections,
 * embeds each with OpenAI text-embedding-3-small (or a lightweight
 * local model if no key), and saves to content/embeddings.json.
 *
 * Requires OPENROUTER_API_KEY or OPENAI_API_KEY in .env.local
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const OUTPUT_PATH = path.join(CONTENT_DIR, "embeddings.json");

// Load .env.local
function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

// Parse frontmatter from MDX
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const content = raw.replace(/^---\n[\s\S]*?\n---/, "").trim();
  let meta = {};
  if (match) {
    try {
      // Simple YAML key: value parsing
      for (const line of match[1].split("\n")) {
        const colonIdx = line.indexOf(":");
        if (colonIdx < 0) continue;
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim().replace(/^"|"$/g, "");
        if (val) meta[key] = val;
      }
    } catch {}
  }
  return { meta, content };
}

// Split content into chunks by ## section headers
function chunkContent(content, sourceLabel, title = "") {
  const sections = content.split(/^## /m).filter(Boolean);
  const chunks = [];
  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = lines[0].replace(/^#+\s*/, "").trim();
    const text = lines.slice(1).join("\n").trim();
    if (text.length < 50) continue;
    chunks.push({
      id: `${sourceLabel}:${heading}`.toLowerCase().replace(/\s+/g, "-"),
      source: sourceLabel,
      heading,
      text: title ? `${title}\n\n${text}` : text,
    });
  }
  // Also add the full doc as one chunk (first 800 chars)
  if (sections.length > 0) {
    chunks.push({
      id: `${sourceLabel}:overview`,
      source: sourceLabel,
      heading: "Overview",
      text: sections.join(" ").replace(/#+/g, "").replace(/\n+/g, " ").slice(0, 800),
    });
  }
  return chunks;
}

// Collect all content chunks
function collectChunks() {
  const chunks = [];

  // Projects
  if (fs.existsSync(PROJECTS_DIR)) {
    const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { meta, content } = parseFrontmatter(raw);
      const label = `Project: ${meta.title || file.replace(".mdx", "")}`;
      chunks.push(...chunkContent(content, label, meta.subtitle || ""));
    }
  }

  // Experience
  const expPath = path.join(CONTENT_DIR, "experience.mdx");
  if (fs.existsSync(expPath)) {
    const { content } = parseFrontmatter(fs.readFileSync(expPath, "utf-8"));
    chunks.push(...chunkContent(content, "Experience"));
  }

  // Education
  const eduPath = path.join(CONTENT_DIR, "education.json");
  if (fs.existsSync(eduPath)) {
    try {
      const education = JSON.parse(fs.readFileSync(eduPath, "utf-8"));
      for (const item of education) {
        chunks.push({
          id: `education:${item.institution.toLowerCase().replace(/\s+/g, "-")}-${item.degree.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          source: "Education",
          heading: item.period ? `${item.institution} (${item.period})` : item.institution,
          text: `${item.degree} — Grade: ${item.grade}\n\n${item.description}`
        });
      }
    } catch (e) {
      console.error("Error parsing education.json in embeddings generator:", e);
    }
  }

  // About
  const aboutPath = path.join(CONTENT_DIR, "about.mdx");
  if (fs.existsSync(aboutPath)) {
    const { content } = parseFrontmatter(fs.readFileSync(aboutPath, "utf-8"));
    chunks.push({ id: "about:overview", source: "About", heading: "About Shikhar", text: content.slice(0, 1200) });
  }

  return chunks;
}

// Embed a batch of texts
async function embedBatch(texts, apiKey, baseUrl) {
  const response = await fetch(`${baseUrl}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: texts,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Embedding API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.data.map((d) => d.embedding);
}

async function main() {
  loadEnv();

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENROUTER_API_KEY
    ? "https://openrouter.ai/api/v1"
    : "https://api.openai.com/v1";

  const chunks = collectChunks();
  console.log(`📚 Found ${chunks.length} content chunks`);

  if (!apiKey) {
    console.log("⚠️  No API key found. Saving chunks without embeddings.");
    console.log("   Set OPENROUTER_API_KEY or OPENAI_API_KEY in .env.local");
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2));
    return;
  }

  // Embed in batches of 20
  const BATCH_SIZE = 20;
  const entries = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => `${c.source} — ${c.heading}\n\n${c.text}`.slice(0, 2000));

    console.log(`🔄 Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`);

    try {
      const embeddings = await embedBatch(texts, apiKey, baseUrl);
      for (let j = 0; j < batch.length; j++) {
        entries.push({ chunk: batch[j], embedding: embeddings[j] });
      }
    } catch (err) {
      console.error("❌ Batch failed:", err.message);
    }

    // Rate limit delay
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2));
  console.log(`✅ Saved ${entries.length} embeddings to content/embeddings.json`);
  console.log(`   File size: ${(fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
