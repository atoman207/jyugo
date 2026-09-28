import type { ReactNode } from "react";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Slideshow } from "@/components/ui/Slideshow";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { company, mapEmbedUrl, mapLinkUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import slide1 from "@/assets/images/company-slide-1.jpg";
import slide2 from "@/assets/images/company-slide-2.jpg";
import slide3 from "@/assets/images/company-slide-3.jpg";
import slide4 from "@/assets/images/company-slide-4.jpg";
import slide5 from "@/assets/images/company-slide-5.jpg";

// 旧サイト「COMPANY」ページの会社紹介スライド
const slides = [
  { src: slide1, alt: "jyugo — A group of people who science for world peace" },
  { src: slide2, alt: "1. 会社概要" },
  { src: slide3, alt: "2. 事業概要：AIシステム開発" },
  { src: slide4, alt: "3. 事業概要：コンサルティングサービス・SES" },
  { src: slide5, alt: "4. 事業概要：受託開発" },
];

const videoTitle = "【AI×基幹システム。理想のビジョンを確実な社会実装へ！jyugo合同会社】";

export function Company() {
  const rows: { th: string; td: ReactNode }[] = [
    {
      th: "会社名",
      td: (
        <>
          {company.name}（{company.kana}）
          <span className="mt-0.5 block font-display text-xs text-muted">{company.nameEn}</span>
        </>
      ),
    },
    { th: "代表", td: company.representative },
    { th: "設立", td: company.founded },
    { th: "決算期", td: company.fiscalMonth },
    { th: "事業内容", td: company.business.join("・") },
    {
      th: "本社所在地",
      td: (
        <>
          {company.postalCode}
          <br />
          {company.address}
        </>
      ),
    },
    {
      th: "E-mail",
      td: (
        <a href={`mailto:${company.email}`} className="text-electric-600 underline-offset-4 hover:underline">
          {company.email}
        </a>
      ),
    },
  ];

  return (
    <section id="company" aria-labelledby="company-title" className="relative bg-mist py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading en="COMPANY" title={<span id="company-title">会社概要</span>} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="lg:col-span-6">
            <dl className="spec-table overflow-hidden rounded-[1.5rem] border border-line bg-white">
              {rows.map((r) => (
                <div key={r.th} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:px-7 sm:py-5">
                  <dt className="text-[13px] font-bold text-navy-900">{r.th}</dt>
                  <dd className="text-[14px] leading-[1.85] text-ink/85">{r.td}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal style={revealDelay(120)} className="lg:col-span-6">
            <p className="eyebrow mb-4 text-electric-500">COMPANY PROFILE</p>
            <Slideshow
              slides={slides}
              label="会社紹介資料"
              interval={4000}
              fit="contain"
              tone="light"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-video rounded-[1.25rem] bg-[#50b3c8] shadow-[0_30px_60px_-35px_rgba(11,21,48,0.6)]"
            />
            <p className="mt-3 text-xs text-muted">会社紹介資料（全5枚）</p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="rounded-[1.5rem] border border-line bg-white p-4 sm:p-6">
            <p className="eyebrow mb-4 px-1 text-electric-500">MOVIE</p>
            <VideoEmbed youtubeId={company.youtubeId} title={videoTitle} poster={slide1} />
            <p className="mt-4 px-1 text-[13px] leading-[1.9] text-muted">
              動画比較サイト「MiTok」にて、jyugoの包括的ソリューションと企業ビジョンが紹介されています。
              <a
                href={company.mitokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1 font-bold text-electric-600 hover:underline"
              >
                掲載ページ <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </p>
          </div>

          <div data-reveal style={revealDelay(120)} className="flex flex-col rounded-[1.5rem] border border-line bg-white p-4 sm:p-6">
            <p className="eyebrow mb-4 px-1 text-electric-500">ACCESS</p>
            <iframe
              src={mapEmbedUrl}
              title="jyugo合同会社 本社所在地の地図"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-video w-full flex-1 rounded-2xl border-0 bg-mist"
            />
            <ul className="mt-4 space-y-2 px-1 text-[13.5px] text-ink/85">
              <li className="flex gap-2.5">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-electric-500" />
                <span>
                  {company.postalCode} {company.address}
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center gap-1 font-bold text-electric-600 hover:underline"
                  >
                    Google マップ <ExternalLink aria-hidden className="size-3.5" />
                  </a>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-electric-500" />
                <a href={`mailto:${company.email}`} className="hover:text-electric-600 hover:underline">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
