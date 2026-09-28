import type { CSSProperties } from "react";
import Image from "next/image";
import {
  BarChart3,
  Bot,
  Calculator,
  FileSearch,
  FileText,
  Handshake,
  MessagesSquare,
  Network,
  ScanText,
  Search,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { revealDelay } from "@/lib/reveal";
import blueBokeh from "@/assets/images/blue-bokeh.jpg";

const flow = [
  {
    en: "INPUT",
    title: "社内資料",
    text: "PDF・Excel・マニュアル・議事録など、社内に眠る情報",
    icon: FileText,
    chips: ["就業規則.pdf", "見積書.xlsx", "製品マニュアル"],
  },
  {
    en: "AI",
    title: "AI",
    text: "LLM × RAG で、自社データを理解・構造化",
    icon: Sparkles,
    chips: ["LLM", "RAG", "jyugo_AI"],
    highlight: true,
  },
  {
    en: "ANSWER",
    title: "分析・検索・回答",
    text: "根拠を示しながら、検索・要約・分類・回答",
    icon: Search,
    chips: ["根拠つき回答", "要約", "分類"],
  },
  {
    en: "AUTOMATION",
    title: "業務自動化",
    text: "問い合わせ対応・書類作成・通知までを自動化",
    icon: Zap,
    chips: ["一次対応", "書類作成", "通知"],
  },
];

const useCases = [
  { title: "社内FAQ AI", text: "社内規程やマニュアルへの質問に、チャットで即答。", icon: MessagesSquare },
  { title: "RAG（社内文書検索）", text: "自社データを根拠にした、信頼できる回答生成。", icon: FileSearch },
  { title: "問い合わせ自動化", text: "お客様からの一次対応を自動化し、対応工数を削減。", icon: Bot },
  { title: "営業支援AI", text: "提案書のたたき台作成や、商談メモの要約・整理。", icon: Handshake },
  { title: "見積書生成", text: "条件の入力から、見積書のドラフトを自動作成。", icon: Calculator },
  { title: "文書解析", text: "契約書・請求書などを読み取り、必要な項目を抽出。", icon: ScanText },
  { title: "AIマッチング", text: "案件と人材、ニーズと商品を最適に結びつける。", icon: Network },
  { title: "データ分析", text: "売上・顧客データを可視化し、次の打ち手を予測。", icon: BarChart3 },
];

// 会社紹介資料「事業概要：AIシステム開発」「受託開発」より
const process = ["お客様のニーズに応じたコンサルティング", "業務分析・RFP作成", "要求・要件定義", "基本設計", "詳細設計"];
const scope = [
  "AI導入支援",
  "AI Agent開発",
  "AIを活用したSaaS開発",
  "Webアプリケーション開発",
  "業務システム開発",
  "業務自動化",
  "サーバー構築・インフラ対応",
];

function Connector({ index }: { index: number }) {
  const delay = { "--flow-delay": `${index * 0.6}s` } as CSSProperties;
  return (
    <>
      <div aria-hidden className="flow-line flow-line-v mx-auto h-10 w-px bg-white/15 lg:hidden" style={delay} />
      <div aria-hidden className="flow-line hidden h-px w-full min-w-6 self-center bg-white/15 lg:block" style={delay} />
    </>
  );
}

export function AiDevelopment() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <Image src={blueBokeh} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950 via-navy-950/80 to-navy-950" />
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />

      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="dark"
              en="AI DEVELOPMENT"
              title={
                <span id="ai-title">
                  社内の情報を、
                  <br />
                  <span className="text-gradient">はたらくAI</span>へ。
                </span>
              }
            />
          </div>
          <p data-reveal style={revealDelay(120)} className="text-[15px] leading-[2.05] text-white/70 lg:col-span-5">
            貴社に必要なAIシステムのご要望を丁寧にヒアリングさせていただき、jyugo_AIと優秀なエンジニアがシステムの実現化に向けてPJを推進して参ります。
            また、既にあるシステムアイディアを成功に導くため、人材をご提案することも可能です。
          </p>
        </div>

        {/* 社内資料 → AI → 分析・検索・回答 → 業務自動化 */}
        <div data-reveal className="mt-16 flex flex-col lg:flex-row lg:items-stretch">
          {flow.map((node, i) => (
            <div key={node.en} className="contents">
              <div
                className={[
                  "relative rounded-[1.5rem] p-6 lg:w-[23%] lg:shrink-0",
                  node.highlight
                    ? "bg-linear-to-br from-electric-500/30 via-navy-800/80 to-iris-500/30 ring-1 ring-electric-400/60 shadow-[0_0_60px_-10px_rgba(47,107,255,0.6)]"
                    : "glass",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      "grid size-12 place-items-center rounded-xl",
                      node.highlight ? "animate-pulse-soft bg-brand-gradient" : "bg-white/10",
                    ].join(" ")}
                  >
                    <node.icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-display text-[11px] font-bold tracking-[0.2em] text-aqua-300">{node.en}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{node.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.85] text-white/65">{node.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {node.chips.map((chip) => (
                    <li key={chip} className="rounded-md bg-white/10 px-2 py-0.5 font-display text-[11px] text-white/80">
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
              {i < flow.length - 1 ? <Connector index={i} /> : null}
            </div>
          ))}
        </div>

        {/* 具体的な活用例 */}
        <div className="mt-20">
          <p data-reveal className="eyebrow text-aqua-400">
            USE CASES
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u, i) => (
              <li
                key={u.title}
                data-reveal
                style={revealDelay((i % 4) * 80)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-aqua-400/50 hover:bg-white/[0.07]"
              >
                <u.icon aria-hidden className="size-5 text-aqua-400 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 font-bold">{u.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.85] text-white/60">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 進め方 & 対応範囲 */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div data-reveal className="glass rounded-[1.5rem] p-7 sm:p-9">
            <p className="flex items-center gap-2 font-bold">
              <Workflow aria-hidden className="size-5 text-aqua-400" />
              AI開発の進め方
            </p>
            <ol className="mt-6 space-y-3">
              {process.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-aqua-400/50 font-display text-xs font-bold text-aqua-300">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/85">{p}</span>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal style={revealDelay(120)} className="glass rounded-[1.5rem] p-7 sm:p-9">
            <p className="flex items-center gap-2 font-bold">
              <Sparkles aria-hidden className="size-5 text-aqua-400" />
              受託開発の対応範囲
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {scope.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white/85">
                  <span className="font-display text-xs font-bold text-aqua-400">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-14 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <ButtonLink href="/#contact" size="lg">
            AI活用について相談する
          </ButtonLink>
          <ButtonLink href="/demo-lab/" size="lg" variant="outline-light">
            AIデモを試してみる
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
