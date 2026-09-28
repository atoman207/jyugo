"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export type Slide = { src: StaticImageData; alt: string };

type Props = {
  slides: Slide[];
  /** 自動切り替えの間隔 (ms) */
  interval?: number;
  fit?: "cover" | "contain";
  className?: string;
  sizes: string;
  label: string;
  tone?: "light" | "dark";
};

/** 旧サイトのスライドショーを踏襲したクロスフェードのスライドショー */
export function Slideshow({ slides, interval = 4000, fit = "cover", className = "", sizes, label, tone = "dark" }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (!playing || hovered || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(id);
  }, [index, playing, hovered, count, interval]);

  const go = (i: number) => setIndex((i + count) % count);
  const btn =
    tone === "dark"
      ? "bg-navy-950/55 text-white hover:bg-navy-950/80"
      : "bg-white/90 text-navy-900 shadow hover:bg-white";

  return (
    <div
      className={["group relative overflow-hidden", className].join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.alt}
          aria-hidden={i !== index}
          className={[
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
            i === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes={sizes}
            className={fit === "cover" ? "object-cover" : "object-contain"}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 sm:p-4">
        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.alt}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1}枚目を表示`}
              aria-current={i === index}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
                tone === "light" ? "shadow" : "",
              ].join(" ")}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "自動再生を停止" : "自動再生を開始"} className={`grid size-8 place-items-center rounded-full backdrop-blur transition ${btn}`}>
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button type="button" onClick={() => go(index - 1)} aria-label="前へ" className={`grid size-8 place-items-center rounded-full backdrop-blur transition ${btn}`}>
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="次へ" className={`grid size-8 place-items-center rounded-full backdrop-blur transition ${btn}`}>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {count}枚中{index + 1}枚目：{slides[index]?.alt}
      </p>
    </div>
  );
}
