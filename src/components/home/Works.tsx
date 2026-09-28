import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Brain,
  Building2,
  CalendarDays,
  Check,
  CreditCard,
  Globe,
  Landmark,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

const domains = [
  { name: "金融", en: "FINANCE", text: "高い品質と安全性が求められる業務Webシステム・データ連携", icon: Landmark },
  { name: "物流", en: "LOGISTICS", text: "在庫・配送など、現場オペレーションを支える管理システム", icon: Truck },
  { name: "AI", en: "AI", text: "生成AI・機械学習を活用した業務効率化とデータ活用", icon: Brain },
  { name: "EC", en: "E-COMMERCE", text: "商品管理・決済・会員機能を備えたECサイト／EC基盤", icon: ShoppingCart },
  { name: "SaaS", en: "SAAS", text: "サブスクリプション型Webサービスの設計・開発", icon: Boxes },
  { name: "業務システム", en: "BUSINESS SYSTEM", text: "顧客管理・予約管理・管理画面などの社内システム", icon: Building2 },
  { name: "Webシステム", en: "WEB SYSTEM", text: "企業サイト・Webアプリケーションのフロント／バックエンド", icon: Globe },
];

const featuredPoints = ["会員登録・認証", "継続課金（サブスクリプション）", "イベント管理・申込", "運営向け管理画面"];
const featuredStack = ["Next.js", "PostgreSQL", "Stripe", "Cloud"];

/** 会員・決済プラットフォームの画面イメージ */
function PlatformMock() {
  const members = [
    { name: "Member A", plan: "Premium", status: "有効" },
    { name: "Member B", plan: "Standard", status: "有効" },
    { name: "Member C", plan: "Standard", status: "更新待ち" },
  ];
  return (
    <div aria-hidden className="relative h-full min-h-[320px] overflow-hidden rounded-[1.5rem] bg-navy-900 p-4 text-white sm:p-6">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -right-10 -top-10 size-56 rounded-full bg-electric-500/30 blur-3xl" />
      <div className="relative flex h-full gap-4">
        <div className="hidden w-32 shrink-0 flex-col gap-2 rounded-xl bg-white/5 p-3 sm:flex">
          <span className="mb-2 font-display text-xs font-extrabold">Membership</span>
          {[Users, CreditCard, CalendarDays].map((Icon, i) => (
            <span
              key={i}
              className={["flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px]", i === 0 ? "bg-electric-500" : "text-white/60"].join(" ")}
            >
              <Icon className="size-3" />
              {["会員", "決済", "イベント"][i]}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["会員", "Active"],
              ["課金", "Monthly"],
              ["イベント", "Open"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/[0.07] p-3">
                <p className="text-[9px] text-white/50">{k}</p>
                <p className="mt-1 font-display text-xs font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white/[0.07] p-3">
            <p className="text-[10px] font-bold text-white/70">会員一覧</p>
            <ul className="mt-2 divide-y divide-white/10">
              {members.map((m) => (
                <li key={m.name} className="flex items-center justify-between py-2 text-[10px]">
                  <span className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-linear-to-br from-aqua-400 to-iris-500" />
                    {m.name}
                  </span>
                  <span className="text-white/60">{m.plan}</span>
                  <span
                    className={[
                      "rounded-full px-2 py-0.5",
                      m.status === "有効" ? "bg-emerald-400/20 text-emerald-300" : "bg-amber-300/20 text-amber-200",
                    ].join(" ")}
                  >
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-electric-500/40 to-iris-500/40 p-3">
            <span className="text-[10px]">
              <span className="block font-bold">Stripe 決済連携</span>
              <span className="text-white/60">継続課金・請求を自動化</span>
            </span>
            <CreditCard className="size-5 text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Works() {
  return (
    <section id="works" aria-labelledby="works-title" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          en="WORKS"
          title={<span id="works-title">OUR TEAM EXPERIENCE</span>}
          lead="所属・協力エンジニアがこれまでのプロジェクトで培ってきた経験をご紹介します。守秘義務により企業名は公開していませんが、同様の課題をお持ちの方には、具体的な進め方をご説明できます。"
        />

        {/* 注目事例 */}
        <article data-reveal className="mt-14 grid gap-8 rounded-[2rem] border border-line bg-mist p-4 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
          <div className="lg:col-span-7">
            <PlatformMock />
          </div>
          <div className="flex flex-col justify-center px-2 pb-4 sm:px-2 lg:col-span-5 lg:pb-0">
            <p className="eyebrow text-electric-500">FEATURED</p>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-snug text-navy-900 sm:text-[1.75rem]">
              Membership / Payment Platform
            </h3>
            <p className="mt-3 text-[15px] font-bold leading-[1.8] text-navy-900">
              会員・継続課金・イベント・管理機能を統合したWebプラットフォーム
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {featuredPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13.5px] text-muted">
                  <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-electric-500" />
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="使用技術">
              {featuredStack.map((t) => (
                <li key={t} className="rounded-lg bg-navy-900 px-3 py-1.5 font-display text-xs font-bold text-white">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* 経験領域 */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <li
              key={d.name}
              data-reveal
              style={revealDelay((i % 4) * 80)}
              className="group rounded-[1.25rem] border border-line bg-white p-6 transition duration-300 hover:border-electric-500/40 hover:shadow-[0_20px_40px_-24px_rgba(47,107,255,0.45)]"
            >
              <div className="flex items-center justify-between">
                <d.icon aria-hidden className="size-6 text-electric-500" />
                <span className="font-display text-[10px] font-bold tracking-[0.18em] text-navy-900/35">{d.en}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{d.name}</h3>
              <p className="mt-2 text-[13px] leading-[1.85] text-muted">{d.text}</p>
            </li>
          ))}
          <li data-reveal style={revealDelay(240)}>
            <Link
              href="/#contact"
              className="group flex h-full min-h-[180px] flex-col justify-between rounded-[1.25rem] bg-brand-gradient p-6 text-white transition duration-300 hover:-translate-y-1"
            >
              <span className="text-lg font-bold leading-[1.6]">
                近い事例について、
                <br />
                詳しく聞いてみる
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-bold">
                お問い合わせ <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
        <p className="mt-6 text-xs text-muted">※ 掲載内容には、所属・協力エンジニアが過去に参画したプロジェクトでの経験を含みます。</p>
      </div>
    </section>
  );
}
