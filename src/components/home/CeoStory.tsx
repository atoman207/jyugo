import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Slideshow } from "@/components/ui/Slideshow";
import { company } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import photoContrail from "@/assets/images/photo-contrail.jpg";
import photoDawn from "@/assets/images/photo-dawn.jpg";
import photoSky from "@/assets/images/photo-sky.jpg";
import photoGreen from "@/assets/images/photo-green.jpg";

// 旧サイト「PHOTO & MESSAGE」「HOME」のスライドショー写真
const photos = [
  { src: photoContrail, alt: "青空にまっすぐ伸びる飛行機雲" },
  { src: photoDawn, alt: "うろこ雲の広がる夜明けの空と太陽" },
  { src: photoSky, alt: "電柱越しに見上げた、雲が流れる夕方の空" },
  { src: photoGreen, alt: "木漏れ日の差す、緑の草花" },
];

const career = [
  { en: "SE", ja: ["システム", "エンジニア"] },
  { en: "PARENTING", ja: ["子育て"] },
  { en: "BAKERY", ja: ["パン"] },
  { en: "MUSIC", ja: ["音楽"] },
  { en: "HR SALES", ja: ["人材営業", "（トップ", "セールス）"] },
  { en: "IT SALES", ja: ["IT営業"] },
  { en: "CONSULTING", ja: ["コンサルタント"] },
  { en: "PMO", ja: ["PMO"] },
  { en: "AI", ja: ["AI"] },
  { en: "FOUNDER", ja: ["jyugo", "合同会社", "設立"] },
];

export function CeoStory() {
  return (
    <section id="ceo" aria-labelledby="ceo-title" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Slideshow
                slides={photos}
                label="空と自然の写真"
                sizes="(min-width: 1024px) 460px, 100vw"
                className="aspect-[4/5] rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(11,21,48,0.6)]"
              />
              <p className="mt-6 font-display text-lg font-semibold italic leading-[1.7] text-navy-900">
                “Sky is forever &amp; beautiful.
                <br />A little step is connect to big start.”
              </p>
              <p className="mt-2 font-display text-[11px] font-bold tracking-[0.25em] text-muted">PHOTO &amp; MESSAGE</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              en="CEO STORY"
              title={
                <span id="ceo-title">
                  人と技術、
                  <br />
                  その両方を知る代表。
                </span>
              }
            />
            <div data-reveal style={revealDelay(100)} className="mt-8 space-y-6 text-[15px] leading-[2.15] text-ink/85 sm:text-base">
              <p>
                私のキャリアは、システムエンジニアから始まりました。その後、子育て、パンづくり、音楽、人材営業、IT営業、コンサルティング、PMO、そしてAIへ。
                一見まわり道に見えるその道のりで、私はいつも「人」と向き合い、テクノロジーが人の可能性を広げる瞬間を見てきました。
              </p>
              <p>
                だからこそjyugoは、エンジニアを単なる「リソース」として扱いません。
                一人ひとりの技術と想いを大切にし、お客様の事業の成長へ、そしてその先にある社会の平和へとつなげていく。
                それが、私たちの考える「世界平和のために科学する」ということです。
              </p>
              <p>空はいつまでも美しく、小さな一歩は、大きな始まりにつながっています。</p>
            </div>
            <p data-reveal className="mt-8 flex items-baseline gap-4">
              <span className="text-sm text-muted">{company.name} 代表</span>
              <span className="text-2xl font-bold tracking-[0.12em] text-navy-900">{company.representative}</span>
            </p>

            {/* キャリアの軌跡 */}
            <div className="mt-14 rounded-[1.75rem] bg-mist p-6 sm:p-8">
              <p data-reveal className="eyebrow text-electric-500">
                CAREER PATH
              </p>
              <ol className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-5">
                {career.map((c, i) => (
                  <li key={c.en} data-reveal style={revealDelay((i % 5) * 70)} className="relative">
                    <span
                      className={[
                        "grid size-9 place-items-center rounded-full font-display text-xs font-extrabold",
                        i === career.length - 1 ? "bg-brand-gradient text-white" : "bg-white text-electric-600 ring-1 ring-line",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-display text-[11px] font-extrabold tracking-[0.14em] text-navy-900">{c.en}</p>
                    <p className="mt-0.5 break-keep text-[12.5px] leading-[1.6] text-muted">
                      {c.ja.map((part, j) => (
                        <Fragment key={part}>
                          {j > 0 ? <wbr /> : null}
                          {part}
                        </Fragment>
                      ))}
                    </p>
                  </li>
                ))}
              </ol>
              <p data-reveal className="mt-8 border-t border-line pt-6 text-[15px] font-bold leading-[1.9] text-navy-900">
                「人と接すること」と「テクノロジー」。その両方を経験した代表だからこそ、
                <span className="text-gradient-deep">人を単なるリソースとして扱わない</span>SES・開発会社をつくります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
