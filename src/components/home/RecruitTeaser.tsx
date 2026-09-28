import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, House, Laptop, Stamp, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import seaClouds from "@/assets/images/sea-clouds.jpg";

const supports = [
  { label: "住宅支援（社宅）", icon: House },
  { label: "日本語学習支援", icon: BookOpen },
  { label: "ビザ取得支援", icon: Stamp },
  { label: "キャリアパス", icon: TrendingUp },
  { label: "モダンな開発環境", icon: Laptop },
  { label: "正社員・契約社員", icon: Briefcase },
];

export function RecruitTeaser() {
  return (
    <section id="recruit" aria-labelledby="recruit-title" className="relative isolate overflow-hidden py-24 text-white lg:py-32">
      <Image src={seaClouds} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/95 via-navy-900/85 to-electric-600/45" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            tone="dark"
            en="RECRUIT"
            title={
              <span id="recruit-title" className="font-display text-5xl tracking-[-0.01em] sm:text-6xl lg:text-7xl">
                JOIN jyugo
              </span>
            }
          />
          <p data-reveal className="mt-6 text-xl font-bold leading-[1.7] sm:text-2xl">技術で、世界を少し平和にする仲間へ。</p>
          <p data-reveal className="mt-5 max-w-xl text-[15px] leading-[2.05] text-white/75">
            jyugoでは、日本人エンジニアはもちろん、外国籍のフルスタックエンジニアも活躍しています。
            住まい・日本語・ビザのサポートで、日本で働く一歩を後押しします。
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {supports.map((s, i) => (
              <li
                key={s.label}
                data-reveal
                style={revealDelay(i * 60)}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-3 text-[13px] font-medium backdrop-blur"
              >
                <s.icon aria-hidden className="size-4 shrink-0 text-aqua-300" />
                {s.label}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/recruit/" variant="light" size="lg">
              採用情報を見る
            </ButtonLink>
            <ButtonLink href={company.indeedUrl} variant="outline-light" size="lg">
              Indeed で応募する
            </ButtonLink>
          </div>
        </div>

        <div data-reveal style={revealDelay(150)} className="lg:col-span-5">
          <Link
            href="/recruit/#work-in-japan"
            className="glass group block rounded-[1.75rem] p-8 transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:p-10"
            lang="en"
          >
            <p className="eyebrow text-aqua-300">FOR GLOBAL ENGINEERS</p>
            <p className="mt-5 font-display text-3xl font-extrabold leading-tight">
              WORK IN JAPAN
              <br />
              WITH jyugo
            </p>
            <p className="mt-5 font-display text-sm leading-[1.9] text-white/75">
              Build AI and web systems for Japanese businesses — with support for housing, Japanese language learning and
              visas.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-bold">
              Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
