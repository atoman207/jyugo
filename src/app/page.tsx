import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Vision } from "@/components/home/Vision";
import { Service } from "@/components/home/Service";
import { Challenges } from "@/components/home/Challenges";
import { AiDevelopment } from "@/components/home/AiDevelopment";
import { DemoLabTeaser } from "@/components/home/DemoLabTeaser";
import { Works } from "@/components/home/Works";
import { Team } from "@/components/home/Team";
import { CeoStory } from "@/components/home/CeoStory";
import { RecruitTeaser } from "@/components/home/RecruitTeaser";
import { Company } from "@/components/home/Company";
import { Contact } from "@/components/home/Contact";
import { company } from "@/lib/site";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  // openGraph はレイアウトの値を丸ごと置き換えるため、すべての項目を指定する
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: company.name,
    title: "jyugo合同会社｜企業の未来を、技術と人の力で実装する。",
    description:
      "jyugo合同会社（ジュゴー）は横浜のITベンチャーです。AIシステム開発・業務/Webシステム開発・SES・DX支援・コンサルティングを、事業課題の整理から開発・運用まで一気通貫で提供します。",
    url: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: [company.nameEn, "ジュゴー"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  email: company.email,
  slogan: company.tagline,
  foundingDate: company.foundedIso,
  founder: { "@type": "Person", name: company.representative },
  address: {
    "@type": "PostalAddress",
    postalCode: "220-0004",
    addressRegion: "神奈川県",
    addressLocality: "横浜市西区",
    streetAddress: "北幸1-11-5 相鉄KSビル 6F＆9F",
    addressCountry: "JP",
  },
  knowsAbout: ["AIシステム開発", "コンサルティング", "SES", "受託開発", "DX支援"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Vision />
      <Service />
      <Challenges />
      <AiDevelopment />
      <DemoLabTeaser />
      <Works />
      <Team />
      <CeoStory />
      <RecruitTeaser />
      <Company />
      <Contact />
    </>
  );
}
