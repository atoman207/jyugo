import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとして書き出し (out/)。現行サーバーのような静的ホスティングにそのまま設置できる
  output: "export",
  // /recruit → /recruit/index.html として出力し、Apache / nginx でもリライト設定なしで動作させる
  trailingSlash: true,
  images: {
    // static export では実行時の画像最適化が使えないため、scripts/prepare-images.mjs で事前に最適化済み
    unoptimized: true,
  },
};

export default nextConfig;
