"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { company, navItems } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // ページ遷移したらメニューを閉じる
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        open
          ? "border-b border-white/10 bg-navy-950"
          : solid
            ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-20px_rgba(4,10,28,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        本文へスキップ
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label={`${company.name} トップページ`} className="shrink-0">
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <nav aria-label="メインメニュー" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "relative font-display text-[12.5px] font-bold tracking-[0.12em] transition-colors",
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100",
                    solid ? "text-navy-900 hover:text-electric-600" : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="group hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-display text-[12.5px] font-bold tracking-[0.12em] text-white shadow-[0_8px_24px_-10px_rgba(47,107,255,0.8)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            CONTACT
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            className={[
              "inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid ? "border-line text-navy-900" : "border-white/25 text-white",
            ].join(" ")}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-navy-950/98 backdrop-blur-xl lg:hidden"
      >
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
        <nav aria-label="モバイルメニュー" className="container-x relative py-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-white"
                >
                  <span className="font-display text-lg font-bold tracking-[0.1em]">{item.label}</span>
                  <span className="text-xs text-white/50">{item.ja}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-4 text-sm font-bold text-white"
            >
              開発について相談する <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link
              href="/recruit/"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-sm font-bold text-white"
            >
              エンジニアとして参加する <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <p className="mt-10 font-display text-xs tracking-[0.2em] text-white/40">{company.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
