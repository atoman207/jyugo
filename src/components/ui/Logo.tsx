/** jyugo ワードマーク。旧サイトのロゴ (小文字の jyugo) を踏襲し、アクセントの点を加えたもの */
export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={[
        "inline-flex items-baseline font-display text-[1.7rem] font-extrabold leading-none tracking-[-0.03em]",
        tone === "light" ? "text-white" : "text-navy-900",
        className,
      ].join(" ")}
    >
      jyugo
      <span aria-hidden className="ml-0.5 inline-block size-[0.34em] rounded-full bg-linear-to-br from-aqua-400 to-iris-500" />
    </span>
  );
}
