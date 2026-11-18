"use client";
import { useEffect, useState } from "react";
import { invite } from "@/data/invite";

const parts = (ms: number) => ({
  Days: Math.floor(ms / 86400000),
  Hours: Math.floor(ms / 3600000) % 24,
  Minutes: Math.floor(ms / 60000) % 60,
  Seconds: Math.floor(ms / 1000) % 60,
});

/** Live countdown. `compact` is the size used inside the letter card. */
export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    const first = setTimeout(() => setNow(Date.now()), 0);
    return () => {
      clearInterval(t);
      clearTimeout(first);
    };
  }, []);

  if (!invite.date) {
    return <p className={`fd text-[var(--sea)] ${compact ? "text-xl" : "text-3xl md:text-5xl"}`}>{invite.dateLabel}</p>;
  }
  const left = now === null ? 0 : Math.max(0, new Date(invite.date).getTime() - now);
  return (
    <div className={`grid grid-cols-4 ${compact ? "gap-1 md:gap-3" : "gap-3 md:gap-8"}`} role="timer" aria-label="Time until the wedding">
      {Object.entries(parts(left)).map(([k, v]) => (
        <div key={k} className="text-center">
          <div className={`fd leading-none text-[var(--ink)] ${compact ? "text-4xl md:text-6xl" : "text-5xl md:text-8xl"}`}>{String(v).padStart(2, "0")}</div>
          <div className="mt-1.5 text-[11px] uppercase tracking-[.2em] text-[var(--sea)]">{k}</div>
        </div>
      ))}
    </div>
  );
}
