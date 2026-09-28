import type { ReactNode } from "react";
import { FlaskConical } from "lucide-react";

/** デモ画面を囲むアプリケーションウィンドウ風の枠 */
export function DemoFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[0_40px_80px_-50px_rgba(11,21,48,0.55)]">
      <div className="flex items-center justify-between gap-4 border-b border-line bg-mist px-4 py-3">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-display text-[12px] font-bold text-navy-900">{title}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold text-muted ring-1 ring-line">
          <FlaskConical aria-hidden className="size-3 text-electric-500" />
          サンプルデータで動作中
        </span>
      </div>
      {children}
    </div>
  );
}
