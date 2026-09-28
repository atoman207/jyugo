import type { ReactNode } from "react";

type Props = {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/** 英字ラベル + 日本語見出し + リード文 */
export function SectionHeading({ en, title, lead, tone = "light", align = "left", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div
      data-reveal
      className={[align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className].join(" ")}
    >
      <p
        className={[
          "eyebrow flex items-center gap-3",
          align === "center" ? "justify-center" : "",
          dark ? "text-aqua-400" : "text-electric-500",
        ].join(" ")}
      >
        <span aria-hidden className="h-px w-8 bg-current" />
        {en}
      </p>
      <h2
        className={[
          "mt-5 text-[1.75rem] font-bold leading-[1.4] tracking-[0.02em] sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy-900",
        ].join(" ")}
      >
        {title}
      </h2>
      {lead ? (
        <p className={["mt-6 text-[15px] leading-[2] sm:text-base", dark ? "text-white/70" : "text-muted"].join(" ")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
