import { Cpu, Globe2, Sprout } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { revealDelay } from "@/lib/reveal";

const values = [
  { en: "TECHNOLOGY", text: "AIからWeb・クラウドまで、領域を横断する技術力。", icon: Cpu },
  { en: "DIVERSITY", text: "日本・インドをはじめ、多様な国籍・文化・視点。", icon: Globe2 },
  { en: "GROWTH", text: "日本語学習やキャリア支援で、一人ひとりの成長を後押し。", icon: Sprout },
];

function ConnectionGlobe() {
  const nodes = [
    { x: 292, y: 148, label: "JAPAN", sub: "Yokohama HQ", main: true },
    { x: 168, y: 214, label: "INDIA", sub: "Engineers" },
    { x: 96, y: 128, label: "GLOBAL", sub: "and more" },
    { x: 236, y: 300, label: "REMOTE", sub: "Collaboration" },
  ];
  return (
    <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="日本とインドをはじめ、世界のエンジニアがつながるイメージ図">
      <defs>
        <radialGradient id="globe-fill" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#040a1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arc" x1="0" x2="1">
          <stop offset="0" stopColor="#38d5ff" />
          <stop offset="1" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#globe-fill)" stroke="rgba(255,255,255,0.18)" />
      {[150, 105, 55].map((rx) => (
        <ellipse key={rx} cx="200" cy="200" rx={rx} ry="170" fill="none" stroke="rgba(255,255,255,0.08)" />
      ))}
      {[-110, -55, 0, 55, 110].map((dy) => {
        const w = Math.sqrt(170 * 170 - dy * dy);
        return <ellipse key={dy} cx="200" cy={200 + dy} rx={w} ry={w * 0.12} fill="none" stroke="rgba(255,255,255,0.08)" />;
      })}
      <g fill="none" stroke="url(#arc)" strokeWidth="1.6" strokeLinecap="round">
        <path className="dash-flow" d="M168 214 Q 230 110 292 148" />
        <path className="dash-flow dash-slow" d="M96 128 Q 190 60 292 148" />
        <path className="dash-flow" d="M236 300 Q 300 240 292 148" />
        <path className="dash-flow dash-slow" d="M96 128 Q 110 190 168 214" />
        <path className="dash-flow" d="M168 214 Q 180 280 236 300" />
      </g>
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={n.main ? 14 : 10} fill={n.main ? "#2f6bff" : "#38d5ff"} opacity="0.25">
            <animate attributeName="r" values={n.main ? "12;20;12" : "8;14;8"} dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r={n.main ? 6 : 4.5} fill={n.main ? "#ffffff" : "#7de3ff"} />
          <text
            x={n.x + (n.x > 250 ? -12 : 12)}
            y={n.y - 14}
            textAnchor={n.x > 250 ? "end" : "start"}
            fill="#ffffff"
            fontSize="12"
            fontWeight="800"
            letterSpacing="2"
          >
            {n.label}
          </text>
          <text
            x={n.x + (n.x > 250 ? -12 : 12)}
            y={n.y + 2}
            textAnchor={n.x > 250 ? "end" : "start"}
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-40 top-20 -z-10 size-[36rem] rounded-full bg-iris-500/20 blur-[140px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            tone="dark"
            en="TEAM"
            title={
              <span id="team-title" className="font-display tracking-[0.01em]">
                ENGINEERS
                <br />
                WITHOUT BORDERS
              </span>
            }
          />
          <p data-reveal className="mt-6 text-xl font-bold leading-[1.7]">国籍を越えて、技術でつながるチーム。</p>
          <p data-reveal className="mt-5 text-[15px] leading-[2.05] text-white/70">
            jyugoには、コンピュータサイエンスの背景を持つフルスタックエンジニアが多数在籍しています。
            Python・TensorFlow・PyTorchなどのAI技術から、React・Node.jsなどのモダンな開発環境、AWSなどのクラウドインフラまでを横断的にカバー。
            日本・インドをはじめとする多様な国籍のエンジニアが、ひとつのチームとしてプロジェクトを推進します。
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.en} data-reveal style={revealDelay(i * 100)} className="glass rounded-2xl p-5">
                <v.icon aria-hidden className="size-5 text-aqua-400" />
                <p className="mt-4 font-display text-sm font-extrabold tracking-[0.14em]">{v.en}</p>
                <p className="mt-2 text-[12.5px] leading-[1.85] text-white/65">{v.text}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <ButtonLink href="/recruit/" variant="light">
              チームに参加する
            </ButtonLink>
          </div>
        </div>

        <div data-reveal style={revealDelay(150)} className="mx-auto w-full max-w-[520px] lg:col-span-6">
          <ConnectionGlobe />
        </div>
      </div>
    </section>
  );
}
