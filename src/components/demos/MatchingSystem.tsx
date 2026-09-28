"use client";

import { useMemo, useState } from "react";
import { Briefcase, Check, CircleCheck, Clock, Languages, MapPin, UserPlus, X } from "lucide-react";

type JpLevel = "N3" | "N2" | "N1" | "Native";
const jpRank: Record<JpLevel, number> = { N3: 1, N2: 2, N1: 3, Native: 4 };

type Project = {
  id: string;
  title: string;
  start: string; // YYYY-MM
  required: string[];
  preferred: string[];
  minYears: number;
  japanese: JpLevel;
  style: string;
};

type Engineer = {
  id: string;
  name: string;
  country: string;
  role: string;
  years: number;
  skills: string[];
  japanese: JpLevel;
  available: string; // YYYY-MM
};

// すべて架空のサンプルデータ
const projects: Project[] = [
  {
    id: "p1",
    title: "物流SaaSのバックエンド開発",
    start: "2026-11",
    required: ["Node.js", "TypeScript", "AWS"],
    preferred: ["PostgreSQL", "Docker"],
    minYears: 3,
    japanese: "N2",
    style: "一部リモート",
  },
  {
    id: "p2",
    title: "生成AIチャットボット開発（RAG）",
    start: "2026-11",
    required: ["Python", "LLM", "RAG"],
    preferred: ["FastAPI", "Azure"],
    minYears: 2,
    japanese: "N3",
    style: "フルリモート",
  },
  {
    id: "p3",
    title: "ECサイトのフロントエンド刷新",
    start: "2026-12",
    required: ["React", "Next.js", "TypeScript"],
    preferred: ["Tailwind CSS", "Figma"],
    minYears: 2,
    japanese: "N2",
    style: "一部リモート",
  },
  {
    id: "p4",
    title: "基幹システム刷新のPMO支援",
    start: "2027-01",
    required: ["PMO", "要件定義"],
    preferred: ["SAP", "Salesforce"],
    minYears: 5,
    japanese: "N1",
    style: "常駐（横浜）",
  },
];

const engineers: Engineer[] = [
  { id: "e1", name: "Engineer A", country: "日本", role: "バックエンド", years: 6, skills: ["Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"], japanese: "Native", available: "2026-10" },
  { id: "e2", name: "Engineer B", country: "インド", role: "フルスタック", years: 5, skills: ["Python", "LLM", "RAG", "FastAPI", "React", "AWS"], japanese: "N2", available: "2026-11" },
  { id: "e3", name: "Engineer C", country: "インド", role: "フロントエンド", years: 4, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"], japanese: "N3", available: "2026-10" },
  { id: "e4", name: "Engineer D", country: "日本", role: "PM / PMO", years: 11, skills: ["PMO", "要件定義", "Salesforce", "SAP"], japanese: "Native", available: "2027-01" },
  { id: "e5", name: "Engineer E", country: "日本", role: "バックエンド", years: 3, skills: ["Python", "Django", "AWS", "Docker", "PostgreSQL"], japanese: "Native", available: "2026-12" },
  { id: "e6", name: "Engineer F", country: "インド", role: "AIエンジニア", years: 3, skills: ["Python", "PyTorch", "LLM", "Azure", "TypeScript"], japanese: "N3", available: "2026-10" },
];

const priorities = {
  balance: { label: "バランス", w: { required: 50, preferred: 15, years: 15, japanese: 10, timing: 10 } },
  skill: { label: "スキル重視", w: { required: 65, preferred: 20, years: 10, japanese: 0, timing: 5 } },
  japanese: { label: "日本語重視", w: { required: 40, preferred: 10, years: 10, japanese: 30, timing: 10 } },
} as const;
type Priority = keyof typeof priorities;

function score(p: Project, e: Engineer, priority: Priority) {
  const w = priorities[priority].w;
  const reqHit = p.required.filter((s) => e.skills.includes(s));
  const prefHit = p.preferred.filter((s) => e.skills.includes(s));
  const yearsRatio = Math.min(e.years / p.minYears, 1);
  const jpGap = jpRank[e.japanese] - jpRank[p.japanese];
  const jpRatio = jpGap >= 0 ? 1 : jpGap === -1 ? 0.5 : 0;
  const timingOk = e.available <= p.start;
  const total =
    (reqHit.length / p.required.length) * w.required +
    (prefHit.length / p.preferred.length) * w.preferred +
    yearsRatio * w.years +
    jpRatio * w.japanese +
    (timingOk ? 1 : 0.3) * w.timing;
  return { total: Math.round(total), reqHit, prefHit, jpOk: jpGap >= 0, yearsOk: yearsRatio >= 1, timingOk };
}

const ym = (v: string) => `${v.slice(0, 4)}年${Number(v.slice(5))}月`;

export function MatchingSystem() {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [priority, setPriority] = useState<Priority>("balance");
  const [proposed, setProposed] = useState<Record<string, string[]>>({});

  const project = projects.find((p) => p.id === projectId) ?? projects[0];
  const ranked = useMemo(
    () =>
      engineers
        .map((e) => ({ e, s: score(project, e, priority) }))
        .sort((a, b) => b.s.total - a.s.total || b.e.years - a.e.years),
    [project, priority],
  );
  const list = proposed[project.id] ?? [];

  const toggle = (id: string) =>
    setProposed((prev) => {
      const cur = prev[project.id] ?? [];
      return { ...prev, [project.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });

  return (
    <div className="grid lg:grid-cols-[320px_1fr]">
      {/* 案件 */}
      <aside className="border-b border-line bg-mist/60 p-5 lg:border-b-0 lg:border-r">
        <p className="text-[11px] font-bold tracking-[0.15em] text-muted">案件を選択</p>
        <ul className="mt-3 space-y-2" role="radiogroup" aria-label="案件">
          {projects.map((p) => {
            const active = p.id === project.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setProjectId(p.id)}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-left transition",
                    active ? "border-electric-500 bg-white shadow-[0_8px_24px_-14px_rgba(47,107,255,0.7)]" : "border-line bg-white/70 hover:border-electric-400",
                  ].join(" ")}
                >
                  <span className="flex items-start gap-2">
                    <Briefcase aria-hidden className={`mt-0.5 size-4 shrink-0 ${active ? "text-electric-500" : "text-muted"}`} />
                    <span className="text-[13px] font-bold leading-[1.6] text-navy-900">{p.title}</span>
                  </span>
                  <span className="mt-1.5 block pl-6 text-[11px] text-muted">
                    {ym(p.start)}〜・{p.style}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-xl border border-line bg-white p-4 text-[12px] leading-[1.9]">
          <p className="font-bold text-navy-900">募集要件</p>
          <p className="mt-1 text-muted">
            必須：<span className="font-bold text-ink">{project.required.join(" / ")}</span>
          </p>
          <p className="text-muted">尚可：{project.preferred.join(" / ")}</p>
          <p className="text-muted">
            経験：{project.minYears}年以上・日本語：{project.japanese}以上
          </p>
        </div>
      </aside>

      {/* 候補者 */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-navy-900">
            おすすめ候補 <span className="font-normal text-muted">（{engineers.length}名をスコアリング）</span>
          </p>
          <div className="inline-flex rounded-full border border-line bg-mist p-1" role="group" aria-label="重み付け">
            {(Object.keys(priorities) as Priority[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={priority === k}
                onClick={() => setPriority(k)}
                className={[
                  "rounded-full px-3 py-1.5 text-[12px] font-bold transition",
                  priority === k ? "bg-white text-electric-600 shadow" : "text-muted hover:text-navy-900",
                ].join(" ")}
              >
                {priorities[k].label}
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-4 space-y-3">
          {ranked.map(({ e, s }, i) => {
            const added = list.includes(e.id);
            return (
              <li
                key={e.id}
                className={[
                  "rounded-2xl border p-4 transition sm:p-5",
                  i === 0 ? "border-electric-500/50 bg-electric-50/50" : "border-line bg-white",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-display font-extrabold text-navy-900">{e.name}</span>
                      <span className="text-[12px] text-muted">{e.role}</span>
                      <span className="inline-flex items-center gap-1 text-[12px] text-muted">
                        <MapPin aria-hidden className="size-3" />
                        {e.country}
                      </span>
                    </p>
                    {/* スコアのメーター */}
                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className="h-2 flex-1 overflow-hidden rounded-full bg-electric-100"
                        role="meter"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={s.total}
                        aria-label={`${e.name} のマッチ度`}
                      >
                        <div className="h-full rounded-full bg-electric-500 transition-[width] duration-500" style={{ width: `${s.total}%` }} />
                      </div>
                      <span className="w-16 text-right font-display text-sm font-extrabold tabular-nums text-navy-900">{s.total}点</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(e.id)}
                    aria-pressed={added}
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition",
                      added ? "bg-navy-900 text-white" : "border border-electric-500 text-electric-600 hover:bg-electric-50",
                    ].join(" ")}
                  >
                    {added ? <CircleCheck aria-hidden className="size-3.5" /> : <UserPlus aria-hidden className="size-3.5" />}
                    {added ? "提案リスト済" : "提案する"}
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 pl-0 sm:pl-14">
                  {project.required.map((sk) => {
                    const ok = s.reqHit.includes(sk);
                    return (
                      <span
                        key={sk}
                        className={[
                          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-bold",
                          ok ? "bg-navy-900 text-white" : "bg-mist text-muted line-through",
                        ].join(" ")}
                      >
                        {ok ? <Check aria-hidden className="size-3" /> : <X aria-hidden className="size-3" />}
                        {sk}
                        <span className="sr-only">{ok ? "（保有）" : "（未保有）"}</span>
                      </span>
                    );
                  })}
                  {s.prefHit.map((sk) => (
                    <span key={sk} className="rounded-md border border-line px-2 py-0.5 text-[11.5px] text-ink">
                      + {sk}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11.5px] text-ink">
                    経験 {e.years}年
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11.5px] text-ink">
                    <Languages aria-hidden className="size-3" /> {e.japanese}
                    {!s.jpOk ? <span className="text-amber-700">（要件未満）</span> : null}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11.5px] text-ink">
                    <Clock aria-hidden className="size-3" /> {ym(e.available)}〜
                    {!s.timingOk ? <span className="text-amber-700">（開始後）</span> : null}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-[12px] text-muted" aria-live="polite">
          提案リスト：{list.length > 0 ? list.map((id) => engineers.find((e) => e.id === id)?.name).join("、") : "未選択"}
        </p>
      </div>
    </div>
  );
}
