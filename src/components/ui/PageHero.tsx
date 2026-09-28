import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Props = {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: StaticImageData;
  children?: ReactNode;
};

/** 下層ページ共通のヒーロー (ヘッダーが白文字で重なるよう暗色背景) */
export function PageHero({ en, title, lead, image, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
      {image ? <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover opacity-35" /> : null}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950/70 via-navy-950/60 to-navy-950" />
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-electric-500/25 blur-[130px]" />
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 text-aqua-400">
          <span aria-hidden className="h-px w-8 bg-current" />
          {en}
        </p>
        <h1 className="mt-5 text-[2.1rem] font-bold leading-[1.4] tracking-[0.02em] sm:text-5xl lg:text-[3.4rem]">{title}</h1>
        {lead ? <div className="mt-7 max-w-2xl text-[15px] leading-[2.05] text-white/75 sm:text-base">{lead}</div> : null}
        {children}
      </div>
    </section>
  );
}
