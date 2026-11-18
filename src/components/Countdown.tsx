"use client";
import { useEffect, useState } from "react";
import { invite } from "@/data/invite";

const parts = (ms: number) => ({
  Days: Math.floor(ms / 86400000),
  Hours: Math.floor(ms / 3600000) % 24,
  Minutes: Math.floor(ms / 60000) % 60,
  Seconds: Math.floor(ms / 1000) % 60,
});

/** Live countdown. `card` is the maroon-and-gold style used on the invitation letter. */
export default function Countdown({ card = false }: { card?: boolean }) {
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
    return <p className="fd text-3xl text-[var(--sea)] md:text-5xl">{invite.dateLabel}</p>;
  }
  const left = now === null ? 0 : Math.max(0, new Date(invite.date).getTime() - now);

  if (card) {
    return (
      <div className="grid grid-cols-4" role="timer" aria-label="Time until the wedding">
        {Object.entries(parts(left)).map(([k, v], i) => (
          <div key={k} className={`text-center ${i ? "border-l border-[#c9a54f]/45" : ""}`}>
            <div className="fd text-3xl leading-none text-[#7d1626] sm:text-4xl md:text-[3.4rem]">{String(v).padStart(2, "0")}</div>
            <div className="mt-1.5 inline-block rounded-full bg-[#eddcb8] px-2 py-0.5 text-[10px] uppercase tracking-[.1em] text-[#7a5a2a] sm:px-3 sm:text-[11px] sm:tracking-[.14em]">{k}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-8" role="timer" aria-label="Time until the wedding">
      {Object.entries(parts(left)).map(([k, v]) => (
        <div key={k} className="text-center">
          <div className="fd text-5xl leading-none text-[var(--ink)] md:text-8xl">{String(v).padStart(2, "0")}</div>
          <div className="mt-1.5 text-[11px] uppercase tracking-[.25em] text-[var(--sea)]">{k}</div>
        </div>
      ))}
    </div>
  );
}
