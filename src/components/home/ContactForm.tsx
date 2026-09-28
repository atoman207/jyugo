"use client";

import { useId, useState, type FormEvent } from "react";
import { Check, Copy, Send } from "lucide-react";
import { company } from "@/lib/site";

const topics = ["開発のご相談", "SES・エンジニアのご相談", "採用・エントリー", "その他"] as const;
type Topic = (typeof topics)[number];

type Fields = { company: string; name: string; email: string; tel: string; message: string };
const empty: Fields = { company: "", name: "", email: "", tel: "", message: "" };
const MAX_MESSAGE = 1500;

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = "お名前を入力してください。";
  if (!f.email.trim()) errors.email = "メールアドレスを入力してください。";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "メールアドレスの形式をご確認ください。";
  if (f.tel && !/^[0-9+\-() ]{6,20}$/.test(f.tel.trim())) errors.tel = "電話番号は半角数字とハイフンで入力してください。";
  if (!f.message.trim()) errors.message = "お問い合わせ内容を入力してください。";
  else if (f.message.length > MAX_MESSAGE) errors.message = `${MAX_MESSAGE}文字以内で入力してください。`;
  return errors;
}

function composeBody(topic: Topic, f: Fields) {
  return [
    `【お問い合わせ種別】${topic}`,
    `【会社名】${f.company || "—"}`,
    `【お名前】${f.name}`,
    `【メールアドレス】${f.email}`,
    `【電話番号】${f.tel || "—"}`,
    "",
    "【お問い合わせ内容】",
    f.message,
  ].join("\n");
}

/**
 * お問い合わせフォーム。
 * 静的サイトのためサーバー送信は行わず、入力内容を反映したメールを利用者のメールソフトで作成する
 * (旧サイトの「SEND MAIL」と同じ mailto 方式)。
 */
export function ContactForm() {
  const uid = useId();
  const [topic, setTopic] = useState<Topic>("開発のご相談");
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const subject = `【${topic}】${fields.company ? `${fields.company} ` : ""}${fields.name}様より`;
    const href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeBody(topic, fields))}`;
    setSent(true);
    window.location.href = href;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(composeBody(topic, fields));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const input =
    "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15";
  const field = (key: keyof Fields) => ({
    id: `${uid}-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
    className: `${input} ${errors[key] ? "border-rose-400" : "border-line"}`,
  });
  const error = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
        {errors[key]}
      </p>
    ) : null;
  const label = (key: keyof Fields, text: string, required?: boolean) => (
    <label htmlFor={`${uid}-${key}`} className="flex items-center gap-2 text-[13px] font-bold text-navy-900">
      {text}
      {required ? (
        <span className="rounded bg-electric-500 px-1.5 py-0.5 text-[10px] leading-none text-white">必須</span>
      ) : (
        <span className="rounded bg-mist px-1.5 py-0.5 text-[10px] leading-none text-muted">任意</span>
      )}
    </label>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-9">
      <fieldset>
        <legend className="text-[13px] font-bold text-navy-900">お問い合わせ種別</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {topics.map((t) => (
            <label
              key={t}
              className={[
                "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-[12.5px] font-bold transition has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-electric-500 has-[input:focus-visible]:ring-offset-2",
                topic === t ? "border-electric-500 bg-electric-50 text-electric-600" : "border-line text-muted hover:border-electric-400",
              ].join(" ")}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          {label("company", "会社名")}
          <input type="text" autoComplete="organization" placeholder="例）株式会社〇〇" {...field("company")} />
          {error("company")}
        </div>
        <div>
          {label("name", "お名前", true)}
          <input type="text" autoComplete="name" placeholder="例）山田 太郎" {...field("name")} />
          {error("name")}
        </div>
        <div>
          {label("email", "メールアドレス", true)}
          <input type="email" autoComplete="email" inputMode="email" placeholder="例）info@example.com" {...field("email")} />
          {error("email")}
        </div>
        <div>
          {label("tel", "電話番号")}
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="例）045-000-0000" {...field("tel")} />
          {error("tel")}
        </div>
      </div>
      <div className="mt-5">
        {label("message", "お問い合わせ内容", true)}
        <textarea
          rows={6}
          maxLength={MAX_MESSAGE}
          placeholder="ご相談内容・ご希望のスケジュール・ご予算感など、わかる範囲でご記入ください。"
          {...field("message")}
        />
        <div className="flex justify-between">
          {error("message") ?? <span />}
          <span className="mt-1.5 text-xs text-muted">
            {fields.message.length} / {MAX_MESSAGE}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-gradient px-7 py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(47,107,255,0.7)] transition hover:-translate-y-0.5"
      >
        <Send aria-hidden className="size-4" />
        メールを作成して送信する
      </button>
      <p className="mt-3 text-center text-xs leading-[1.8] text-muted">
        ボタンを押すと、入力内容が反映されたメールがお使いのメールソフトで開きます。
      </p>

      {sent ? (
        <div role="status" className="mt-5 rounded-xl border border-electric-100 bg-electric-50 p-4 text-[13px] leading-[1.8] text-navy-900">
          メールソフトが起動しない場合は、内容をコピーして
          <a href={`mailto:${company.email}`} className="mx-1 font-bold text-electric-600 underline">
            {company.email}
          </a>
          までお送りください。
          <button
            type="button"
            onClick={copy}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-electric-500 bg-white px-4 py-2 text-xs font-bold text-electric-600 hover:bg-electric-50"
          >
            {copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
            {copied ? "コピーしました" : "入力内容をコピー"}
          </button>
        </div>
      ) : null}
    </form>
  );
}
