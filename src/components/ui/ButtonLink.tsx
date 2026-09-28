import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[0_10px_30px_-10px_rgba(47,107,255,0.7)] hover:shadow-[0_16px_40px_-12px_rgba(124,92,255,0.8)] hover:-translate-y-0.5",
  light: "bg-white text-navy-900 hover:bg-electric-50 hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(4,10,28,0.5)]",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/10",
  "outline-dark": "border border-navy-900/15 text-navy-900 hover:border-electric-500 hover:text-electric-600 bg-white",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", external }: Props) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  const Icon = isExternal && !href.startsWith("mailto:") ? ArrowUpRight : ArrowRight;
  const cls = [
    "group inline-flex items-center justify-center gap-3 rounded-full font-bold tracking-wide transition-all duration-300",
    size === "lg" ? "px-7 py-4 text-[15px]" : "px-6 py-3 text-sm",
    variants[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <Icon aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
