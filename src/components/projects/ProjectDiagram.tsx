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
      { label: "Android Client (LiveKit SDK)", icon: "📱" },
      { label: "FastAPI Gateway + JWT Auth", icon: "🔐" },
      { label: "Pipecat Orchestrator", icon: "⚙️" },
      { label: "OpenAI Realtime API (VAD + ASR + LLM + TTS)", icon: "🧠" },
      { label: "Qdrant Vector DB + Harrier-OSS Embeddings", icon: "🔍" },
      { label: "MySQL + Redis (Live Data + Session)", icon: "🗄️" },
    ],
  },
  "zia-chatbot": {
    layout: "vertical",
    steps: [
      { label: "Android / Web Client", icon: "💬" },
      { label: "FastAPI /chat (Rate Limited)", icon: "🔐" },
      { label: "OpenRouter LLM (Llama 4 Scout)", icon: "🧠" },
      { label: "ToolManager Dispatch", icon: "🔧" },
      { label: "MySQL (Live Data) + Qdrant (KnowledgeBase)", icon: "🗄️" },
      { label: "NDJSON Stream → Client", icon: "📡" },
    ],
  },
  "ai-vehicle-validation": {
    layout: "vertical",
    steps: [
      { label: "Android App → POST /validate-damage", icon: "📱" },
      { label: "Fetch Ride-Start + Ride-End Images", icon: "🖼️" },
      { label: "4 Parallel Vision API Calls (GPT-4o)", icon: "👁️" },
      { label: "Damage Report + Parts Mapper (Regex)", icon: "📋" },
      { label: "Analytics DB Ingestor", icon: "📊" },
      { label: "JSON Response → Client", icon: "✅" },
    ],
  },
  "credit-scoring": {
    layout: "vertical",
    steps: [
      { label: "MySQL + MongoDB (Rides, Wallet, IoT Telemetry)", icon: "🗄️" },
      { label: "Feature Engineering (7 Dimensions)", icon: "⚙️" },
      { label: "City Cohort Percentile Scoring", icon: "📊" },
      { label: "Batch Engine (Daily Fleet) + Real-Time API", icon: "⚡" },
      { label: "Redis Cache + MySQL Analytics DB", icon: "💾" },
      { label: "300–900 Score → Operations Dashboard", icon: "📈" },
    ],
  },
  "spare-parts-forecaster": {
    layout: "vertical",
    steps: [
      { label: "MySQL Operational + Audit DBs", icon: "🗄️" },
      { label: "SpareFeatures: Daily Consumption Series", icon: "📉" },
      { label: "Chronos-2 Zero-Shot Batch Inference", icon: "🧠" },
      { label: "TSB/SBA Statistical Fallback", icon: "📊" },
      { label: "Priority Scoring + Safety Stock", icon: "⚖️" },
      { label: "Purchase Orders + Transfer Routes", icon: "🚚" },
    ],
  },
  "blacklisting": {
    layout: "vertical",
    steps: [
      { label: "Rider Selfie → /check/blacklisted", icon: "📸" },
      { label: "8-Gate Image Validation (MediaPipe)", icon: "🔍" },
      { label: "AWS Rekognition Collection Search", icon: "🎯" },
      { label: "Match Found → Return Block + Reason", icon: "🚫" },
      { label: "Sync Cron: MySQL + Google Sheets → S3 → Rekognition", icon: "🔄" },
      { label: "Weekly HTML/Excel Reports → Operations", icon: "📧" },
    ],
  },
  "website-chatbot": {
    layout: "vertical",
    steps: [
      { label: "Website Visitor", icon: "👤" },
      { label: "AnythingLLM Chatbot Interface", icon: "💬" },
      { label: "FastMCP Tool Server", icon: "⚙️" },
      { label: "Validation: Mobile, Email, City, Duplicates", icon: "✅" },
      { label: "Google Sheets CRM Write", icon: "📝" },
      { label: "Lead Captured + App Download Link", icon: "🎉" },
    ],
  },
  "ocr-system": {
    layout: "vertical",
    steps: [
      { label: "HTTP Request with image_id", icon: "📡" },
      { label: "Fetch Image Bytes + MIME Detection", icon: "🖼️" },
      { label: "Nvidia Nemotron-Parse-1.1 (DeepInfra)", icon: "🧠" },
      { label: "Response Sanitization + Noise Filter", icon: "🔧" },
      { label: "Regex + Heuristic UID Extraction", icon: "🔍" },
      { label: "JSON Response: image_id + extracted_uid", icon: "✅" },
    ],
  },
  "ai-factory": {
    layout: "vertical",
    steps: [
      { label: "User input: Project prompt or custom YAML workflow", icon: "👤" },
      { label: "CPO Council: Strategic plan & frozen execution snapshots", icon: "🏛️" },
      { label: "Governance Engine: Conflict checks & Strategy drift checks", icon: "⚖️" },
      { label: "Workflow Engine: Immutable step DAG compilation", icon: "⚙️" },
      { label: "AgentExecutor: ReAct loop with circuit breaker limits", icon: "🧠" },
      { label: "Memory (Qdrant) & Native tools execution", icon: "🗄️" },
      { label: "Deployment: Built, tested, and shipped full-stack app", icon: "🚀" },
    ],
  },
  "movie-recommendator": {
    layout: "vertical",
    steps: [
      { label: "Dataset: TMDB 5,000 Movies & Credits CSV files", icon: "📁" },
      { label: "Preprocessing: Parsing JSON tags & PorterStemmer stemming", icon: "🧹" },
      { label: "Feature Engineering: Combine Overview, Genre, Cast, Crew", icon: "⚙️" },
      { label: "Modeling: Cosine Similarity 4806x4806 Matrix calculation", icon: "📐" },
      { label: "Serialization: Compressed movie_dict & similarity Pickles", icon: "💾" },
      { label: "Web Server (app.py): Streamlit selectbox & query listener", icon: "🌐" },
      { label: "External TMDb API Call: Fetch real-time movie posters", icon: "🎬" },
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
              <span className="text-base leading-none">{step.icon}</span>
              <span className="text-xs font-medium text-[var(--text-secondary)] leading-tight">{step.label}</span>
            </motion.div>
            {i < diagram.steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.2 }}
                className="w-px h-4 ml-6 origin-top"
                style={{ background: `${color}50` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
