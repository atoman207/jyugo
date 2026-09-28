// サイト全体で共有する会社情報・ナビゲーション。
// 会社情報は旧サイト (jyugo-eternal.com) と会社紹介資料の記載内容に基づく。
// ※ 公開 URL は src/lib/site-url.ts (サーバー側専用)

export const company = {
  name: "jyugo合同会社",
  kana: "ジュゴー",
  nameEn: "jyugo LLC",
  tagline: "A group of people who approach for world peace",
  taglineJa: "世界平和のために科学する集団",
  business: ["AIシステム開発", "コンサルティングサービス", "SES", "受託開発"],
  representative: "一條 実加",
  founded: "2026年8月17日",
  foundedIso: "2026-08-17",
  fiscalMonth: "7月",
  postalCode: "〒220-0004",
  address: "神奈川県横浜市西区北幸1-11-5 相鉄KSビル 6F＆9F",
  email: "ichijomika@gmail.com",
  indeedUrl: "https://jp.indeed.com/m/viewjob?jk=c16179bc7e169569",
  youtubeId: "iiyDYZXmUTQ",
  mitokUrl: "https://mitok-ai.com/playpage/jyugo/",
} as const;

// Google マップ埋め込み (API キー不要)。pb の 1z は「神奈川県横浜市西区北幸1-11-5 相鉄KSビル」を base64 化した検索語
export const mapEmbedUrl =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1z56We5aWI5bed55yM5qiq5rWc5biC6KW_5Yy65YyX5bm4MS0xMS01IOebuOmJhEtT44OT44Or!6i16";

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "神奈川県横浜市西区北幸1-11-5 相鉄KSビル",
)}`;

export type NavItem = { label: string; href: string; ja: string };

export const navItems: NavItem[] = [
  { label: "ABOUT", href: "/#about", ja: "jyugoとは" },
  { label: "SERVICE", href: "/#service", ja: "サービス" },
  { label: "AI & DX", href: "/#ai", ja: "AI開発" },
  { label: "WORKS", href: "/#works", ja: "実績・経験" },
  { label: "DEMO LAB", href: "/demo-lab/", ja: "デモ" },
  { label: "TEAM", href: "/#team", ja: "チーム" },
  { label: "COMPANY", href: "/#company", ja: "会社概要" },
  { label: "RECRUIT", href: "/recruit/", ja: "採用情報" },
];

export const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "MERN",
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "React",
  "MongoDB",
  "AWS",
] as const;
