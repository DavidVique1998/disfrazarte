"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "¿Qué trajes tienen disponibles?",
  "¿Cómo reservo un traje?",
  "¿Dónde están ubicados?",
];

function renderMd(text: string) {
  return text
    .split("\n")
    .map((line) => {
      const bullet = line.match(/^[\*\-]\s+(.*)/);
      if (bullet) return `<li>${inlineMd(bullet[1] ?? "")}</li>`;
      if (line.trim() === "") return "<br>";
      return `<p>${inlineMd(line)}</p>`;
    })
    .join("")
    .replace(/(<li>.*<\/li>)+/g, (m) => `<ul>${m}</ul>`);
}

function inlineMd(str: string) {
  return str.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! 🎭 Soy el asistente de Disfrazarte. ¿En qué te puedo ayudar para encontrar tu traje ideal?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Lo siento, hubo un error. Por favor contáctanos por WhatsApp: 096 901 6264" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FAB — above theme toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir asistente"}
        className="fixed bottom-40 right-6 z-50 w-14 h-14 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{
          background: open
            ? "#0a0a1a"
            : "linear-gradient(135deg, #1baeea, #ff1fa0)",
          boxShadow: open
            ? "0 4px 16px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(27,174,234,0.45)",
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="3" x2="15" y2="15" />
            <line x1="15" y1="3" x2="3" y2="15" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-56 right-6 z-50 flex flex-col overflow-hidden bg-white dark:bg-[#12122a] border border-black/8 dark:border-white/8"
          style={{
            width: "min(360px, calc(100vw - 32px))",
            maxHeight: 520,
            boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1baeea, #ff1fa0)" }}
          >
            <div className="w-9 h-9 flex items-center justify-center bg-white/20 flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <strong className="text-white text-[14px] font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Asistente Disfrazarte
              </strong>
              <span className="text-white/80 text-[11px] font-medium">
                ¿Qué traje buscas hoy?
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-3 bg-[#f5f8ff] dark:bg-[#0d0d20]" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] text-[13.5px] leading-[1.55] px-4 py-2.5 ${
                  m.role === "user"
                    ? "self-end text-white font-semibold"
                    : "self-start bg-white dark:bg-[#12122a] text-[#0a0a1a] dark:text-[#f0f4ff] shadow-sm"
                }`}
                style={
                  m.role === "user"
                    ? { background: "linear-gradient(135deg, #1baeea, #ff1fa0)", borderRadius: "12px 12px 2px 12px" }
                    : { borderRadius: "12px 12px 12px 2px", border: "1px solid rgba(0,0,0,0.06)" }
                }
              >
                {m.role === "assistant" ? (
                  <span dangerouslySetInnerHTML={{ __html: renderMd(m.content) }} className="[&_p]:mb-1 [&_ul]:pl-4 [&_ul]:list-disc [&_strong]:font-bold [&_p:last-child]:mb-0" />
                ) : (
                  m.content
                )}
              </div>
            ))}

            {loading && (
              <div
                className="self-start flex items-center gap-1.5 px-4 py-3 bg-white dark:bg-[#12122a] shadow-sm"
                style={{ borderRadius: "12px 12px 12px 2px", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 rounded-full bg-[#1baeea]/50 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — only on first message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3 pt-1 bg-[#f5f8ff] dark:bg-[#0d0d20] flex-shrink-0">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11.5px] font-semibold px-3 py-1.5 border border-[#1baeea]/30 text-[#1baeea] dark:text-[#1baeea] hover:bg-[#1baeea] hover:text-white hover:border-[#1baeea] transition-all duration-200"
                  style={{ borderRadius: 2 }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 px-3 py-3 bg-white dark:bg-[#12122a] border-t border-black/6 dark:border-white/6 flex-shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Escribe tu consulta..."
              className="flex-1 px-4 py-2 text-[13px] bg-[#f5f8ff] dark:bg-[#0d0d20] border border-black/8 dark:border-white/8 text-[#0a0a1a] dark:text-[#f0f4ff] placeholder:text-[#0a0a1a]/30 dark:placeholder:text-white/30 outline-none focus:border-[#1baeea] transition-colors duration-200"
              style={{ borderRadius: 2 }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 flex items-center justify-center text-white flex-shrink-0 disabled:opacity-30 hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, #1baeea, #ff1fa0)",
                borderRadius: 2,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
