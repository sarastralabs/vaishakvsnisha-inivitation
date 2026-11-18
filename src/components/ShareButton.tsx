"use client";
import { useState } from "react";

export default function ShareButton() {
  const [done, setDone] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };
  return (
    <button onClick={share} className="rounded-full border border-[var(--ink)]/25 px-6 py-3 text-sm font-semibold hover:bg-[var(--butter)]/50">
      {done ? "Link copied" : "Share this invitation"}
    </button>
  );
}
