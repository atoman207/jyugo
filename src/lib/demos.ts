import { CalendarDays, LayoutDashboard, MessagesSquare, Network, type LucideIcon } from "lucide-react";

export type DemoId = "knowledge" | "matching" | "crm" | "reservation";

export type DemoMeta = {
  id: DemoId;
  name: string;
  ja: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

export const demos: DemoMeta[] = [
  {
    id: "knowledge",
    name: "AI Knowledge Assistant",
    ja: "社内文書をAIが検索・回答",
    description: "就業規則や経費規程などの社内文書から、質問に関連する箇所を検索し、根拠つきで回答します。",
    tags: ["RAG", "社内FAQ", "チャットUI"],
    icon: MessagesSquare,
  },
  {
    id: "matching",
    name: "AI Matching System",
    ja: "SES案件とエンジニアを自動マッチング",
    description: "案件の必須スキル・経験年数・日本語レベル・稼働時期から、最適なエンジニアをスコア順に提案します。",
    tags: ["マッチング", "スコアリング", "SES"],
    icon: Network,
  },
  {
    id: "crm",
    name: "CRM Dashboard",
    ja: "顧客・案件・売上の統合管理",
    description: "顧客・商談・売上をひとつの画面で可視化。ステージや担当者で絞り込み、状況をすばやく把握できます。",
    tags: ["ダッシュボード", "顧客管理", "可視化"],
    icon: LayoutDashboard,
  },
  {
    id: "reservation",
    name: "Reservation System",
    ja: "予約・顧客・決済管理",
    description: "メニュー・日時を選んで予約。空き枠の管理から予約内容の確認までを、シンプルな画面で行えます。",
    tags: ["予約管理", "カレンダー", "顧客管理"],
    icon: CalendarDays,
  },
];
