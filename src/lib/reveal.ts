import type { CSSProperties } from "react";

/** [data-reveal] 要素のフェードイン開始を遅らせる style */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
