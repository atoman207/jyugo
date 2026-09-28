"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { CalendarCheck, CircleCheck, CreditCard, Store, Trash2 } from "lucide-react";

// 架空の美容室「SAMPLE SALON」の予約デモ
const menus = [
  { id: "cut", name: "カット", minutes: 60, price: 4400 },
  { id: "color", name: "カット＋カラー", minutes: 120, price: 9900 },
  { id: "spa", name: "ヘッドスパ", minutes: 45, price: 5500 },
] as const;
type MenuId = (typeof menus)[number]["id"];

const OPEN = 10;
const CLOSE = 19;
const HOURS = Array.from({ length: CLOSE - OPEN }, (_, i) => OPEN + i);
const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
const CLOSED_DAY = 2; // 火曜定休

type Reservation = {
  id: number;
  date: string;
  hour: number;
  menu: MenuId;
  name: string;
  contact: string;
  payment: "store" | "online";
};

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (k: string) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

// 「今日」と現在時刻はブラウザでのみ取得する (静的書き出し時の日付と食い違わないように)
const subscribe = () => () => {};
const getNow = () => {
  const d = new Date();
  return `${toKey(d)}|${d.getHours()}`;
};
const getServerNow = () => null;

/** 既存予約で埋まっている枠 (日付と時間から決まる疑似的なデータ) */
function isPrebooked(date: string, hour: number) {
  let h = 0;
  for (const c of `${date}-${hour}`) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 3 === 0;
}

export function ReservationSystem() {
  const uid = useId();
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const today = now ? now.split("|")[0] : null;
  const currentHour = now ? Number(now.split("|")[1]) : 0;
  const [menuId, setMenuId] = useState<MenuId>("cut");
  const [date, setDate] = useState<string | null>(null);
  const [hour, setHour] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [payment, setPayment] = useState<"store" | "online">("store");
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [done, setDone] = useState<Reservation | null>(null);
  const nextId = useRef(1);

  const menu = menus.find((m) => m.id === menuId) ?? menus[0];

  const days = useMemo(() => {
    if (!today) return [];
    const start = fromKey(today);
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      return { key: toKey(d), day: d.getDate(), month: d.getMonth() + 1, week: d.getDay() };
    });
  }, [today]);

  const selectedDate = date ?? days.find((d) => d.week !== CLOSED_DAY)?.key ?? null;

  const taken = (d: string, h: number) => {
    const mine = reservations.some((r) => {
      if (r.date !== d) return false;
      const m = menus.find((x) => x.id === r.menu);
      const end = r.hour + Math.ceil((m?.minutes ?? 60) / 60);
      return h >= r.hour && h < end;
    });
    return mine || isPrebooked(d, h);
  };

  const need = Math.ceil(menu.minutes / 60);
  const slots = selectedDate
    ? HOURS.map((h) => {
        const fits = h + need <= CLOSE;
        const free = fits && Array.from({ length: need }, (_, k) => h + k).every((x) => !taken(selectedDate, x));
        const past = selectedDate === today && h <= currentHour;
        return { hour: h, available: free && !past };
      })
    : [];

  const selectedHour = hour !== null && slots.find((s) => s.hour === hour)?.available ? hour : null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || selectedHour === null) return setError("日時を選択してください。");
    if (!name.trim()) return setError("お名前を入力してください。");
    if (!contact.trim()) return setError("メールアドレスまたは電話番号を入力してください。");
    const r: Reservation = {
      id: nextId.current++,
      date: selectedDate,
      hour: selectedHour,
      menu: menu.id,
      name: name.trim(),
      contact: contact.trim(),
      payment,
    };
    setReservations((list) => [...list, r].sort((a, b) => `${a.date}${pad(a.hour)}`.localeCompare(`${b.date}${pad(b.hour)}`)));
    setDone(r);
    setError(null);
    setHour(null);
    setName("");
    setContact("");
  };

  const label = (k: string) => {
    const d = fromKey(k);
    return `${d.getMonth() + 1}月${d.getDate()}日（${WEEK[d.getDay()]}）`;
  };

  if (!today) {
    return <div className="grid min-h-[420px] place-items-center text-sm text-muted">カレンダーを読み込んでいます…</div>;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_340px]">
      <form onSubmit={onSubmit} className="p-5 sm:p-6" noValidate>
        <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
          <Store aria-hidden className="size-4 text-electric-500" /> SAMPLE SALON（架空の店舗）
        </p>

        {/* 1. メニュー */}
        <fieldset className="mt-5">
          <legend className="text-[12px] font-bold text-muted">1. メニュー</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {menus.map((m) => (
              <label
                key={m.id}
                className={[
                  "cursor-pointer rounded-xl border p-3 transition has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-electric-500",
                  menuId === m.id ? "border-electric-500 bg-electric-50" : "border-line hover:border-electric-400",
                ].join(" ")}
              >
                <input type="radio" name="menu" className="sr-only" checked={menuId === m.id} onChange={() => setMenuId(m.id)} />
                <span className="block text-[13px] font-bold text-navy-900">{m.name}</span>
                <span className="mt-0.5 block text-[12px] text-muted">
                  {m.minutes}分・{yen(m.price)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2. 日付 */}
        <fieldset className="mt-5">
          <legend className="text-[12px] font-bold text-muted">2. 日付（火曜定休）</legend>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {days.map((d) => {
              const closed = d.week === CLOSED_DAY;
              const active = d.key === selectedDate;
              return (
                <button
                  key={d.key}
                  type="button"
                  disabled={closed}
                  aria-pressed={active}
                  aria-label={`${label(d.key)}${closed ? "（定休日）" : ""}`}
                  onClick={() => {
                    setDate(d.key);
                    setHour(null);
                  }}
                  className={[
                    "rounded-xl border py-2 text-center transition",
                    closed
                      ? "cursor-not-allowed border-transparent bg-mist text-muted/50"
                      : active
                        ? "border-electric-500 bg-electric-500 text-white"
                        : "border-line bg-white hover:border-electric-400",
                  ].join(" ")}
                >
                  <span className={["block text-[10px]", active ? "text-white/80" : d.week === 0 ? "text-rose-600" : d.week === 6 ? "text-electric-600" : "text-muted"].join(" ")}>
                    {WEEK[d.week]}
                  </span>
                  <span className="block font-display text-sm font-bold">
                    {d.day === 1 || d.key === days[0].key ? `${d.month}/${d.day}` : d.day}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 3. 時間 */}
        <fieldset className="mt-5">
          <legend className="text-[12px] font-bold text-muted">3. 開始時間 {selectedDate ? `— ${label(selectedDate)}` : ""}</legend>
          <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
            {slots.map((s) => (
              <button
                key={s.hour}
                type="button"
                disabled={!s.available}
                aria-pressed={selectedHour === s.hour}
                onClick={() => setHour(s.hour)}
                className={[
                  "rounded-lg border py-2 text-[13px] font-bold tabular-nums transition",
                  !s.available
                    ? "cursor-not-allowed border-transparent bg-mist text-muted/50 line-through"
                    : selectedHour === s.hour
                      ? "border-electric-500 bg-electric-500 text-white"
                      : "border-line bg-white text-navy-900 hover:border-electric-400",
                ].join(" ")}
              >
                {s.hour}:00
                <span className="sr-only">{s.available ? "" : "（予約不可）"}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* 4. お客様情報 */}
        <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-[12px] font-bold text-muted">4. お客様情報・お支払い</legend>
          <div>
            <label htmlFor={`${uid}-name`} className="text-[12px] font-bold text-navy-900">
              お名前
            </label>
            <input
              id={`${uid}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例）山田 花子"
              maxLength={40}
              className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-[14px] outline-none focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-contact`} className="text-[12px] font-bold text-navy-900">
              メールまたは電話番号
            </label>
            <input
              id={`${uid}-contact`}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="例）hanako@example.com"
              maxLength={60}
              className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-[14px] outline-none focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="radiogroup" aria-label="お支払い方法">
            {(
              [
                ["store", "店頭でお支払い"],
                ["online", "オンライン決済（デモ）"],
              ] as const
            ).map(([v, t]) => (
              <label
                key={v}
                className={[
                  "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-bold transition has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-electric-500",
                  payment === v ? "border-electric-500 bg-electric-50 text-electric-600" : "border-line text-muted",
                ].join(" ")}
              >
                <input type="radio" name="payment" className="sr-only" checked={payment === v} onChange={() => setPayment(v)} />
                {v === "online" ? <CreditCard aria-hidden className="size-3.5" /> : <Store aria-hidden className="size-3.5" />}
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="mt-4 text-[13px] font-bold text-rose-600">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist p-4">
          <p className="text-[13px] text-ink">
            {menu.name}（{menu.minutes}分）
            <span className="ml-2 font-display text-lg font-extrabold text-navy-900">{yen(menu.price)}</span>
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            <CalendarCheck aria-hidden className="size-4" /> 予約を確定する
          </button>
        </div>

        {done ? (
          <p role="status" className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[13px] leading-[1.8] text-emerald-900">
            <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
            {done.name} 様、{label(done.date)} {done.hour}:00〜 のご予約を受け付けました（デモのため実際の予約・送信は行われません）。
          </p>
        ) : null}
      </form>

      {/* 管理画面イメージ */}
      <aside className="border-t border-line bg-navy-900 p-5 text-white lg:border-l lg:border-t-0">
        <p className="text-[11px] font-bold tracking-[0.15em] text-aqua-300">ADMIN — 予約一覧</p>
        {reservations.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-white/20 p-5 text-[13px] leading-[1.8] text-white/60">
            予約を確定すると、店舗側の管理画面にここへ表示されます。
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {reservations.map((r) => {
              const m = menus.find((x) => x.id === r.menu);
              return (
                <li key={r.id} className="rounded-xl bg-white/[0.07] p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-bold">
                        {label(r.date)} {r.hour}:00
                      </p>
                      <p className="mt-0.5 text-[12px] text-white/70">
                        {m?.name}・{r.name} 様
                      </p>
                      <p className="text-[11px] text-white/50">{r.contact}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReservations((list) => list.filter((x) => x.id !== r.id))}
                      aria-label={`${r.name} 様の予約を取り消す`}
                      className="grid size-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <p
                    className={[
                      "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                      r.payment === "online" ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/70",
                    ].join(" ")}
                  >
                    {r.payment === "online" ? <CircleCheck aria-hidden className="size-3" /> : <Store aria-hidden className="size-3" />}
                    {r.payment === "online" ? `決済済み ${yen(m?.price ?? 0)}` : "店頭払い"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-5 text-[11.5px] leading-[1.8] text-white/45">
          ※ 実案件では、オンライン決済（Stripe等）・リマインドメール・顧客管理との連携まで構築できます。
        </p>
      </aside>
    </div>
  );
}
