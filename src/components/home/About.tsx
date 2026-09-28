import { Code2, Cpu, Ear, Rocket, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

const steps = [
  {
    en: "HEARING",
    title: "課題を聞く",
    text: "業務分析・ヒアリングを通じて、事業の目的と「本当の課題」を言語化します。RFP作成からご支援可能です。",
    icon: Ear,
  },
  {
    en: "SELECT",
    title: "技術を選ぶ",
    text: "AI・Web・クラウドの中から、目的・予算・スピードに合った技術構成をご提案します。",
    icon: Cpu,
  },
  {
    en: "TEAM",
    title: "チームを作る",
    text: "PM・PL、フロントエンド、バックエンドなど、プロジェクトに最適なエンジニア体制を編成します。",
    icon: Users,
  },
  {
    en: "BUILD",
    title: "開発する",
    text: "要求・要件定義から基本設計・詳細設計、実装・テストまで一気通貫で開発します。",
    icon: Code2,
  },
  {
    en: "RUN",
    title: "運用する",
    text: "サーバー構築・インフラ対応からリリース後の改善まで、使われ続ける仕組みを支えます。",
    icon: Rocket,
  },
];

// MiTok 掲載の紹介記事「jyugo合同会社が選ばれる理由」より
const reasons = [
  {
    title: "一気通貫の提供体制",
    text: "業務分析・要件定義から、コンサルティング、設計、開発、インフラ構築までワンストップで対応します。",
  },
  {
    title: "領域を超えたスペシャリスト集団",
    text: "AI／機械学習モデルからWebアーキテクチャ・クラウド環境まで、専門領域をまたいでシームレスに連携します。",
  },
  {
    title: "開発のボトルネックを解消",
    text: "AIと既存のビジネスインフラをスムーズに接続し、スピード感を持った社会実装を実現します。",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              en="ABOUT"
              title={
                <span id="about-title">
                  jyugoは、
                  <br />
                  何をする会社か。
                </span>
              }
            />
          </div>
          <div data-reveal style={revealDelay(120)} className="lg:col-span-7 lg:pt-12">
            <p className="text-xl font-bold leading-[1.8] text-navy-900 sm:text-2xl">
              jyugoは、<span className="text-gradient-deep">システムを作って終わる会社</span>ではありません。
            </p>
            <p className="mt-6 text-[15px] leading-[2.05] text-muted sm:text-base">
              事業課題から考え、必要な技術とエンジニアを組み合わせ、実際に使われるところまで伴走します。
              AI・機械学習からWebアーキテクチャ、クラウドインフラまでを横断できるエンジニアが、
              「構想」と「実装」のあいだにある壁を取り払います。
            </p>
          </div>
        </div>

        {/* 課題を聞く → 技術を選ぶ → チームを作る → 開発する → 運用する */}
        <div className="relative mt-16 lg:mt-20">
          <div
            aria-hidden
            className="flow-line absolute left-[10%] right-[10%] top-[52px] hidden h-px bg-linear-to-r from-electric-500/10 via-electric-500/40 to-iris-500/10 lg:block"
          />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => (
              <li key={step.en} data-reveal style={revealDelay(i * 90)}>
                <div className="group h-full rounded-3xl border border-line bg-white/90 p-6 shadow-[0_2px_20px_-12px_rgba(11,21,48,0.25)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-electric-500/40 hover:shadow-[0_24px_50px_-24px_rgba(47,107,255,0.45)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[0_10px_24px_-10px_rgba(47,107,255,0.8)]">
                      <step.icon aria-hidden className="size-6" />
                    </span>
                    <span className="font-display text-4xl font-extrabold text-navy-900/[0.07]">0{i + 1}</span>
                  </div>
                  <p className="eyebrow mt-6 text-electric-500">
                    STEP 0{i + 1} / {step.en}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.95] text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 選ばれる理由 */}
        <div className="mt-24 lg:mt-28">
          <div data-reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-electric-500">
                WHY <span className="normal-case">jyugo</span>
              </p>
              <h3 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">jyugoが選ばれる理由</h3>
            </div>
            <p className="max-w-md text-sm leading-[1.9] text-muted">
              「最新AI技術」と「基幹システム」、双方の言葉を理解するパートナーとして、部門間の伝達ミスや分断を防ぎます。
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <article
                key={r.title}
                data-reveal
                style={revealDelay(i * 100)}
                className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 text-white"
              >
                <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-electric-500/30 blur-3xl" />
                <p className="relative font-display text-sm font-bold tracking-[0.2em] text-aqua-400">REASON 0{i + 1}</p>
                <h4 className="relative mt-4 text-xl font-bold">{r.title}</h4>
                <p className="relative mt-4 text-sm leading-[2] text-white/70">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
