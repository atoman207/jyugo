import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { demos, type DemoId } from "@/lib/demos";
import { revealDelay } from "@/lib/reveal";

/** カードに表示する小さな画面イメージ (CSS で描画) */
function Preview({ id }: { id: DemoId }) {
  switch (id) {
    case "knowledge":
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-6">
          <span className="ml-auto h-3 w-2/3 rounded-full bg-electric-500" />
          <span className="h-3 w-5/6 rounded-full bg-white/25" />
          <span className="h-3 w-3/5 rounded-full bg-white/15" />
          <span className="mt-1 h-2 w-1/3 rounded-full bg-aqua-400/60" />
        </div>
      );
    case "matching":
      return (
        <div className="flex h-full items-center justify-between px-6">
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-3 w-14 rounded-full bg-white/20" />
            ))}
          </div>
          <svg aria-hidden viewBox="0 0 80 60" className="h-16 w-20">
            <path d="M0 10 C40 10 40 30 80 30" stroke="#38d5ff" strokeWidth="1.5" fill="none" />
            <path d="M0 30 C40 30 40 30 80 30" stroke="#5b8cff" strokeWidth="1.5" fill="none" opacity=".6" />
            <path d="M0 50 C40 50 40 30 80 30" stroke="#9a82ff" strokeWidth="1.5" fill="none" opacity=".4" />
          </svg>
          <span className="grid size-14 place-items-center rounded-full bg-brand-gradient font-display text-sm font-extrabold">
            92
          </span>
        </div>
      );
    case "crm":
      return (
        <div className="flex h-full items-end gap-2 px-6 pb-6">
          {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md bg-linear-to-t from-electric-500 to-aqua-400"
              style={{ height: `${h * 0.7}%`, opacity: 0.45 + i * 0.08 }}
            />
          ))}
        </div>
      );
    case "reservation":
      return (
        <div className="grid h-full grid-cols-7 content-center gap-1.5 px-6">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={[
                "aspect-square rounded",
                i === 9 ? "bg-brand-gradient" : [3, 4, 12, 17].includes(i) ? "bg-white/5" : "bg-white/20",
              ].join(" ")}
            />
          ))}
        </div>
      );
  }
}

export function DemoLabTeaser() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="relative bg-mist py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              en="DEMO LAB"
              title={
                <span id="demo-title">
                  つくれるものを、
                  <br />
                  触って確かめる。
                </span>
              }
            />
          </div>
          <p data-reveal style={revealDelay(120)} className="text-[15px] leading-[2.05] text-muted lg:col-span-5">
            「こういうものが作れます」ではなく、「こちらが実際に動くデモです」。
            jyugoが開発したデモアプリケーションを、ブラウザでそのまま体験いただけます。
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demos.map((d, i) => (
            <li key={d.id} data-reveal style={revealDelay(i * 90)}>
              <Link
                href={`/demo-lab/#${d.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(23,48,103,0.5)]"
              >
                <div className="relative h-36 overflow-hidden bg-navy-900 text-white">
                  <div aria-hidden className="bg-grid-dark absolute inset-0" />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 top-9 transition-transform duration-500 group-hover:scale-105">
                    <Preview id={d.id} />
                  </div>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.15em] text-aqua-300 backdrop-blur">
                    <FlaskConical aria-hidden className="size-3" /> DEMO 0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-extrabold leading-snug text-navy-900">{d.name}</h3>
                  <p className="mt-1 text-sm font-bold text-electric-600">{d.ja}</p>
                  <p className="mt-3 text-[13px] leading-[1.85] text-muted">{d.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-navy-900 group-hover:text-electric-600">
                    デモを開く
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12 flex justify-center">
          <ButtonLink href="/demo-lab/" variant="outline-dark" size="lg">
            DEMO LAB をすべて見る
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
