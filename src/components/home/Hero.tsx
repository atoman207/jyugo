import Image from "next/image";
import { Bot, CheckCircle2, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import engineer from "@/assets/images/engineer.jpg";

const services = ["AIシステム開発", "Web・業務システム", "SES", "DX支援"];
const keywords = ["AI", "SYSTEM", "CLOUD", "ENGINEER", "DX", "WEB", "SES", "CONSULTING"];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-950 text-white">
      {/* 背景: グリッド・光・データフロー */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -right-40 -top-40 size-[40rem] rounded-full bg-electric-500/25 blur-[140px]" />
        <div className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-iris-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[50rem] -translate-x-1/2 rounded-full bg-aqua-400/10 blur-[120px]" />
        <svg className="absolute inset-0 size-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <linearGradient id="hero-line" x1="0" x2="1">
              <stop offset="0" stopColor="#38d5ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#5b8cff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="dash-flow" d="M-20 640 C 360 560, 620 760, 980 600 S 1380 520, 1460 560" stroke="url(#hero-line)" strokeWidth="1.2" fill="none" />
          <path className="dash-flow dash-slow" d="M-20 720 C 420 660, 700 820, 1040 700 S 1400 640, 1460 680" stroke="url(#hero-line)" strokeWidth="1" fill="none" />
          <path className="dash-flow" d="M-20 200 C 300 260, 520 120, 860 200 S 1300 300, 1460 220" stroke="url(#hero-line)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      <div className="container-x grid items-center gap-14 pb-16 pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-36">
        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow text-aqua-400">
            BUSINESS <span className="text-white/40">×</span> TECHNOLOGY <span className="text-white/40">×</span> PEOPLE
          </p>
          <h1
            id="hero-title"
            data-reveal
            style={revealDelay(80)}
            className="mt-6 text-[2.4rem] font-bold leading-[1.35] tracking-[0.02em] sm:text-6xl lg:text-[4.1rem]"
          >
            企業の未来を、
            <br />
            技術と人の力で
            <br />
            <span className="text-gradient">実装する。</span>
          </h1>
          <p
            data-reveal
            style={revealDelay(160)}
            className="mt-8 max-w-xl text-[15px] leading-[2] text-white/75 sm:text-base"
          >
            jyugo（ジュゴー）は、横浜のITベンチャーです。
            <br className="hidden sm:block" />
            事業課題の整理からAI・システム開発、エンジニアチームの提供、運用まで。
            <br className="hidden sm:block" />
            「実際に使われる」ところまで、一気通貫で伴走します。
          </p>
          <ul
            data-reveal
            style={revealDelay(220)}
            className="mt-8 flex flex-wrap gap-2"
            aria-label="主なサービス"
          >
            {services.map((s) => (
              <li key={s} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/90">
                {s}
              </li>
            ))}
          </ul>
          <div
            data-reveal
            style={revealDelay(280)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <ButtonLink href="/#contact" size="lg">
              開発について相談する
            </ButtonLink>
            <ButtonLink href="/recruit/" size="lg" variant="outline-light">
              エンジニアとして参加する
            </ButtonLink>
          </div>
          <p className="mt-10 font-display text-xs font-semibold tracking-[0.18em] text-white/40">{company.tagline}</p>
        </div>

        {/* ビジュアル: エンジニア × システム画面 */}
        <div data-reveal style={revealDelay(200)} className="lg:col-span-5">
          <div className="relative mx-auto aspect-[1/1.06] w-full max-w-[520px]">
            <div aria-hidden className="absolute inset-10 rounded-[3rem] bg-brand-gradient opacity-40 blur-3xl" />
            <figure className="absolute right-0 top-0 w-[84%] overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <Image
                src={engineer}
                alt="明るいオフィスでノートパソコンに向かいコーディングするエンジニア"
                className="aspect-[4/3.2] w-full object-cover"
                sizes="(min-width: 1024px) 440px, 86vw"
                loading="eager"
                fetchPriority="high"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/55 via-transparent to-transparent" />
            </figure>

            {/* AI アシスタント UI */}
            <div className="glass-strong animate-float absolute left-0 top-[42%] z-10 w-[84%] rounded-2xl sm:top-[36%] sm:w-[62%] p-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] sm:p-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-white">
                  <span className="grid size-6 place-items-center rounded-md bg-brand-gradient">
                    <Bot aria-hidden className="size-3.5" />
                  </span>
                  AI Knowledge Assistant
                </p>
                <span className="flex items-center gap-1 text-[10px] text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
              </div>
              <p className="ml-auto mt-4 w-fit max-w-[90%] rounded-xl rounded-br-sm bg-electric-500 px-3 py-2 text-[11.5px] leading-relaxed">
                経費精算の締め日はいつですか？
              </p>
              <div className="mt-2 max-w-[95%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11.5px] leading-relaxed text-white/90">
                毎月25日締め、翌月10日の支払いです。
                <span className="mt-1.5 flex items-center gap-1 text-[10px] text-aqua-300">
                  <FileText aria-hidden className="size-3" /> 出典：経費精算規程 第4条
                </span>
              </div>
            </div>

            {/* コード・デプロイ UI */}
            <div className="glass-strong absolute bottom-0 right-0 z-20 hidden w-[54%] rounded-2xl sm:block p-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
              <div aria-hidden className="flex gap-1.5">
                <span className="size-2 rounded-full bg-rose-400/80" />
                <span className="size-2 rounded-full bg-amber-300/80" />
                <span className="size-2 rounded-full bg-emerald-400/80" />
              </div>
              <pre className="mt-3 overflow-hidden font-mono text-[10.5px] leading-[1.7] text-white/80">
                <span className="text-iris-400">const</span> docs = <span className="text-aqua-300">await</span> search(q)
                {"\n"}
                <span className="text-iris-400">const</span> ans = <span className="text-aqua-300">await</span> ai.answer(docs)
              </pre>
              <p className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-3 text-[10.5px] font-semibold text-emerald-300">
                <CheckCircle2 aria-hidden className="size-3.5" /> Deployed to production
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* キーワードのマーキー */}
      <div aria-hidden className="relative border-y border-white/10 bg-navy-900/60 py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap font-display text-sm font-bold tracking-[0.35em] text-white/35">
          {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
            <span key={i} className="flex items-center gap-12 pr-12">
              {k}
              <span className="size-1 rounded-full bg-aqua-400/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
