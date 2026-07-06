"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Loader2, ChevronDown,
  Briefcase, Sparkles, Brain, Code2, Users, RotateCcw,
  Mic, TrendingUp, Eye, Server, Clock, GraduationCap, Mail, MapPin
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: <Users size={14} />, text: "Tell me about yourself." },
  { icon: <Briefcase size={14} />, text: "What are you building these days?" },
  { icon: <Brain size={14} />, text: "What kind of problems do you enjoy solving?" },
  { icon: <Sparkles size={14} />, text: "What's your favorite project?" },
  { icon: <GraduationCap size={14} />, text: "What are you learning right now?" },
  { icon: <Mail size={14} />, text: "How can I get in touch?" },
];

const RECRUITER_SUGGESTIONS = [
  { icon: <Briefcase size={14} />, text: "Give me a quick overview of your experience." },
  { icon: <Users size={14} />, text: "What kind of roles are you looking for?" },
  { icon: <Sparkles size={14} />, text: "What makes you a strong AI Engineer?" },
  { icon: <TrendingUp size={14} />, text: "Walk me through your career." },
  { icon: <Brain size={14} />, text: "Summarize your profile in one minute." },
  { icon: <Code2 size={14} />, text: "Why should I hire you?" },
];

function formatMessageContent(content: string, isUser: boolean) {
  if (!content) return "";
  const regex = /(\*\*.*?\*\*)/g;
  const parts = content.split(regex);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong 
          key={i} 
          className={isUser ? "font-bold text-white" : "font-extrabold text-[var(--text)] dark:text-white"}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Thinking...");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-chat", openHandler);
    return () => window.removeEventListener("open-chat", openHandler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setLoadingText("Searching context...");

    // Simulate loading state progression
    const timers = [
      setTimeout(() => setLoadingText("Reading experience..."), 800),
      setTimeout(() => setLoadingText("Drafting response..."), 1800),
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content },
          ],
          recruiterMode,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((l) => l.startsWith("0:"));
          for (const line of lines) {
            try {
              const text = JSON.parse(line.slice(2));
              assistantContent += text;
              setMessages((prev) =>
                prev.map((m) => m.id === assistantId ? { ...m, content: assistantContent } : m)
              );
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment, or reach out directly via email.",
        },
      ]);
    } finally {
      setLoading(false);
      timers.forEach(clearTimeout);
    }
  };

  const suggestions = recruiterMode ? RECRUITER_SUGGESTIONS : SUGGESTIONS;

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:scale-[1.03] active:scale-[0.97] text-white rounded-2xl shadow-[var(--shadow-xl)] transition-all duration-[var(--duration-fast)] font-semibold text-sm cursor-pointer"
        aria-label="Open AI assistant"
      >
        <MessageCircle size={18} />
        Chat with AI
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Chat window */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 right-0 left-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 w-full sm:max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl shadow-[var(--shadow-xl)] flex flex-col overflow-hidden"
              style={{ maxHeight: "85vh", height: "600px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--primary-muted)] flex items-center justify-center">
                    <Sparkles size={16} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">AI Assistant</p>
                    <p className="text-xs text-[var(--muted)]">Ask about projects, skills, or experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setRecruiterMode(!recruiterMode)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      recruiterMode
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Recruiter Mode
                  </button>
                  {messages.length > 0 && (
                    <button
                      onClick={() => setMessages([])}
                      className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)] transition-colors"
                      title="Reset Conversation"
                      aria-label="Reset Conversation"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-[var(--muted)] text-center pt-4">
                      {recruiterMode
                        ? "Recruiter Mode: optimized for hiring decisions."
                        : "Ask me anything about my projects, skills, or experience."}
                    </p>
                    <div className="flex flex-col gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s.text}
                          onClick={() => sendMessage(s.text)}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--text-secondary)] bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:text-[var(--text)] text-left transition-all"
                        >
                          <span className="text-[var(--primary)]">{s.icon}</span>
                          {s.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[var(--primary)] text-white rounded-br-sm"
                          : "bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text)] rounded-bl-sm"
                      }`}
                    >
                      {msg.content ? (
                        formatMessageContent(msg.content, msg.role === "user")
                      ) : (
                        msg.role === "assistant" && <span className="opacity-50">...</span>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-sm text-[var(--muted)]">
                      <Loader2 size={14} className="animate-spin text-[var(--primary)]" />
                      {loadingText}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-4 border-t border-[var(--border)]">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, skills, or experience..."
                    className="flex-1 px-4 py-2.5 text-sm bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-40 text-white rounded-xl transition-colors"
                    aria-label="Send"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
