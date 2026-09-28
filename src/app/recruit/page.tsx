import Image from "next/image";
import {
  BookOpen,
  Briefcase,
  Cpu,
  FileSearch,
  Globe2,
  Handshake,
  House,
  Laptop,
  Mail,
  PartyPopper,
  Send,
  Sprout,
  Stamp,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, techStack } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { revealDelay } from "@/lib/reveal";
import seaClouds from "@/assets/images/sea-clouds.jpg";
import engineer from "@/assets/images/engineer.jpg";

export const metadata = pageMetadata({
  title: "採用情報 JOIN jyugo",
  description:
    "jyugo合同会社の採用情報。フルスタック・バックエンド・フロントエンド・クラウド・AIエンジニア、PM/PMOを募集しています。住宅・日本語学習・ビザ取得のサポートで、外国籍エンジニアの日本での就業も後押しします。",
  path: "/recruit/",
});

const values = [
  {
    en: "TECHNOLOGY",
    title: "領域を越えて、技術を磨く",
    text: "AI・機械学習からWeb、クラウドまで。ひとつの言語や領域にとどまらず、フルスタックに成長できるプロジェクトに挑戦できます。",
    icon: Cpu,
  },
  {
    en: "DIVERSITY",
    title: "国籍を越えて、ひとつのチームに",
    text: "日本・インドをはじめ、さまざまな国籍のエンジニアが在籍。異なる文化や視点が、より良いシステムづくりにつながると考えています。",
    icon: Globe2,
  },
  {
    en: "GROWTH",
    title: "人を、リソースとして扱わない",
    text: "一人ひとりの志向や強みに向き合い、キャリアと成長を支えます。「人」を大切にする代表の想いが、会社の土台です。",
    icon: Sprout,
  },
];

const supports = [
  { title: "住宅支援（社宅）", text: "来日・入社直後の住まい探しの負担を減らせるよう、社宅などの住宅面をサポートします。", icon: House },
  { title: "日本語学習支援", text: "日本のお客様と円滑に仕事ができるよう、日本語の学習をサポートします。", icon: BookOpen },
  { title: "ビザ取得支援", text: "外国籍エンジニアの就労ビザの取得・更新に必要な手続きをサポートします。", icon: Stamp },
  { title: "キャリアパス", text: "開発メンバーからリーダー、PL・PM、スペシャリストまで、志向に合わせたキャリアを一緒に考えます。", icon: TrendingUp },
  { title: "モダンな開発環境", text: "Python・TypeScript・React・Node.js・AWSなど、モダンな技術を使ったプロジェクトに参画できます。", icon: Laptop },
  { title: "多様なチーム", text: "国籍やバックグラウンドの異なるメンバーと、互いに学び合いながら働けます。", icon: Users },
];

const positions = [
  { title: "フルスタックエンジニア", text: "フロントエンドからバックエンド、インフラまで横断的に開発" },
  { title: "バックエンドエンジニア", text: "Node.js・Python などによる API・業務システム開発" },
  { title: "フロントエンドエンジニア", text: "React・Next.js による Web アプリケーション開発" },
  { title: "クラウドエンジニア", text: "AWS などを用いたサーバー構築・インフラ設計・運用" },
  { title: "AIエンジニア", text: "生成AI・機械学習（TensorFlow / PyTorch）を活用したシステム開発" },
  { title: "PM・PL／PMO", text: "プロジェクトの推進・品質管理・顧客との要件調整" },
];

const flow = [
  { title: "応募", text: "Indeed の求人ページ、またはメールからご応募ください。", icon: Send },
  { title: "書類選考", text: "ご経歴・スキルを拝見し、面接のご案内をします。", icon: FileSearch },
  { title: "面接", text: "オンラインでの面接にも対応しています。", icon: Handshake },
  { title: "内定・入社", text: "条件をご確認いただき、入社準備をサポートします。", icon: PartyPopper },
];

export default function RecruitPage() {
  return (
    <>
      <PageHero
        en="RECRUIT"
        image={seaClouds}
        title={
          <span className="font-display text-5xl tracking-[-0.01em] sm:text-7xl lg:text-8xl">
            JOIN <span className="text-gradient">jyugo</span>
          </span>
        }
        lead={
          <>
            <p className="text-xl font-bold leading-[1.7] text-white sm:text-2xl">技術で、世界を少し平和にする仲間へ。</p>
            <p className="mt-5">
              jyugoは「A group of people who approach for world peace」を掲げる、横浜のITベンチャーです。
              日本人エンジニアはもちろん、外国籍のフルスタックエンジニアも活躍しています。
            </p>
          </>
        }
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href={company.indeedUrl} size="lg">
            Indeed で募集要項を見る
          </ButtonLink>
          <ButtonLink href="#work-in-japan" size="lg" variant="outline-light" external={false}>
            English — Work in Japan
          </ButtonLink>
        </div>
      </PageHero>

      {/* WHY jyugo */}
      <section aria-labelledby="why-title" className="bg-white py-24 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              en="WHY JOIN US"
              title={
                <span id="why-title">
                  jyugoで働く、
                  <br />
                  3つの理由。
                </span>
              }
            />
            <figure data-reveal className="mt-10 overflow-hidden rounded-[1.75rem]">
              <Image
                src={engineer}
                alt="オフィスでノートパソコンに向かうエンジニア"
                sizes="(min-width: 1024px) 460px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
          <ol className="space-y-5 lg:col-span-7 lg:pt-4">
            {values.map((v, i) => (
              <li key={v.en} data-reveal style={revealDelay(i * 100)} className="rounded-[1.5rem] border border-line bg-white p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white">
                    <v.icon aria-hidden className="size-5" />
                  </span>
                  <p className="font-display text-sm font-extrabold tracking-[0.18em] text-electric-600">
                    0{i + 1} / {v.en}
                  </p>
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy-900">{v.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[2] text-muted">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SUPPORT */}
      <section aria-labelledby="support-title" className="bg-mist py-24 lg:py-28">
        <div className="container-x">
          <SectionHeading
            en="SUPPORT"
            title={<span id="support-title">働く環境とサポート</span>}
            lead="日本で、そしてjyugoで安心して働き始められるよう、住まい・言葉・手続きの面からサポートします。具体的な内容は面接時に詳しくご説明します。"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supports.map((s, i) => (
              <li key={s.title} data-reveal style={revealDelay((i % 3) * 90)} className="rounded-[1.25rem] border border-line bg-white p-6">
                <s.icon aria-hidden className="size-6 text-electric-500" />
                <h3 className="mt-4 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.9] text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.25rem] bg-navy-900 p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <p className="text-[14.5px] leading-[1.9]">
              給与・勤務地・雇用形態・福利厚生などの<strong>募集要項</strong>は、Indeed の求人ページに掲載しています。
            </p>
            <ButtonLink href={company.indeedUrl} variant="light" className="shrink-0">
              募集要項を見る
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* POSITIONS */}
      <section aria-labelledby="positions-title" className="bg-white py-24 lg:py-28">
        <div className="container-x">
          <SectionHeading
            en="POSITIONS"
            title={<span id="positions-title">募集職種</span>}
            lead="正社員・契約社員を募集しています。経験やスキル、ご希望に合わせてプロジェクトをご提案します。"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={revealDelay((i % 3) * 90)}
                className="flex gap-4 rounded-[1.25rem] border border-line bg-white p-6 transition hover:border-electric-500/40 hover:shadow-[0_20px_40px_-24px_rgba(47,107,255,0.45)]"
              >
                <Briefcase aria-hidden className="mt-1 size-5 shrink-0 text-electric-500" />
                <div>
                  <h3 className="font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.85] text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="eyebrow shrink-0 text-navy-900/50">TECH STACK</p>
            <ul className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <li key={t} className="rounded-lg border border-line bg-white px-3 py-1.5 font-display text-[13px] font-bold text-navy-800">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section aria-labelledby="flow-title" className="bg-mist py-24 lg:py-28">
        <div className="container-x">
          <SectionHeading en="FLOW" title={<span id="flow-title">選考の流れ</span>} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <li key={f.title} data-reveal style={revealDelay(i * 90)} className="relative rounded-[1.25rem] bg-white p-6">
                <p className="font-display text-sm font-extrabold text-electric-500">STEP 0{i + 1}</p>
                <f.icon aria-hidden className="mt-4 size-6 text-navy-900" />
                <h3 className="mt-3 text-lg font-bold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.85] text-muted">{f.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs text-muted">※ 選考内容は職種や状況により変更となる場合があります。</p>
        </div>
      </section>

      {/* WORK IN JAPAN (English) */}
      <section id="work-in-japan" aria-labelledby="wij-title" lang="en" className="relative isolate scroll-mt-20 overflow-hidden bg-navy-950 py-24 text-white lg:py-28">
        <Image src={seaClouds} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/90 to-navy-900/70" />
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-aqua-400">FOR GLOBAL ENGINEERS</p>
            <h2 id="wij-title" className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              WORK IN JAPAN
              <br />
              WITH <span className="text-gradient">jyugo</span>
            </h2>
            <p className="mt-6 font-display text-[15px] leading-[1.9] text-white/75">
              jyugo LLC is an IT company based in Yokohama, Japan. We build AI systems, business systems and web
              applications for Japanese companies — and we believe technology can make the world a little more
              peaceful.
            </p>
            <p className="mt-4 font-display text-[15px] leading-[1.9] text-white/75">
              Engineers from Japan, India and other countries work together as one team. If you are a full-stack,
              back-end, front-end, cloud or AI engineer who wants to build a career in Japan, we would love to hear from
              you.
            </p>
          </div>
          <div className="lg:col-span-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Housing support", d: "Help with company housing when you start working in Japan.", i: House },
                { t: "Japanese language", d: "Support for learning Japanese to work smoothly with clients.", i: BookOpen },
                { t: "Visa support", d: "Assistance with work visa applications and renewals.", i: Stamp },
                { t: "Career growth", d: "Modern tech stack and a clear path to lead, PL and PM roles.", i: TrendingUp },
              ].map((x) => (
                <li key={x.t} className="glass rounded-2xl p-5">
                  <x.i aria-hidden className="size-5 text-aqua-400" />
                  <p className="mt-3 font-display font-bold">{x.t}</p>
                  <p className="mt-1.5 font-display text-[13px] leading-[1.8] text-white/65">{x.d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={company.indeedUrl}>Apply on Indeed</ButtonLink>
              <ButtonLink href={`mailto:${company.email}?subject=${encodeURIComponent("Application — Work in Japan with jyugo")}`} variant="outline-light">
                Contact by email
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ENTRY */}
      <section aria-labelledby="entry-title" className="bg-white py-24 lg:py-28">
        <div className="container-x">
          <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow text-white/80">ENTRY</p>
                <h2 id="entry-title" className="mt-4 text-3xl font-bold leading-[1.5] sm:text-4xl">
                  まずは、気軽に話してみませんか。
                </h2>
                <p className="mt-4 text-[15px] leading-[2] text-white/85">
                  jyugo合同会社の正社員・契約社員をご希望の方は、Indeed からご応募ください。
                  ご質問はメールでも受け付けています。
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
                <ButtonLink href={company.indeedUrl} variant="light" size="lg">
                  Indeed で応募する
                </ButtonLink>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent("採用について")}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/90 underline-offset-4 hover:underline"
                >
                  <Mail aria-hidden className="size-4" />
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
