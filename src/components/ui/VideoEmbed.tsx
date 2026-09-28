"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = { youtubeId: string; title: string; poster: StaticImageData };

/** クリックするまで YouTube を読み込まない軽量な動画埋め込み */
export function VideoEmbed({ youtubeId, title, poster }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="aspect-video w-full rounded-2xl border-0 bg-black"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-navy-900 text-left"
      aria-label={`動画を再生：${title}`}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-electric-600 shadow-[0_10px_40px_-5px_rgba(4,10,28,0.6)] transition-transform duration-300 group-hover:scale-110"
      >
        <Play className="ml-1 size-6 fill-current" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-bold leading-[1.6] text-white sm:p-5">{title}</span>
    </button>
  );
}
