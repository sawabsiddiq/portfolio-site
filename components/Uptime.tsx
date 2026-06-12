"use client";

import { useEffect, useState } from "react";

function format(ms: number) {
  const s = Math.max(Math.floor(ms / 1000), 0);
  const d = Math.floor(s / 86400);
  const h = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${d}d ${h}:${m}:${sec}`;
}

/** Time since the last deploy, ticking — the site reporting its own uptime. */
export function Uptime({ since }: { since: number }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(Date.now()));
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setNow(Date.now());
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);
  return (
    <span suppressHydrationWarning className="tabular-nums">
      {now === null ? "—" : format(now - since)}
    </span>
  );
}
