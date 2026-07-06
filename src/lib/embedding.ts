import fs from "fs";
import path from "path";
import type { ContentChunk } from "./content";

const EMBEDDINGS_PATH = path.join(process.cwd(), "content", "embeddings.json");

interface EmbeddingEntry {
  chunk: ContentChunk;
  embedding: number[];
}

let cache: EmbeddingEntry[] | null = null;

export function loadEmbeddings(): EmbeddingEntry[] {
  if (cache) return cache;
  if (!fs.existsSync(EMBEDDINGS_PATH)) return [];
  try {
    cache = JSON.parse(fs.readFileSync(EMBEDDINGS_PATH, "utf-8"));
    return cache!;
  } catch {
    return [];
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function findTopChunks(
  queryEmbedding: number[],
  topK = 5
): ContentChunk[] {
  const entries = loadEmbeddings();
  if (entries.length === 0) return [];

  return entries
    .map((entry) => ({
      chunk: entry.chunk,
      score: cosineSimilarity(queryEmbedding, entry.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((r) => r.score > 0.2)
    .map((r) => r.chunk);
}
