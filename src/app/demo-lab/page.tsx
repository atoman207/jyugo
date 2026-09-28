import type { ComponentType } from "react";
import Link from "next/link";
import { Layers, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { KnowledgeAssistant } from "@/components/demos/KnowledgeAssistant";
import { MatchingSystem } from "@/components/demos/MatchingSystem";
import { CrmDashboard } from "@/components/demos/CrmDashboard";
import { ReservationSystem } from "@/components/demos/ReservationSystem";
import { demos, type DemoId } from "@/lib/demos";
import { pageMetadata } from "@/lib/metadata";
import blueBokeh from "@/assets/images/blue-bokeh.jpg";

export const metadata = pageMetadata({
  title: "DEMO LAB",
  description:
    "jyugoが開発したデモアプリケーションをブラウザで体験できます。AI Knowledge Assistant、AI Matching System、CRM Dashboard、Reservation System。",
  path: "/demo-lab/",
});

const components: Record<DemoId, ComponentType> = {
  knowledge: KnowledgeAssistant,
  matching: MatchingSystem,
  crm: CrmDashboard,
  reservation: ReservationSystem,
};

// 実案件で構築する場合の構成例
const production: Record<DemoId, string[]> = {
  knowledge: ["LLM（生成AI）× ベクトル検索による RAG", "PDF・Word・社内Wikiの自動取り込み", "SSO・閲覧権限に応じた回答制御"],
  matching: ["スキル表記ゆれの正規化・類似度計算", "案件／人材データベースとの連携", "提案書・スキルシートの自動生成"],
  crm: ["既存SFA・会計システムとのデータ連携", "権限管理・監査ログ", "売上予測・レポートの自動配信"],
  reservation: ["オンライン決済（Stripe等）", "リマインドメール・LINE通知", "顧客管理・会員機能との連携"],
};

export default function DemoLabPage() {
  return (
    <>
      <PageHero
        en="DEMO LAB"
        image={blueBokeh}
        title={
          <>
            つくれるものを、
            <br />
            <span className="text-gradient">触って確かめる。</span>
          </>
        }
        lead={
          <p>
            「こういうものが作れます」ではなく、「こちらが実際に動くデモです」。
            jyugoが開発したデモアプリケーションを、ブラウザでそのままお試しいただけます。
          </p>
        }
      >
        <ul className="mt-10 flex flex-wrap gap-2">
          {demos.map((d, i) => (
            <li key={d.id}>
              <Link
                href={`#${d.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[13px] font-bold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                <span className="font-display text-[11px] text-aqua-300">0{i + 1}</span>
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 inline-flex items-center gap-2 text-[12.5px] text-white/55">
          <ShieldCheck aria-hidden className="size-4 text-aqua-400" />
          すべてのデモは架空のサンプルデータで動作します。入力内容が外部に送信・保存されることはありません。
        </p>
      </PageHero>

      {demos.map((d, i) => {
        const Demo = components[d.id];
        return (
          <section
            key={d.id}
            id={d.id}
            aria-labelledby={`${d.id}-title`}
            className={["scroll-mt-20 py-20 lg:py-24", i % 2 === 0 ? "bg-white" : "bg-mist"].join(" ")}
          >
            <div className="container-x">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="eyebrow flex items-center gap-2 text-electric-500">
                    <d.icon aria-hidden className="size-4" /> DEMO 0{i + 1}
                  </p>
                  <h2 id={`${d.id}-title`} className="mt-4 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
                    {d.name}
                  </h2>
                  <p className="mt-2 text-base font-bold text-electric-600">{d.ja}</p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[2] text-muted">{d.description}</p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-5 lg:col-span-5">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-navy-900">
                    <Layers aria-hidden className="size-4 text-electric-500" />
                    実案件で構築する場合
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {production[d.id].map((p) => (
                      <li key={p} className="flex gap-2 text-[13px] leading-[1.8] text-muted">
                        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-electric-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-[11.5px] font-bold text-navy-800">
                        #{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <DemoFrame title={d.name}>
                  <Demo />
                </DemoFrame>
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-24">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />
        <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow text-aqua-400">
              BUILD WITH <span className="normal-case">jyugo</span>
            </p>
            <p className="mt-4 text-2xl font-bold leading-[1.6] sm:text-3xl">このようなシステムを、貴社の業務に合わせて。</p>
            <p className="mt-3 text-[15px] text-white/70">まずは小さなPoCから。課題の整理からご一緒します。</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact" size="lg">
              開発について相談する
            </ButtonLink>
            <ButtonLink href="/#service" size="lg" variant="outline-light">
              サービスを見る
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
