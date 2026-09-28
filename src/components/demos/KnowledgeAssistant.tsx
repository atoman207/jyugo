"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, FileText, RotateCcw, Send, UserRound } from "lucide-react";
import { answer, documentTitles, suggestions, type Hit } from "./knowledge-data";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; hits: Hit[]; confident: boolean };

const greeting: Message = {
  id: 0,
  role: "assistant",
  text: "こんにちは。社内規程についての質問に、登録された文書を検索して回答します。下の質問例もお試しください。",
  hits: [],
  confident: true,
};

export function KnowledgeAssistant() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || thinking) return;
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: question }]);
    setInput("");
    setThinking(true);
    timer.current = window.setTimeout(() => {
      const res = answer(question);
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", ...res }]);
      setThinking(false);
    }, 750);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setThinking(false);
    setMessages([greeting]);
  };

  return (
    <div className="grid lg:grid-cols-[264px_1fr]">
      {/* 登録文書 */}
      <aside className="border-b border-line bg-mist/60 p-5 lg:border-b-0 lg:border-r">
        <p className="text-[11px] font-bold tracking-[0.15em] text-muted">登録済みの社内文書</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {documentTitles.map((d) => (
            <li key={d.id} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5">
              <FileText aria-hidden className="size-4 shrink-0 text-electric-500" />
              <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-navy-900">{d.title}</span>
              <span className="text-[11px] text-muted">{d.count}条</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11.5px] leading-[1.8] text-muted">
          ※ デモ用の架空の規程です。実案件では、PDF・Word・社内Wikiなどを取り込み、LLMとベクトル検索で回答を生成します。
        </p>
      </aside>

      {/* チャット */}
      <div className="flex min-h-[520px] flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient text-white">
              <Bot aria-hidden className="size-4" />
            </span>
            AI Knowledge Assistant
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-muted hover:bg-mist hover:text-navy-900"
          >
            <RotateCcw aria-hidden className="size-3.5" /> リセット
          </button>
        </div>

        <div ref={logRef} className="h-[380px] flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end gap-2.5">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-electric-500 px-4 py-2.5 text-[14px] leading-[1.8] text-white">
                  {m.text}
                </p>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy-900 text-white">
                  <UserRound aria-hidden className="size-4" />
                </span>
              </div>
            ) : (
              <div key={m.id} className="flex gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                  <Bot aria-hidden className="size-4" />
                </span>
                <div className="max-w-[85%]">
                  <p
                    className={[
                      "rounded-2xl rounded-bl-sm px-4 py-2.5 text-[14px] leading-[1.85]",
                      m.confident ? "bg-mist text-ink" : "bg-amber-50 text-amber-900",
                    ].join(" ")}
                  >
                    {m.text}
                  </p>
                  {m.hits.length > 0 && m.confident ? (
                    <div className="mt-2">
                      <p className="text-[11px] font-bold text-muted">参照した文書</p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {m.hits.map((h, i) => (
                          <li
                            key={`${h.section.docId}-${h.section.heading}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-[11.5px] text-navy-900"
                            title={h.section.body}
                          >
                            <FileText aria-hidden className="size-3 text-electric-500" />
                            {h.section.docTitle} {h.section.heading}
                            <span className="text-muted">関連度 {Math.round((h.score / m.hits[0].score) * 100)}%</span>
                            {i === 0 ? <span className="sr-only">（最も関連）</span> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ),
          )}
          {thinking ? (
            <div className="flex gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                <Bot aria-hidden className="size-4" />
              </span>
              <p className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-mist px-4 py-3" aria-label="回答を作成中">
                <span className="typing-dot size-1.5 rounded-full bg-electric-500" />
                <span className="typing-dot size-1.5 rounded-full bg-electric-500" />
                <span className="typing-dot size-1.5 rounded-full bg-electric-500" />
                <span className="ml-2 text-xs text-muted">文書を検索しています…</span>
              </p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-line p-4">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                disabled={thinking}
                className="rounded-full border border-electric-100 bg-electric-50 px-3 py-1.5 text-[12px] font-bold text-electric-600 transition hover:border-electric-400 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <label htmlFor="knowledge-q" className="sr-only">
              質問を入力
            </label>
            <input
              id="knowledge-q"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={120}
              placeholder="例）タクシーは使ってもいい？"
              className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-[14px] outline-none transition focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-bold text-white transition disabled:opacity-40"
            >
              <Send aria-hidden className="size-4" />
              <span className="hidden sm:inline">送信</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
