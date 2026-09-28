// 元画像 (assets-src/) から Web 用に最適化した画像・アイコンを生成するスクリプト。
// 実行: npm run images
// static export では next/image の実行時最適化が使えないため、ここで事前にリサイズ・圧縮する。
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => path.join(root, "assets-src", p);
const out = (p) => path.join(root, "src", "assets", "images", p);
const app = (p) => path.join(root, "src", "app", p);

const jpeg = { quality: 80, mozjpeg: true, progressive: true };

/** @type {{ in: string; out: string; rotate?: boolean; width?: number; height?: number; extract?: sharp.Region; quality?: number }[]} */
const jobs = [
  // --- 旧サイト (jyugo-eternal.com) の画像 ---
  { in: "original/jyugon_grass.jpg", out: "dugong-seaglass.jpg", quality: 86 },
  // yoake.jpg は EXIF の回転情報が誤っているため、回転させずに画素の向きのまま使う
  { in: "original/yoake.jpg", out: "photo-dawn.jpg", width: 1200 },
  { in: "original/sutenndsky.jpg", out: "photo-sky.jpg", rotate: true, width: 1600 },
  { in: "original/greenmozik.jpg", out: "photo-green.jpg", rotate: true, width: 1200, quality: 70 },
  { in: "original/hikoukigumo.jpg", out: "photo-contrail.jpg", rotate: true, width: 1600 },
  ...[1, 2, 3, 4, 5].map((n) => ({
    in: `original/company_${n}.jpg`,
    out: `company-slide-${n}.jpg`,
    quality: 88,
  })),
  // --- ぱくたそ (www.pakutaso.com) ---
  { in: "stock/pakutaso_ADIMGL6708.jpg", out: "engineer.jpg", quality: 86 },
  // --- BEIZ images (www.beiz.jp) : 縦長の原本から横長に切り出す ---
  {
    in: "stock/beiz_sea-ocean_00013.jpg",
    out: "sea-horizon.jpg",
    extract: { left: 0, top: 834, width: 2048, height: 1152 },
    width: 1920,
  },
  {
    in: "stock/beiz_sea-ocean_00001.jpg",
    out: "sea-clouds.jpg",
    extract: { left: 0, top: 700, width: 2048, height: 1152 },
    width: 1920,
  },
  { in: "stock/beiz_light_00034.jpg", out: "blue-bokeh.jpg", width: 1920, quality: 72 },
];

// ブランドアイコン (「j」を幾何学的に描いたマーク。フォントに依存しないようパスで描画)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1B45"/>
      <stop offset="1" stop-color="#050B1F"/>
    </linearGradient>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#38D5FF"/>
      <stop offset="1" stop-color="#7C5CFF"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <circle cx="39" cy="13.5" r="5.5" fill="url(#a)"/>
  <path d="M39 25v17a10 10 0 0 1-10 10h-6" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
</svg>
`;

// PNG を埋め込んだ .ico を組み立てる (Vista 以降の全ブラウザが対応)
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

await mkdir(out(""), { recursive: true });

for (const job of jobs) {
  let img = sharp(src(job.in));
  if (job.rotate) img = img.rotate();
  if (job.extract) img = img.extract(job.extract);
  if (job.width || job.height) {
    img = img.resize({ width: job.width, height: job.height, fit: "inside", withoutEnlargement: true });
  }
  const info = await img.jpeg({ ...jpeg, quality: job.quality ?? jpeg.quality }).toFile(out(job.out));
  console.log(`${job.out.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

// OGP 画像: 旧サイトの会社紹介スライド 1 枚目 (ロゴ + タグライン) を 1200x630 に
await sharp(src("original/company_1.jpg"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ ...jpeg, quality: 88 })
  .toFile(app("opengraph-image.jpg"));
console.log("opengraph-image.jpg      1200x630");

await writeFile(app("icon.svg"), iconSvg);
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(app("apple-icon.png"));
const icoPngs = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await sharp(Buffer.from(iconSvg)).resize(size, size).png().toBuffer(),
  })),
);
await writeFile(app("favicon.ico"), buildIco(icoPngs));
console.log("icon.svg / apple-icon.png / favicon.ico");
