"use client";
import { useEffect, useState } from "react";

const links = [
  ["Our story", "story"],
  ["Celebrations", "events"],
  ["Venues", "maps"],
  ["Gallery", "gallery"],
  ["Dress code", "dress"],
  ["FAQ", "faq"],
];

/** White pill with monogram and a menu. Sits on the landing section and scrolls away with it, like the reference. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center justify-between rounded-full bg-white/95 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur">
        <a href="#top" className="fd inline-flex h-10 items-center px-1 text-2xl tracking-wide" aria-label="Back to top">
          V&amp;N
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full"
        >
          <span className={`h-px w-6 bg-[var(--ink)] transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-[var(--ink)] transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <div id="menu" className="mx-auto mt-2 max-w-5xl rounded-3xl bg-white/95 p-6 shadow-lg backdrop-blur">
          <ul className="grid gap-1 md:grid-cols-3">
            {links.map(([t, id]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="fd block rounded-xl px-3 py-2 text-3xl hover:bg-[var(--butter)]/50">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
