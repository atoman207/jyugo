import Link from "next/link";
import { ArrowRight, Brain, Check, Globe, Layers, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techStack } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

const pillars = [
  {
    en: "AI & DX DEVELOPMENT",
    ja: "AI・DX開発",
    icon: Brain,
    lead: "生成AIや機械学習を、現場で「使える」仕組みに。",
    items: ["生成AI・AI Agent開発", "RAG・AIチャットボット", "業務のAI化・自動化", "AI導入支援・データ分析", "AIを活用したSaaS開発"],
    link: { href: "/#ai", label: "AI開発について詳しく" },
  },
  {
    en: "SYSTEM DEVELOPMENT",
    ja: "業務システム開発",
    icon: Layers,
    lead: "Excelや紙の業務を、事業とともに成長できるシステムへ。",
    items: ["業務システム・管理画面", "SaaS開発", "予約・顧客管理（CRM）", "ECシステム", "サーバー構築・クラウド移行"],
    link: { href: "/demo-lab/", label: "システムのデモを見る" },
  },
  {
    en: "WEB DEVELOPMENT",
    ja: "Web開発",
    icon: Globe,
    lead: "事業の顔となるWebサイトと、Webアプリケーションを。",
    items: ["コーポレートサイト", "サービスサイト・LP", "Webアプリケーション開発", "フロントエンド開発（React / Next.js）"],
    link: { href: "/#works", label: "開発経験を見る" },
  },
  {
    en: "SES / ENGINEERING",
    ja: "SES・エンジニア支援",
    icon: Users,
    lead: "必要なスキルを、必要なタイミングでチームに。",
    items: ["フルスタックエンジニア", "バックエンド／フロントエンド", "クラウドエンジニア", "PM・PL／PMO"],
    link: { href: "/#team", label: "エンジニアチームを見る" },
  },
];

// 会社紹介資料「コンサルティングサービス事業」より
const consulting = [
  "新規ビジネス戦略",
  "営業戦略",
  "DX・AIシステム戦略",
  "PR企画戦略",
  "HR戦略",
  "BPR戦略",
  "ERP導入",
  "SAP導入",
  "Salesforce導入",
  "CRM導入",
];

export function Service() {
  return (
    <section id="service" aria-labelledby="service-title" className="relative bg-mist py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          en="SERVICE"
          title={<span id="service-title">事業を動かす、4つの専門領域。</span>}
          lead="AIシステム開発から業務・Webシステム、エンジニアチームの提供まで。課題に合わせて領域を組み合わせ、ワンストップでご支援します。"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <article
              key={p.en}
              data-reveal
              style={revealDelay((i % 2) * 120)}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(23,48,103,0.45)] sm:p-9"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.18em] text-electric-500">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-[1.35rem] font-extrabold tracking-[0.02em] text-navy-900 sm:text-2xl">
                    {p.en}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-muted">{p.ja}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-electric-50 text-electric-600 transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <p.icon aria-hidden className="size-6" />
                </span>
              </div>
              <p className="mt-6 text-[15px] font-bold leading-[1.8] text-navy-900">{p.lead}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13.5px] leading-[1.7] text-muted">
                    <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-electric-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={p.link.href}
                className="mt-8 inline-flex w-fit items-center gap-2 pt-2 text-sm font-bold text-electric-600 hover:text-iris-500 sm:mt-auto"
              >
                {p.link.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        {/* コンサルティング */}
        <div
          id="consulting"
          data-reveal
          className="relative mt-8 grid scroll-mt-24 gap-10 overflow-hidden rounded-[1.75rem] bg-navy-900 p-7 text-white sm:p-10 lg:grid-cols-12 lg:p-12"
        >
          <div aria-hidden className="absolute -left-20 -top-24 size-72 rounded-full bg-iris-500/25 blur-[100px]" />
          <div className="relative lg:col-span-5">
            <p className="eyebrow text-aqua-400">CONSULTING</p>
            <h3 className="mt-4 text-2xl font-bold">コンサルティングサービス</h3>
            <p className="mt-5 text-sm leading-[2] text-white/70">
              ご要望に応じて、優秀なコンサルタント・エンジニアをご提案させていただきます。
              チーム体制のご提案もお受けいたしますので、お気軽にお問合せください。
            </p>
          </div>
          <ol className="relative grid gap-2.5 sm:grid-cols-2 lg:col-span-7">
            {consulting.map((c, i) => (
              <li key={c} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                <span className="font-display text-xs font-bold text-aqua-400">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>

        {/* 技術スタック */}
        <div data-reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <p className="eyebrow shrink-0 text-navy-900/50">TECH STACK</p>
          <ul className="flex flex-wrap gap-2" aria-label="対応技術">
            {techStack.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-line bg-white px-3 py-1.5 font-display text-[13px] font-bold text-navy-800"
              >
                {t}
              </li>
            ))}
            <li className="px-2 py-1.5 font-display text-[13px] font-bold text-muted">etc.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
