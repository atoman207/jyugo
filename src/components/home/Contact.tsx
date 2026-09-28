import Link from "next/link";
import { ArrowRight, Building2, Mail, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/home/ContactForm";
import { company } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 size-[36rem] rounded-full bg-electric-500/25 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 top-0 -z-10 size-[30rem] rounded-full bg-iris-500/20 blur-[140px]" />

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            en="CONTACT"
            title={
              <span id="contact-title">
                まずは、課題を
                <br />
                お聞かせください。
              </span>
            }
            lead="AI・システム開発、SES、DX・コンサルティングのご相談は、お気軽にお問い合わせください。構想段階・要件が固まっていない段階でも歓迎です。"
          />

          <div className="mt-10 grid gap-3">
            <div data-reveal className="glass rounded-2xl p-5">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Building2 aria-hidden className="size-4 text-aqua-400" />
                企業のご担当者さま
              </p>
              <p className="mt-2 text-[13px] leading-[1.9] text-white/65">
                開発のご相談・お見積り・SESのご依頼は、右のフォームまたはメールでご連絡ください。
              </p>
            </div>
            <Link
              href="/recruit/"
              data-reveal
              style={revealDelay(80)}
              className="glass group block rounded-2xl p-5 transition hover:bg-white/15"
            >
              <p className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="flex items-center gap-2">
                  <UserRound aria-hidden className="size-4 text-aqua-400" />
                  エンジニア・求職者の方
                </span>
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
              <p className="mt-2 text-[13px] leading-[1.9] text-white/65">
                採用情報・エントリー方法は、採用ページをご覧ください。
              </p>
            </Link>
            <a
              href={`mailto:${company.email}`}
              data-reveal
              style={revealDelay(160)}
              className="mt-2 flex items-center gap-3 rounded-2xl border border-white/15 px-5 py-4 transition hover:border-white/40"
            >
              <Mail aria-hidden className="size-5 text-aqua-400" />
              <span>
                <span className="block text-[11px] font-bold tracking-[0.2em] text-white/50">E-MAIL</span>
                <span className="font-display text-base font-bold">{company.email}</span>
              </span>
            </a>
          </div>
        </div>

        <div data-reveal style={revealDelay(120)} className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
