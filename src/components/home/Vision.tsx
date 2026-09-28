import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import seaHorizon from "@/assets/images/sea-horizon.jpg";
import dugong from "@/assets/images/dugong-seaglass.jpg";

// 会社紹介資料「To be at peace」の図より
const peace = [
  {
    key: "LOVE",
    ja: "精神的豊かさ",
    color: "#f5b83d",
    items: "Family, Animal, Nature, Art, Study, Country, Self, Company, etc.",
  },
  {
    key: "MONEY",
    ja: "経済的価値",
    color: "#4ade80",
    items: "Work, Investment, Asset Management, Stocks, Pensions, Real Estate, Cryptocurrency, FX, etc.",
  },
  {
    key: "HOUSE",
    ja: "生活基盤",
    color: "#38d5ff",
    items: "House, condominium, public corporation, share house, camper, tent, log house, garden, parking lot, etc.",
  },
];

const hexagon = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <Image src={seaHorizon} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950/80 via-navy-950/55 to-navy-950" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="dark"
              en="VISION"
              title={
                <span id="vision-title">
                  世界平和のために、
                  <br />
                  科学する。
                </span>
              }
            />
            <p data-reveal className="mt-6 font-display text-lg font-semibold tracking-[0.04em] text-aqua-300 sm:text-xl">
              {company.tagline}
            </p>
            <p data-reveal className="mt-6 max-w-2xl text-[15px] leading-[2.1] text-white/75 sm:text-base">
              社名の「jyugo（ジュゴー）」は、ジュゴン（dugong）と「Eternal（永遠）」に由来します。
              絶滅が心配されるジュゴンが、いつまでも平和に暮らせる世界であってほしい——。
              その願いを込めて、私たちは「世界平和のために科学する集団」として、テクノロジーの力で人と社会の土台をつくります。
            </p>
            <blockquote
              data-reveal
              className="mt-8 max-w-2xl border-l-2 border-aqua-400/80 pl-5 font-display text-sm italic leading-[1.9] text-white/55"
            >
              “jyugo was inspired by the dugongs and Eternal with the hope that the extinct dugongs could live in peace for a
              long time.”
            </blockquote>
          </div>

          <figure data-reveal style={revealDelay(150)} className="mx-auto w-full max-w-md lg:col-span-5">
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-aqua-400/20 blur-3xl" />
              <Image
                src={dugong}
                alt="シーグラスで描かれたジュゴンのアート（jyugoのシンボル）"
                sizes="(min-width: 1024px) 420px, 90vw"
                className="relative w-full rotate-[-2deg] rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              />
            </div>
            <figcaption className="mt-6 text-center font-display text-xs tracking-[0.2em] text-white/45">
              SYMBOL — DUGONG × ETERNAL
            </figcaption>
          </figure>
        </div>

        {/* To be at peace */}
        <div data-reveal className="glass mt-20 rounded-[2rem] p-7 sm:p-10 lg:mt-24 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="eyebrow text-aqua-400">TO BE AT PEACE</p>
              <h3 className="mt-4 text-2xl font-bold leading-[1.6] sm:text-[1.7rem]">
                LOVE・MONEY・HOUSE
                <br />
                の調和を目指して。
              </h3>
              <p className="mt-5 text-sm leading-[2] text-white/70">
                経済的価値（MONEY）と生活基盤（HOUSE）、精神的豊かさ（LOVE）の調和を目指す独自の哲学のもと、
                ビジネスの成長と社会の基盤づくりを支援します。
              </p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
              {peace.map((p, i) => (
                <li key={p.key} data-reveal style={revealDelay(i * 120)} className="text-center sm:text-left">
                  <div
                    className="mx-auto grid h-[104px] w-[92px] place-items-center sm:mx-0"
                    style={{ clipPath: hexagon, backgroundColor: p.color }}
                  >
                    <span className="font-display text-sm font-extrabold tracking-[0.12em] text-navy-950">{p.key}</span>
                  </div>
                  <p className="mt-4 text-base font-bold">{p.ja}</p>
                  <p className="mt-2 font-display text-[12.5px] leading-[1.8] text-white/55">{p.items}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
