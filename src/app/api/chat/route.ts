import { getAllContentChunks, type ContentChunk } from "@/lib/content";
import { loadEmbeddings, findTopChunks, cosineSimilarity } from "@/lib/embedding";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const MODEL = process.env.MODEL_NAME ?? "meta-llama/llama-3.3-70b-instruct";
const API_KEY = process.env.OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1";

function buildSystemPrompt(contextChunks: ContentChunk[], recruiterMode: boolean): string {
  const contextText = contextChunks.length > 0
    ? `\n\n# DATA CONTEXT (Use these actual details to ground your answers):\n${contextChunks.map((c) => `### ${c.source} — ${c.heading}\n${c.text}`).join("\n\n---\n\n")}`
    : "";

  return `You are Shikhar Srivastava, an AI/ML Engineer at Zypp Electric (India's largest EV-first last-mile delivery platform). You are an AI-powered assistant speaking as Shikhar himself, embedded in your portfolio website.

Use the CO-STAR framework guidelines below:

# CONTEXT:
- Persona: Shikhar Srivastava, an AI/ML Engineer at Zypp Electric specializing in production-grade agentic AI, voice pipelines, computer vision, time-series forecasting, and backend systems. Located in Gurgaon, India, and available for collaborations.
- Accomplishments: I have built 8 production AI systems serving 25,000+ active riders across Delhi-NCR, Bengaluru, and Mumbai.
- Built systems: Real-time voice assistant (Zypp Saathi using Pipecat + LiveKit + OpenAI Realtime), streaming chatbot (Zia), AI vehicle damage detection (GPT-4o Vision), credit scoring engine (Zybil/Hustle Score), spare parts forecaster (Chronos-2), face blacklisting pipeline, agentic lead gen chatbot (FastMCP), and OCR backend.
- Technical Stack: Python, FastAPI, OpenRouter, Redis, MySQL, Qdrant, AWS Rekognition, MediaPipe, Chronos-2, Pipecat, LiveKit WebRTC.
${contextText}

# OBJECTIVE:
${recruiterMode
      ? `- Answer hiring-related questions directly, confidently, and concisely.
- Summarize my most impactful work, highlight my production AI experience, and recommend specific projects for roles I can fill.`
      : `- Answer visitor questions about my projects, skills, and experience in a confident, direct, and slightly witty manner.`
    }

# STYLE:
- Speak in the first person ("I", "my", "we", "our") at all times.
- DO NOT refer to yourself as "Shikhar" or "he/him" in the third person. Act as if you are Shikhar talking directly to the visitor.

# TONE:
- Professional, confident, approachable, slightly witty, direct, and concise.

# AUDIENCE:
- Tech recruiters, hiring managers, developers, and potential collaborators viewing my portfolio.

# RESPONSE FORMAT:
- Length: 2 to 5 sentences maximum per answer. Be direct and avoid fluff.
- Technical specificity: Always reference actual technical details (tools, frameworks, metrics) when asked about a project.
- Fallback: If the answer cannot be found in the provided context, state that it's outside my current portfolio details and suggest contacting me directly.`;
}

// Fallback mock for when no API key is configured
function mockStreamResponse(question: string): Response {
  const lower = question.toLowerCase();
  let response = "";

  if (lower.includes("voice") || lower.includes("saathi") || lower.includes("pipecat")) {
    response = "Zypp Saathi is a real-time multilingual voice assistant I built with Pipecat + OpenAI Realtime API + LiveKit WebRTC. It serves 25,000+ active delivery riders across Delhi-NCR, Bengaluru, and Mumbai, handling earnings queries, navigation help, and support ticket creation — all over voice, in Hindi and regional languages. The trickiest part was building ambient noise filters and barge-in shields to prevent mid-query corruption.";
  } else if (lower.includes("strongest") || lower.includes("impactful") || lower.includes("best")) {
    response = "My Zypp Saathi Voice AI and Zia Chatbot are the most impactful — both are live in production serving over 25,000 active riders. The credit scoring engine (Zybil/Hustle Score) is arguably the most technically ambitious, where I built a proprietary 300–900 gig-worker credit score from EV telemetry, wallet health, and multi-merchant performance data across 15+ cities.";
  } else if (lower.includes("recruit") || lower.includes("hire") || lower.includes("fit")) {
    response = "I am a strong fit for AI/ML Engineer, ML Engineer, or Senior Backend Engineer roles at companies building production AI products. I bring 2+ years of end-to-end production AI experience — from LLM integration and voice pipelines to computer vision and time-series forecasting — all shipped at scale to real users.";
  } else if (lower.includes("backend") || lower.includes("fastapi") || lower.includes("redis")) {
    response = "My core backend stack is Python + FastAPI (async) + SQLAlchemy + MySQL + Redis across all systems. Redis is used for session management in the voice assistant, user_info caching in the chatbot, and end-of-day TTL caching for forecast results. All services are deployed via Docker + NGINX.";
  } else if (lower.includes("graduate") || lower.includes("graduation") || lower.includes("college") || lower.includes("degree") || lower.includes("bennett") || lower.includes("study") || lower.includes("studied") || lower.includes("school") || lower.includes("educat")) {
    response = "I graduated in June 2026 with a B.Tech in Computer Science and Engineering from Bennett University, achieving a CGPA of 8.46/10.0. I completed my schooling from Delhi Public School (DPS).";
  } else if (lower.includes("age") || lower.includes("old") || lower.includes("born") || lower.includes("birth")) {
    response = "I was born on April 30, 2004, which makes me 22 years old.";
  } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("social") || lower.includes("linkedin") || lower.includes("github") || lower.includes("reach") || lower.includes("call")) {
    response = "You can reach me via email at shikharsrivastava3004@gmail.com or connect with me on LinkedIn at linkedin.com/in/shikhar004. You can also view my projects on GitHub at github.com/Shikhaar.";
  } else if (lower.includes("location") || lower.includes("live") || lower.includes("located") || lower.includes("city") || lower.includes("relocate") || lower.includes("office") || lower.includes("remote") || lower.includes("where")) {
    response = "I am currently based in Gurgaon, India, and I'm open to on-site work in Delhi-NCR, remote work, or relocating for the right opportunity.";
  } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("pdf") || lower.includes("download")) {
    response = "You can download my resume directly from the header of my portfolio site at shikhar-portfolio-phi.vercel.app.";
  } else if (lower.includes("experience") || lower.includes("job") || lower.includes("work") || lower.includes("current") || lower.includes("company") || lower.includes("role") || lower.includes("zypp")) {
    response = "I am currently working full-time as an AI/ML Engineer at Zypp Electric (Gurgaon, India). I started as an AI/ML Intern in June 2025 and converted to full-time in July 2026 after shipping 5 production systems.";
  } else {
    response = "I'm here to answer questions about my projects, skills, and experience. Try asking about specific projects like Zypp Saathi, Zia Chatbot, or the credit scoring engine — or ask about my technical stack, architecture decisions, or what I've learned building production AI systems.";
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const words = response.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        if (i >= words.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        const text = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
        i++;
      }, 30);
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Vercel-AI-Data-Stream": "v1" },
  });
}

export async function POST(req: NextRequest) {
  const { messages, recruiterMode } = await req.json();
  const userQuestion = messages[messages.length - 1]?.content ?? "";

  // Retrieve context
  let contextChunks: ContentChunk[] = [];
  const embeddings = loadEmbeddings();

  if (embeddings.length > 0 && API_KEY) {
    // Use vector similarity for context retrieval
    try {
      const embeddingRes = await fetch(`${BASE_URL}/embeddings`, {
        method: "POST",
        headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "text-embedding-3-small", input: userQuestion }),
      });
      if (embeddingRes.ok) {
        const embData = await embeddingRes.json();
        const queryVector: number[] = embData.data?.[0]?.embedding ?? [];
        contextChunks = findTopChunks(queryVector, 5);
      }
    } catch { }
  }

  // Fallback: simple text-based context selection if no embeddings
  if (contextChunks.length === 0) {
    const allChunks = getAllContentChunks();
    const queryTerms = userQuestion.toLowerCase().split(/\s+/).filter((t: string) => t.length > 3);
    contextChunks = allChunks
      .map((chunk) => ({
        chunk,
        score: queryTerms.filter((t: string) => chunk.text.toLowerCase().includes(t)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .filter((r) => r.score > 0)
      .map((r) => r.chunk);

    // Always include some general context if nothing matched
    if (contextChunks.length === 0) {
      contextChunks = allChunks.slice(0, 3);
    }
  }

  // Use mock if no API key
  if (!API_KEY) {
    console.warn("Chat API: OPENROUTER_API_KEY is not defined in environment variables. Falling back to mock.");
    return mockStreamResponse(userQuestion);
  }

  const systemPrompt = buildSystemPrompt(contextChunks, !!recruiterMode);

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://shikhar-portfolio-phi.vercel.app",
      "X-Title": "Shikhar Portfolio",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-6), // keep last 6 turns for context
      ],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    try {
      const errText = await response.text();
      console.error(`Chat API: OpenRouter request failed with status ${response.status}:`, errText);
    } catch {
      console.error(`Chat API: OpenRouter request failed with status ${response.status}`);
    }
    return mockStreamResponse(userQuestion);
  }

  // Stream the SSE response back in Vercel AI SDK format
  const encoder = new TextEncoder();
  const body = response.body!;
  const reader = body.getReader();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          const lines = text.split("\n").filter((l) => l.startsWith("data: "));
          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(`0:${JSON.stringify(content)}\n`));
              }
            } catch { }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  });
}
