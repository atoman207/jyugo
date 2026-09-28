// Windows で next build (output: "export") を実行した際の不具合への対処。
//
// Next.js 16 は下層ページのプリフェッチ用ファイルを `recruit/__next.recruit.__PAGE__.txt` の名前で
// 書き出すべきところ、Windows ではパス区切りが「\」のため `recruit/__next.recruit/__PAGE__.txt` という
// フォルダ構成で出力してしまい、ブラウザからのプリフェッチが 404 になる。
// ここでは out/ 内の `__next.*` フォルダを探し、正しいファイル名に平坦化する。
// (macOS / Linux でビルドした場合は該当フォルダが存在しないため何もしない)
import { readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? filesUnder(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat();
}

let moved = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const rel = path.relative(full, file).split(path.sep).join(".");
        await rename(file, path.join(dir, `${entry.name}.${rel}`));
        moved++;
      }
      await rm(full, { recursive: true, force: true });
    } else {
      await walk(full);
    }
  }
}

let hasOut = true;
try {
  await stat(outDir);
} catch {
  hasOut = false;
}
if (!hasOut) {
  // ビルド自体は成功しているため、ここでは失敗扱いにしない
  console.warn("fix-export-segments: out/ が見つからないため処理をスキップしました");
} else {
  await walk(outDir);
  console.log(moved ? `fix-export-segments: ${moved} 件のプリフェッチ用ファイルを修正しました` : "fix-export-segments: 修正不要");
}
