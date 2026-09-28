// AI Knowledge Assistant デモ用のサンプル社内文書と簡易検索ロジック。
// 実案件では LLM + ベクトル検索 (RAG) で構築するところを、デモではブラウザ内で完結する
// 文字 bigram の TF-IDF 風スコアリングで再現している。

export type Section = { docId: string; docTitle: string; heading: string; body: string };

const documents: { id: string; title: string; sections: { heading: string; body: string }[] }[] = [
  {
    id: "expense",
    title: "経費精算規程",
    sections: [
      {
        heading: "第4条（締め日と支払日）",
        body: "経費精算は毎月25日締めとし、翌月10日に給与口座へ振り込む。25日を過ぎた申請は翌月締めで処理する。",
      },
      {
        heading: "第6条（領収書）",
        body: "精算には原則として領収書の原本またはスキャン画像を添付する。領収書が発行されない交通費は、経路と金額を申請書に記載する。",
      },
      {
        heading: "第8条（交通費・タクシー）",
        body: "業務上の移動にかかる交通費は実費を精算する。タクシーの利用は、終電後や重い荷物の運搬など、上長が認めた場合に限る。",
      },
    ],
  },
  {
    id: "work",
    title: "就業規則",
    sections: [
      {
        heading: "第12条（勤務時間）",
        body: "所定労働時間は1日8時間とし、始業は9時、終業は18時、休憩は12時から13時までの1時間とする。フレックスタイム制の適用者はコアタイムを11時から15時とする。",
      },
      {
        heading: "第20条（年次有給休暇）",
        body: "入社6ヶ月経過後に10日の年次有給休暇を付与する。取得する場合は、原則として3営業日前までに勤怠システムから申請する。",
      },
      {
        heading: "第22条（リモートワーク）",
        body: "リモートワークは週3日まで可能とする。実施日は前日までに上長へ連絡し、勤怠システムで勤務場所を登録する。",
      },
    ],
  },
  {
    id: "security",
    title: "情報セキュリティ規程",
    sections: [
      {
        heading: "第5条（パスワード）",
        body: "パスワードは12文字以上とし、英大文字・英小文字・数字・記号を組み合わせる。多要素認証が利用できるサービスでは必ず有効化する。",
      },
      {
        heading: "第9条（データの持ち出し）",
        body: "顧客情報を含むデータを社外へ持ち出す場合は、事前に情報システム部の承認を得て、暗号化された媒体を使用する。",
      },
      {
        heading: "第11条（紛失・インシデント報告）",
        body: "PCやスマートフォンの紛失、ウイルス感染の疑いなど、セキュリティ事故が発生した場合は、直ちに情報システム部へ報告する。",
      },
    ],
  },
];

export const sections: Section[] = documents.flatMap((d) =>
  d.sections.map((s) => ({ docId: d.id, docTitle: d.title, heading: s.heading, body: s.body })),
);

export const documentTitles = documents.map((d) => ({ id: d.id, title: d.title, count: d.sections.length }));

export const suggestions = [
  "経費精算の締め日はいつ？",
  "有給休暇は何日もらえる？",
  "リモートワークは週何日まで？",
  "パスワードのルールを教えて",
  "PCをなくしたらどうする？",
];

// 表記ゆれ・言い換え (実案件では埋め込みベクトルが吸収する部分)
const synonyms: [RegExp, string][] = [
  [/なくし|無くし|失くし|落とし/, "紛失"],
  [/休み|有休/, "休暇 有給"],
  [/在宅|テレワーク/, "リモートワーク"],
  [/給料/, "給与"],
  [/何時|始業|定時/, "勤務時間"],
  [/レシート/, "領収書"],
  [/持ち出|USB/, "持ち出し"],
];

function normalize(text: string) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s、。，．！？!?「」（）()・：:\-ー〜~]/g, (c) => (c === "ー" ? c : ""));
}

function bigrams(text: string) {
  const t = normalize(text);
  const out: string[] = [];
  for (let i = 0; i < t.length - 1; i++) out.push(t.slice(i, i + 2));
  return out;
}

const sectionGrams = sections.map((s) => new Set(bigrams(`${s.heading}${s.body}`)));
const docFreq = new Map<string, number>();
sectionGrams.forEach((set) => set.forEach((g) => docFreq.set(g, (docFreq.get(g) ?? 0) + 1)));

function expand(query: string) {
  let q = query;
  for (const [re, add] of synonyms) if (re.test(query)) q += ` ${add}`;
  return q;
}

export type Hit = { section: Section; score: number };

export function search(query: string): Hit[] {
  const grams = [...new Set(bigrams(expand(query)))];
  if (grams.length === 0) return [];
  const n = sections.length;
  const scored = sections.map((section, i) => {
    let score = 0;
    for (const g of grams) {
      if (sectionGrams[i].has(g)) score += Math.log(1 + n / (docFreq.get(g) ?? n));
    }
    return { section, score: score / Math.sqrt(grams.length) };
  });
  return scored.filter((h) => h.score > 0).sort((a, b) => b.score - a.score);
}

/** 最も関連する条文から、質問に近い文を抜き出して回答文をつくる */
export function answer(query: string): { text: string; hits: Hit[]; confident: boolean } {
  const hits = search(query).slice(0, 3);
  const top = hits[0];
  if (!top || top.score < 0.9) {
    return {
      text: "ご質問に該当する記述が、登録されている社内文書の中に見つかりませんでした。表現を変えてお試しいただくか、担当部署へお問い合わせください。",
      hits,
      confident: false,
    };
  }
  const qGrams = new Set(bigrams(expand(query)));
  const sentences = top.section.body.split("。").filter(Boolean);
  const ranked = sentences
    .map((s, i) => ({ s, i, score: bigrams(s).filter((g) => qGrams.has(g)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i);
  const picked = ranked
    .slice(0, 2)
    .filter((r, k) => k === 0 || r.score > 0)
    .sort((a, b) => a.i - b.i)
    .map((r) => `${r.s}。`)
    .join("");
  return { text: `「${top.section.docTitle}」${top.section.heading}によると、${picked}`, hits, confident: true };
}
