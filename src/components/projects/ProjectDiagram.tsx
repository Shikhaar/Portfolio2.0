"use client";

import { motion } from "framer-motion";

interface Step {
  label: string;
  icon?: string;
}

interface Diagram {
  steps: Step[];
  layout: "vertical" | "horizontal";
}

const DIAGRAMS: Record<string, Diagram> = {
  "voice-ai": {
    layout: "vertical",
    steps: [
      { label: "Android Client (LiveKit SDK)" },
      { label: "FastAPI Gateway + JWT Auth" },
      { label: "Pipecat Orchestrator" },
      { label: "OpenAI Realtime API (VAD + ASR + LLM + TTS)" },
      { label: "Qdrant Vector DB + Harrier-OSS Embeddings" },
      { label: "MySQL + Redis (Live Data + Session)" },
    ],
  },
  "zia-chatbot": {
    layout: "vertical",
    steps: [
      { label: "Android / Web Client" },
      { label: "FastAPI /chat (Rate Limited)" },
      { label: "OpenRouter LLM (Llama 4 Scout)" },
      { label: "ToolManager Dispatch" },
      { label: "MySQL (Live Data) + Qdrant (KnowledgeBase)" },
      { label: "NDJSON Stream → Client" },
    ],
  },
  "ai-vehicle-validation": {
    layout: "vertical",
    steps: [
      { label: "Android App → POST /validate-damage" },
      { label: "Fetch Ride-Start + Ride-End Images" },
      { label: "4 Parallel Vision API Calls (GPT-4o)" },
      { label: "Damage Report + Parts Mapper (Regex)" },
      { label: "Analytics DB Ingestor" },
      { label: "JSON Response → Client" },
    ],
  },
  "credit-scoring": {
    layout: "vertical",
    steps: [
      { label: "MySQL + MongoDB (Rides, Wallet, IoT Telemetry)" },
      { label: "Feature Engineering (7 Dimensions)" },
      { label: "City Cohort Percentile Scoring" },
      { label: "Batch Engine (Daily Fleet) + Real-Time API" },
      { label: "Redis Cache + MySQL Analytics DB" },
      { label: "300–900 Score → Operations Dashboard" },
    ],
  },
  "spare-parts-forecaster": {
    layout: "vertical",
    steps: [
      { label: "MySQL Operational + Audit DBs" },
      { label: "SpareFeatures: Daily Consumption Series" },
      { label: "Chronos-2 Zero-Shot Batch Inference" },
      { label: "TSB/SBA Statistical Fallback" },
      { label: "Priority Scoring + Safety Stock" },
      { label: "Purchase Orders + Transfer Routes" },
    ],
  },
  "blacklisting": {
    layout: "vertical",
    steps: [
      { label: "Rider Selfie → /check/blacklisted" },
      { label: "8-Gate Image Validation (MediaPipe)" },
      { label: "AWS Rekognition Collection Search" },
      { label: "Match Found → Return Block + Reason" },
      { label: "Sync Cron: MySQL + Google Sheets → S3 → Rekognition" },
      { label: "Weekly HTML/Excel Reports → Operations" },
    ],
  },
  "website-chatbot": {
    layout: "vertical",
    steps: [
      { label: "Website Visitor" },
      { label: "AnythingLLM Chatbot Interface" },
      { label: "FastMCP Tool Server" },
      { label: "Validation: Mobile, Email, City, Duplicates" },
      { label: "Google Sheets CRM Write" },
      { label: "Lead Captured + App Download Link" },
    ],
  },
  "ocr-system": {
    layout: "vertical",
    steps: [
      { label: "HTTP Request with image_id" },
      { label: "Fetch Image Bytes + MIME Detection" },
      { label: "Nvidia Nemotron-Parse-1.1 (DeepInfra)" },
      { label: "Response Sanitization + Noise Filter" },
      { label: "Regex + Heuristic UID Extraction" },
      { label: "JSON Response: image_id + extracted_uid" },
    ],
  },
  "ai-factory": {
    layout: "vertical",
    steps: [
      { label: "User input: Project prompt or custom YAML workflow" },
      { label: "CPO Council: Strategic plan & frozen execution snapshots" },
      { label: "Governance Engine: Conflict checks & Strategy drift checks" },
      { label: "Workflow Engine: Immutable step DAG compilation" },
      { label: "AgentExecutor: ReAct loop with circuit breaker limits" },
      { label: "Memory (Qdrant) & Native tools execution" },
      { label: "Deployment: Built, tested, and shipped full-stack app" },
    ],
  },
  "movie-recommendator": {
    layout: "vertical",
    steps: [
      { label: "Dataset: TMDB 5,000 Movies & Credits CSV files" },
      { label: "Preprocessing: Parsing JSON tags & PorterStemmer stemming" },
      { label: "Feature Engineering: Combine Overview, Genre, Cast, Crew" },
      { label: "Modeling: Cosine Similarity 4806x4806 Matrix calculation" },
      { label: "Serialization: Compressed movie_dict & similarity Pickles" },
      { label: "Web Server (app.py): Streamlit selectbox & query listener" },
      { label: "External TMDb API Call: Fetch real-time movie posters" },
    ],
  },
};

interface ProjectDiagramProps {
  diagramId: string;
  color: string;
}

export function ProjectDiagram({ diagramId, color }: ProjectDiagramProps) {
  const diagram = DIAGRAMS[diagramId];
  if (!diagram) return null;

  return (
    <div className="bg-[var(--surface-hover)] rounded-2xl p-4 overflow-x-auto">
      <div className="flex flex-col gap-0 min-w-[200px]">
        {diagram.steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-center gap-3 w-full px-3 py-2.5 bg-[var(--surface)] rounded-xl border border-[var(--border)] hover:border-opacity-60 transition-colors"
              style={{ borderLeftColor: color, borderLeftWidth: 3 }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full shrink-0" 
                style={{ backgroundColor: color }} 
              />
              <span className="text-xs font-medium text-[var(--text-secondary)] leading-tight">{step.label}</span>
            </motion.div>
            {i < diagram.steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.2 }}
                className="w-px h-4 ml-4.5 origin-top"
                style={{ background: `${color}50` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
