# jyugo合同会社 コーポレートサイト（Next.js）

旧サイト（http://www.jyugo-eternal.com/）の本文・画像・会社紹介資料をもとに、Next.js で再構築したコーポレートサイトです。
「世界の平和を考えるITベンチャー」という思想を残しつつ、企業のご担当者が数秒で「何の会社か・何を依頼できるか・本当に開発できるか」を理解できる構成にしています。

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | TOP（ファーストビュー → ABOUT → VISION → SERVICE → 課題 → AI DEVELOPMENT → DEMO LAB → WORKS → TEAM → CEO STORY → RECRUIT → COMPANY → CONTACT） |
| `/demo-lab/` | 実際に操作できるデモ 4 種（AI Knowledge Assistant / AI Matching System / CRM Dashboard / Reservation System） |
| `/recruit/` | 採用情報（JOIN jyugo・英語の「WORK IN JAPAN WITH jyugo」を含む） |
| `404.html` | ページが見つからない場合の案内 |

企業向け導線は `SERVICE → WORKS → DEMO LAB → CONTACT`、採用向け導線は `ABOUT → TEAM → RECRUIT → ENTRY（Indeed）` です。

## 開発・ビルド

Node.js 20 以上（動作確認は Node.js 24）。

```bash
npm install
npm run dev        # 開発サーバー http://localhost:3000
npm run build      # 静的サイトを out/ に書き出し
npm start          # out/ をローカルで確認 http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # TypeScript の型チェック
npm run images     # assets-src/ の元画像から Web 用画像・アイコンを再生成
```

## 公開方法

### GitHub + Vercel

```bash
git add -A
git commit -m "jyugo コーポレートサイト"
git branch -M main
git remote add origin https://github.com/<アカウント>/<リポジトリ>.git
git push -u origin main
```

1. Vercel の「Add New… → Project」で GitHub リポジトリを Import します。
2. 設定は**すべて既定値のまま** Deploy してください。Framework Preset（Next.js）とビルドコマンドは `vercel.json` で固定しています。
   - 「Output Directory」を `out` などに変更しないでください（Next.js の設定から自動で判断されます）。
3. 環境変数は不要です。canonical・OGP・sitemap.xml の URL には Vercel の本番ドメイン（`VERCEL_PROJECT_PRODUCTION_URL`）が自動で使われます。
   - 独自ドメイン（例: `www.jyugo-eternal.com`）を Vercel に設定した場合は、環境変数 `NEXT_PUBLIC_SITE_URL` に `https://www.jyugo-eternal.com` を設定して再デプロイしてください。

### レンタルサーバー（静的ホスティング）

`npm run build` で `out/` フォルダに完成した静的サイト（HTML/CSS/JS/画像）が出力されます。
**`out/` の中身をそのままサーバーの公開ディレクトリへアップロード**してください。

- `out/.htaccess` に 404 ページの設定を含めています（Apache 系サーバー用。Vercel では使われません）。
- 公開 URL は環境変数 `NEXT_PUBLIC_SITE_URL` で指定できます（未指定時は `http://www.jyugo-eternal.com`）。
- 現在のドメインは HTTPS の証明書がドメイン名と一致していないため、既定値を `http://` にしています。SSL 設定後は `https://` を指定することをおすすめします。

### Windows でビルドする場合の補足

Next.js 16 の静的書き出しには、Windows 上でビルドすると下層ページのプリフェッチ用ファイルが誤ったフォルダ構成で出力される不具合があります（ブラウザのコンソールに 404 が出る）。
`npm run build` では `scripts/fix-export-segments.mjs` が自動で修正します。`next build` を直接実行した場合は、続けて `node scripts/fix-export-segments.mjs` を実行してください。

## お問い合わせフォームについて

静的サイトのためサーバー送信は行わず、入力内容を反映したメールを閲覧者のメールソフトで作成する方式です（旧サイトの「SEND MAIL」と同じ `mailto` 方式、宛先は ichijomika@gmail.com）。
フォームから直接送信したい場合は、Formspree などのフォーム送信サービスやサーバー側の送信処理の追加が必要です。

## 画像について

| 画像 | 出典 |
| --- | --- |
| ジュゴンのシーグラスアート、空・緑の写真（4 枚）、飛行機雲の写真、会社紹介スライド（5 枚） | 旧サイト jyugo-eternal.com |
| エンジニアの写真（`engineer.jpg`） | [ぱくたそ](https://www.pakutaso.com/)「明るいオフィスでコーディング中のエンジニア男性」 |
| 海の写真 2 点（`sea-horizon.jpg` / `sea-clouds.jpg`）、青い光の背景（`blue-bokeh.jpg`） | [BEIZ images](https://www.beiz.jp/)「空と海の蒼いグラデーションの背景」「海と水平線の上の大きな雲の風景」「僅かに煌めく青い光の画像」 |

いずれも商用利用可・クレジット表記不要のフリー素材です（各サイトの利用規約に従ってご利用ください）。
元画像は `assets-src/`、Web 用に最適化した画像は `src/assets/images/` にあります。
紹介動画は MiTok 掲載の YouTube 動画（クリック時に読み込み）です。

## 公開前にご確認いただきたい内容

以下は旧サイトに記載がなく、提案書やデモ用に作成した内容です。事実と異なる点がないか、代表にご確認ください。

- **CEO STORY**：代表メッセージ本文とキャリアの軌跡（提案書の経歴をもとに作成した原稿）
- **WORKS**：注目事例「Membership / Payment Platform」と経験領域（金融・物流・AI・EC・SaaS・業務システム・Webシステム）の説明文
- **TEAM / RECRUIT**：エンジニアの国籍（日本・インド）、住宅・日本語学習・ビザ支援の内容、キャリアパス、選考の流れ
- **DEMO LAB**：すべて架空のサンプルデータで動作するデモです（企業名・人物名・金額はすべて架空）
- 旧サイトの英文は原文を尊重し、明らかな綴りの誤り（aproach → approach、beautifull → beautiful）のみ修正しています

## 主な技術

Next.js 16（App Router・静的書き出し）/ React 19 / TypeScript / Tailwind CSS v4 / lucide-react / next/font（Manrope・Noto Sans JP）
