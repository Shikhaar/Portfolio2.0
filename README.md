# Shikhar Srivastava — Portfolio 2.0

AI/ML Engineer specializing in production-grade agentic AI, real-time voice pipelines, computer vision, time-series forecasting, and high-performance async backends.

Live Site: [shikhar-portfolio-phi.vercel.app](https://shikhar-portfolio-phi.vercel.app)

---

##  Shipped Production AI Systems (Zypp Electric)

During my tenure at Zypp Electric (India's largest EV-first last-mile delivery platform), I built and shipped 8 core production AI systems serving **25,000+ active delivery riders** daily:

1. **Zypp Saathi (Voice AI)**: A real-time multilingual voice assistant built using **Pipecat**, **OpenAI Realtime API**, and **LiveKit WebRTC**. Deflects 40%+ of daily support calls by handling earnings, navigation, and onboarding queries over voice in Hindi and Indic languages.
2. **Zia Chatbot (Phase 3.0)**: Conversational agent runtimes migrated to **LangGraph state machines** with **Qdrant Vector DB** retrieval, resolving 50%+ of daily worker support tickets automatically.
3. **AI Vehicle Validation**: A **GPT-4o Vision** damage validation pipeline analyzing 4 vehicle sides in parallel for ride-ends, saving 100+ manual operations hours/day.
4. **Zybil / Hustle Score (Credit Engine)**: A proprietary 300–900 point credit scoring engine tracking EV IoT telemetry, wallet health, and merchant performance data to automate loan eligibility with a 0.0% default rate.
5. **Spare Parts Forecaster**: Consumption demand forecasting across 15+ cities using **Amazon Chronos-2** with TSB/SBA statistical fallbacks.
6. **Fraud Detection & Blacklisting**: Verification pipeline using **MediaPipe** and **AWS Rekognition** face collections blocking 99.8% of duplicate driver registrations.
7. **Agentic Lead Generator**: AI-agentic chatbot utilizing **FastMCP** tool servers for CRM writes, boosting qualification rates by 28%.
8. **EV Component OCR**: High-accuracy (99.4%) UID and 15-digit IMEI extraction engine optimized via **Nvidia Nemotron-Parse-1.1**.

---

##  Tech Stack & Architecture

- **Backend & Core**: Python (Async), FastAPI, SQLAlchemy, MySQL, Docker, NGINX
- **AI/ML & Audio**: Pipecat, LiveKit (WebRTC), OpenAI (Realtime, GPT-4o Vision), Amazon Chronos-2, MediaPipe, AWS Rekognition, Nvidia Nemotron-Parse
- **Vector Search & Agents**: Qdrant Vector DB, LangGraph, FastMCP (Model Context Protocol)
- **Caching & Scheduling**: Redis, APScheduler / ARQ
- **Frontend**: Next.js 16 (Turbopack), TypeScript, Framer Motion, Vanilla CSS

---

##  Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shikhaar/Portfolio2.0.git
   cd Portfolio2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_key_here
   MODEL_NAME=google/gemini-2.5-flash
   ```

4. **Generate Search Embeddings (For Chat Panel Context):**
   ```bash
   npm run generate-embeddings
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

##  License

This project is licensed under the MIT License.
