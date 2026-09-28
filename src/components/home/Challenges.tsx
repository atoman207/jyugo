import { CornerDownRight, Database, FlaskConical, Lightbulb, RefreshCw, Sheet, UserPlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { revealDelay } from "@/lib/reveal";

const challenges = [
  {
    q: "Excel業務をシステム化したい",
    a: "業務フローを整理し、入力・集計・共有をひとつの業務システムにまとめます。",
    tag: "業務システム開発",
    icon: Sheet,
  },
  {
    q: "社内データをAIで活用したい",
    a: "社内の文書やデータを検索・回答できる、RAG／社内FAQ AIを構築します。",
    tag: "AI・RAG開発",
    icon: Database,
  },
  {
    q: "既存システムが古くなっている",
    a: "現行システムを分析し、リプレイスやクラウド移行を段階的に進めます。",
    tag: "リプレイス・クラウド移行",
    icon: RefreshCw,
  },
  {
    q: "開発エンジニアが足りない",
    a: "必要なスキルのエンジニアを、おひとりからチーム体制までご提案します。",
    tag: "SES・チーム提供",
    icon: UserPlus,
  },
  {
    q: "アイデアはあるが、どこから開発すればいいかわからない",
    a: "業務分析・要件定義から伴走し、構想を「実装できる計画」に落とし込みます。",
    tag: "コンサルティング・要件定義",
    icon: Lightbulb,
  },
  {
    q: "まず低コストでPoCを作りたい",
    a: "小さく作って素早く検証。効果を確かめてから本開発へ進められます。",
    tag: "PoC開発",
    icon: FlaskConical,
  },
];

export function Challenges() {
  return (
    <section id="challenges" aria-labelledby="challenges-title" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          en="CHALLENGES"
          title={<span id="challenges-title">こんな課題、ありませんか？</span>}
          lead="技術の名前ではなく、まずは「困っていること」から。jyugoは課題を起点に、最適な解決策をご提案します。"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c, i) => (
            <li
              key={c.q}
              data-reveal
              style={revealDelay((i % 3) * 100)}
              className="group flex flex-col rounded-[1.5rem] border border-line bg-white p-7 transition duration-300 hover:border-electric-500/40 hover:shadow-[0_24px_50px_-28px_rgba(47,107,255,0.5)]"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-electric-50 text-electric-600">
                  <c.icon aria-hidden className="size-5" />
                </span>
                <p className="pt-1.5 text-[17px] font-bold leading-[1.65] text-navy-900">「{c.q}」</p>
              </div>
              <div className="mt-6 flex flex-1 gap-3 border-t border-dashed border-line pt-5">
                <CornerDownRight aria-hidden className="mt-1 size-4 shrink-0 text-iris-500" />
                <div>
                  <p className="text-[13.5px] leading-[1.95] text-muted">{c.a}</p>
                  <p className="mt-3 inline-block rounded-full bg-navy-900 px-3 py-1 text-[11.5px] font-bold text-white">
                    {c.tag}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="text-[15px] leading-[2] text-navy-900">
            課題がまだ言葉になっていなくても大丈夫です。
            <br className="hidden sm:block" />
            まずは、今の状況をお聞かせください。
          </p>
          <ButtonLink href="/#contact" size="lg">
            課題を相談する
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
