"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, CircleCheck, CircleX, Search } from "lucide-react";

type Stage = "リード" | "提案" | "見積" | "交渉" | "受注" | "失注";
type Owner = "佐藤" | "田中" | "Kumar";
type Deal = { id: string; company: string; title: string; stage: Stage; amount: number; owner: Owner; updated: string };

// すべて架空のサンプルデータ (金額の単位は万円)
const deals: Deal[] = [
  { id: "D-1024", company: "A物流", title: "配送管理システム刷新", stage: "交渉", amount: 1200, owner: "佐藤", updated: "09/26" },
  { id: "D-1023", company: "B商事", title: "社内FAQ AIの導入", stage: "受注", amount: 480, owner: "Kumar", updated: "09/25" },
  { id: "D-1022", company: "Cクリニック", title: "予約システム構築", stage: "見積", amount: 350, owner: "田中", updated: "09/24" },
  { id: "D-1021", company: "D不動産", title: "顧客管理（CRM）開発", stage: "提案", amount: 800, owner: "佐藤", updated: "09/22" },
  { id: "D-1020", company: "E製作所", title: "生産管理のシステム化", stage: "受注", amount: 650, owner: "田中", updated: "09/19" },
  { id: "D-1019", company: "Fホールディングス", title: "PMO支援（6ヶ月）", stage: "交渉", amount: 900, owner: "佐藤", updated: "09/18" },
  { id: "D-1018", company: "G教育", title: "会員サイト・決済機能", stage: "リード", amount: 400, owner: "Kumar", updated: "09/17" },
  { id: "D-1017", company: "H食品", title: "ECサイトリニューアル", stage: "失注", amount: 550, owner: "田中", updated: "09/15" },
  { id: "D-1016", company: "I保険", title: "文書解析AIのPoC", stage: "提案", amount: 300, owner: "Kumar", updated: "09/12" },
  { id: "D-1015", company: "Jリース", title: "SES（バックエンド2名）", stage: "受注", amount: 330, owner: "佐藤", updated: "09/10" },
  { id: "D-1014", company: "K不動産", title: "物件検索サイト改修", stage: "リード", amount: 250, owner: "田中", updated: "09/08" },
  { id: "D-1013", company: "L銀行", title: "営業支援AIの検証", stage: "見積", amount: 700, owner: "Kumar", updated: "09/05" },
];

const months = ["4月", "5月", "6月", "7月", "8月", "9月"];
const monthlyByOwner: Record<Owner, number[]> = {
  佐藤: [420, 380, 510, 460, 520, 330],
  田中: [250, 410, 180, 490, 300, 650],
  Kumar: [150, 250, 270, 330, 370, 480],
};
const owners: Owner[] = ["佐藤", "田中", "Kumar"];
const openStages: Stage[] = ["リード", "提案", "見積", "交渉"];
const allStages: Stage[] = [...openStages, "受注", "失注"];

const fmt = (n: number) => n.toLocaleString("ja-JP");

/** 月次受注額の縦棒グラフ (単一系列) */
function MonthlyChart({ values }: { values: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 560;
  const H = 240;
  const pad = { l: 44, r: 12, t: 22, b: 28 };
  const max = Math.max(500, Math.ceil(Math.max(...values) / 500) * 500);
  const ticks = Array.from({ length: max / 500 + 1 }, (_, i) => i * 500);
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const slot = plotW / values.length;
  const barW = 24;
  const y = (v: number) => pad.t + plotH - (v / max) * plotH;
  const last = values.length - 1;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`月次受注額（万円）：${months.map((m, i) => `${m} ${fmt(values[i])}`).join("、")}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e2e7f1" strokeWidth="1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#56607a" style={{ fontVariantNumeric: "tabular-nums" }}>
              {fmt(t)}
            </text>
          </g>
        ))}
        {values.map((v, i) => {
          const cx = pad.l + slot * i + slot / 2;
          const x = cx - barW / 2;
          const top = y(v);
          const base = y(0);
          const r = Math.min(4, base - top);
          const d = `M${x} ${base} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + barW - r} Q${x + barW} ${top} ${x + barW} ${top + r} V${base} Z`;
          return (
            <g key={months[i]}>
              <path d={d} fill={hover === i ? "#1f55e6" : "#2f6bff"} />
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill="#56607a">
                {months[i]}
              </text>
              {i === last ? (
                <text x={cx} y={top - 7} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0b1530">
                  {fmt(v)}
                </text>
              ) : null}
              {/* ホバー用の当たり判定 (棒より広い) */}
              <rect
                x={pad.l + slot * i}
                y={pad.t}
                width={slot}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          );
        })}
      </svg>
      {hover !== null ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-navy-900 px-3 py-2 text-[12px] text-white shadow-lg"
          style={{
            left: `${((pad.l + slot * hover + slot / 2) / W) * 100}%`,
            top: `${(y(values[hover]) / H) * 100}%`,
            marginTop: -8,
          }}
        >
          <p className="font-bold">2026年{months[hover]}</p>
          <p className="tabular-nums text-white/80">受注額 {fmt(values[hover])}万円</p>
        </div>
      ) : null}
    </div>
  );
}

/** ステージ別パイプラインの横棒グラフ (単一系列) */
function PipelineChart({ rows }: { rows: { stage: Stage; amount: number; count: number }[] }) {
  const [hover, setHover] = useState<Stage | null>(null);
  const max = Math.max(1, ...rows.map((r) => r.amount));
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const count = rows.reduce((s, r) => s + r.count, 0);
  return (
    <>
      <ul className="space-y-4">
        {rows.map((r) => (
          <li
            key={r.stage}
            className="relative grid grid-cols-[3rem_1fr] items-center gap-3"
            onMouseEnter={() => setHover(r.stage)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="text-[12px] font-bold text-ink">{r.stage}</span>
            <div className="flex items-center gap-2">
              <div
                className="h-4 rounded-r-[4px] transition-colors"
                style={{ width: `${(r.amount / max) * 72}%`, minWidth: r.amount > 0 ? 4 : 0, background: hover === r.stage ? "#1f55e6" : "#2f6bff" }}
              />
              <span className="whitespace-nowrap text-[12px] tabular-nums text-ink">
                {fmt(r.amount)}万円 <span className="text-muted">（{r.count}件）</span>
              </span>
            </div>
            {hover === r.stage ? (
              <div className="pointer-events-none absolute -top-9 left-14 z-10 rounded-lg bg-navy-900 px-3 py-1.5 text-[11.5px] text-white shadow-lg">
                {r.stage}：パイプライン全体の {total ? Math.round((r.amount / total) * 100) : 0}%
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-8 flex items-baseline justify-between border-t border-line pt-4 text-[12px] text-muted">
        パイプライン合計
        <span className="text-base font-bold tabular-nums text-navy-900">
          {fmt(total)}万円 <span className="text-[12px] font-normal text-muted">（{count}件）</span>
        </span>
      </p>
    </>
  );
}

type SortKey = "updated" | "amount";
type SortState = { key: SortKey; dir: "asc" | "desc" };

function SortIcon({ k, sort }: { k: SortKey; sort: SortState }) {
  if (sort.key !== k) return <ArrowUpDown aria-hidden className="size-3" />;
  return sort.dir === "asc" ? <ArrowUp aria-hidden className="size-3" /> : <ArrowDown aria-hidden className="size-3" />;
}

function StageBadge({ stage }: { stage: Stage }) {
  if (stage === "受注")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11.5px] font-bold text-emerald-700">
        <CircleCheck aria-hidden className="size-3" /> 受注
      </span>
    );
  if (stage === "失注")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11.5px] font-bold text-slate-600">
        <CircleX aria-hidden className="size-3" /> 失注
      </span>
    );
  return <span className="rounded-full border border-line px-2 py-0.5 text-[11.5px] font-bold text-navy-900">{stage}</span>;
}

export function CrmDashboard() {
  const [owner, setOwner] = useState<Owner | "all">("all");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "updated", dir: "desc" });

  const scoped = useMemo(() => deals.filter((d) => owner === "all" || d.owner === owner), [owner]);
  const monthly = useMemo(
    () => months.map((_, i) => (owner === "all" ? owners.reduce((s, o) => s + monthlyByOwner[o][i], 0) : monthlyByOwner[owner][i])),
    [owner],
  );

  const won = scoped.filter((d) => d.stage === "受注");
  const lost = scoped.filter((d) => d.stage === "失注");
  const open = scoped.filter((d) => openStages.includes(d.stage));
  const current = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const delta = prev ? ((current - prev) / prev) * 100 : 0;
  const winRate = won.length + lost.length > 0 ? Math.round((won.length / (won.length + lost.length)) * 100) : null;
  const avg = won.length ? Math.round(won.reduce((s, d) => s + d.amount, 0) / won.length) : null;

  const pipeline = openStages.map((s) => {
    const ds = open.filter((d) => d.stage === s);
    return { stage: s, amount: ds.reduce((sum, d) => sum + d.amount, 0), count: ds.length };
  });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = scoped.filter(
      (d) => (stage === "all" || d.stage === stage) && (!q || `${d.company}${d.title}${d.id}`.toLowerCase().includes(q)),
    );
    const sign = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => (sort.key === "amount" ? a.amount - b.amount : a.updated.localeCompare(b.updated)) * sign);
  }, [scoped, stage, query, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }));

  const tiles = [
    { label: "今月の受注額", value: `${fmt(current)}万円`, sub: `前月比 ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`, up: delta >= 0 },
    { label: "進行中の商談", value: `${open.length}件`, sub: `見込み ${fmt(open.reduce((s, d) => s + d.amount, 0))}万円` },
    { label: "受注率（今月）", value: winRate === null ? "—" : `${winRate}%`, sub: `受注 ${won.length}件・失注 ${lost.length}件` },
    { label: "平均受注単価", value: avg === null ? "—" : `${fmt(avg)}万円`, sub: "今月の受注案件" },
  ];

  return (
    <div className="p-5 sm:p-6">
      {/* フィルター (チャートの上に 1 行) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold text-muted">担当者</span>
          <div className="inline-flex rounded-full border border-line bg-mist p-1" role="group" aria-label="担当者で絞り込み">
            {(["all", ...owners] as const).map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={owner === o}
                onClick={() => setOwner(o)}
                className={[
                  "rounded-full px-3 py-1.5 text-[12px] font-bold transition",
                  owner === o ? "bg-white text-electric-600 shadow" : "text-muted hover:text-navy-900",
                ].join(" ")}
              >
                {o === "all" ? "すべて" : o}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[12px] text-muted">期間：2026年4月〜9月</p>
      </div>

      {/* KPI */}
      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((t) => (
          <li key={t.label} className="rounded-2xl border border-line bg-white p-4">
            <p className="text-[12px] text-muted">{t.label}</p>
            <p className="mt-1 text-2xl font-bold text-navy-900">{t.value}</p>
            <p className={["mt-1 text-[11.5px]", t.up === undefined ? "text-muted" : t.up ? "text-emerald-700" : "text-rose-700"].join(" ")}>
              {t.up === undefined ? null : t.up ? "▲ " : "▼ "}
              {t.sub}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-line bg-white p-4 lg:col-span-3">
          <p className="text-sm font-bold text-navy-900">
            月次受注額 <span className="text-[12px] font-normal text-muted">（万円）</span>
          </p>
          <div className="mt-3">
            <MonthlyChart values={monthly} />
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 lg:col-span-2">
          <p className="text-sm font-bold text-navy-900">
            ステージ別パイプライン <span className="text-[12px] font-normal text-muted">（見込み金額）</span>
          </p>
          <div className="mt-6">
            <PipelineChart rows={pipeline} />
          </div>
        </div>
      </div>

      {/* 商談一覧 (テーブル表示) */}
      <div className="mt-4 rounded-2xl border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="ステージで絞り込み">
            {(["all", ...allStages] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={stage === s}
                onClick={() => setStage(s)}
                className={[
                  "rounded-full px-3 py-1 text-[12px] font-bold transition",
                  stage === s ? "bg-navy-900 text-white" : "bg-mist text-muted hover:text-navy-900",
                ].join(" ")}
              >
                {s === "all" ? "すべて" : s}
              </button>
            ))}
          </div>
          <label className="relative block w-full sm:w-56">
            <span className="sr-only">顧客名・案件名で検索</span>
            <Search aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="顧客名・案件名で検索"
              className="w-full rounded-full border border-line py-2 pl-9 pr-3 text-[13px] outline-none focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="text-[11.5px] text-muted">
              <tr className="border-b border-line">
                <th scope="col" className="px-4 py-2.5 font-bold">ID</th>
                <th scope="col" className="px-4 py-2.5 font-bold">顧客・案件</th>
                <th scope="col" className="px-4 py-2.5 font-bold">ステージ</th>
                <th scope="col" className="px-4 py-2.5 font-bold" aria-sort={sort.key === "amount" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1 hover:text-navy-900">
                    金額 <SortIcon k="amount" sort={sort} />
                  </button>
                </th>
                <th scope="col" className="px-4 py-2.5 font-bold">担当</th>
                <th scope="col" className="px-4 py-2.5 font-bold" aria-sort={sort.key === "updated" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => toggleSort("updated")} className="inline-flex items-center gap-1 hover:text-navy-900">
                    更新日 <SortIcon k="updated" sort={sort} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-b border-line last:border-b-0 hover:bg-mist/60">
                  <td className="px-4 py-3 font-display text-[12px] tabular-nums text-muted">{d.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-navy-900">{d.company}</p>
                    <p className="text-[12px] text-muted">{d.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StageBadge stage={d.stage} />
                  </td>
                  <td className="px-4 py-3 tabular-nums text-ink">{fmt(d.amount)}万円</td>
                  <td className="px-4 py-3 text-ink">{d.owner}</td>
                  <td className="px-4 py-3 tabular-nums text-muted">{d.updated}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted">
                    条件に一致する商談はありません。
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
