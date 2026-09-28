import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { company, navItems } from "@/lib/site";

const businessLinks = [
  { label: "AI & DX 開発", href: "/#ai" },
  { label: "システム開発", href: "/#service" },
  { label: "Web 開発", href: "/#service" },
  { label: "SES / エンジニア支援", href: "/#service" },
  { label: "コンサルティング", href: "/#consulting" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-electric-500/20 blur-[120px]"
      />
      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${company.name} トップページ`}>
              <Logo className="text-[2.2rem]" />
            </Link>
            <p className="mt-4 font-display text-sm font-semibold tracking-[0.08em] text-aqua-300">{company.tagline}</p>
            <p className="mt-6 text-sm leading-[2] text-white/65">
              {company.name}（{company.kana}）
              <br />
              事業概要：{company.business.join("・")}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-aqua-400" />
                <span>
                  {company.postalCode}
                  <br />
                  {company.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-aqua-400" />
                <a href={`mailto:${company.email}`} className="underline-offset-4 hover:underline">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-white/45">MENU</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link href="/" className="font-display text-sm font-semibold tracking-[0.08em] text-white/80 hover:text-white">
                    HOME
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-display text-sm font-semibold tracking-[0.08em] text-white/80 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/#contact"
                    className="font-display text-sm font-semibold tracking-[0.08em] text-white/80 hover:text-white"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/45">BUSINESS</p>
              <ul className="mt-5 space-y-3">
                {businessLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow text-white/45">JOIN US</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link href="/recruit/" className="text-sm text-white/80 hover:text-white">
                    採用情報
                  </Link>
                </li>
                <li>
                  <Link href="/recruit/#work-in-japan" className="text-sm text-white/80 hover:text-white">
                    Work in Japan (English)
                  </Link>
                </li>
                <li>
                  <a
                    href={company.indeedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    Indeed で応募する ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.nameEn}. All rights reserved.</p>
          <a href="#top" className="font-display tracking-[0.2em] hover:text-white">
            PAGE TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
