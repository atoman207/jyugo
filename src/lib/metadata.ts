import type { Metadata } from "next";
import { company } from "@/lib/site";

// ページで openGraph を指定するとルートの opengraph-image.jpg が引き継がれないため、明示的に指定する
const ogImage = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "jyugo — A group of people who science for world peace" };

/** 各ページ用のメタデータ (canonical / OGP の URL をページごとに設定する) */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: company.name,
      title: `${title}｜${company.name}`,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${company.name}`,
      description,
      images: [ogImage],
    },
  };
}
