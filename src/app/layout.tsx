import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { company } from "@/lib/site";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// 日本語フォントは容量が大きいため preload せず、unicode-range で必要な分だけ読み込む
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description =
  "jyugo合同会社（ジュゴー）は横浜のITベンチャーです。AIシステム開発・業務/Webシステム開発・SES・DX支援・コンサルティングを、事業課題の整理から開発・運用まで一気通貫で提供します。A group of people who approach for world peace.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "jyugo合同会社｜AIシステム開発・SES・コンサルティング（横浜）",
    template: "%s｜jyugo合同会社",
  },
  description,
  keywords: ["jyugo", "ジュゴー", "AIシステム開発", "SES", "コンサルティング", "受託開発", "DX支援", "横浜", "生成AI", "RAG"],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: company.name,
    title: "jyugo合同会社｜企業の未来を、技術と人の力で実装する。",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "jyugo合同会社｜企業の未来を、技術と人の力で実装する。",
    description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#040a1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${manrope.variable} ${notoSansJp.variable}`} suppressHydrationWarning>
      <head>
        {/* JS が有効な場合のみスクロールアニメーションを有効化 (無効でも内容は表示される) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-white antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
