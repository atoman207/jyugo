import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import seaHorizon from "@/assets/images/sea-horizon.jpg";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <PageHero
      en="404 NOT FOUND"
      image={seaHorizon}
      title="お探しのページは見つかりませんでした。"
      lead={<p>ページが移動または削除された可能性があります。お手数ですが、トップページからお探しください。</p>}
    >
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <ButtonLink href="/" size="lg">
          トップページへ
        </ButtonLink>
        <ButtonLink href="/#contact" size="lg" variant="outline-light">
          お問い合わせ
        </ButtonLink>
      </div>
    </PageHero>
  );
}
