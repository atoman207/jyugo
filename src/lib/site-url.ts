// サイトの公開 URL (canonical / OGP / sitemap.xml に使用)。ビルド時にサーバー側でのみ参照する。
// 優先順位:
//   1. NEXT_PUBLIC_SITE_URL   … 独自ドメインを使う場合に指定 (例: https://www.jyugo-eternal.com)
//   2. VERCEL_PROJECT_PRODUCTION_URL … Vercel が自動で設定する本番ドメイン (例: jyugo.vercel.app)
//   3. 旧サイトのドメイン
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://www.jyugo-eternal.com";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");
