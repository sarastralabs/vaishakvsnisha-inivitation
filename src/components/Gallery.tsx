"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { best, full, photos, small } from "@/data/invite";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[.35em] text-[var(--gold)]">{children}</p>
);

/** Final resting spots for the dealt photos on wide screens: centre x/y as % of the stage, tilt in degrees. */
const slots = [
  { x: 10, y: 38, r: -6 },
  { x: 26, y: 35, r: 4 },
  { x: 42, y: 38, r: -3 },
  { x: 58, y: 35, r: 5 },
  { x: 74, y: 38, r: -5 },
  { x: 90, y: 35, r: 4 },
  { x: 20, y: 72, r: 5 },
  { x: 40, y: 74, r: -4 },
  { x: 60, y: 72, r: 3 },
  { x: 80, y: 74, r: -6 },
];
const deal = best.slice(0, slots.length);


/**
 * Wide screens: the section pins and the photos are dealt onto the table one by one as you scroll.
 * Phones: photos slide in alternately from each side. Both open the same viewer.
 */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = stage.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".deal-card", el);
      const title = el.querySelector(".deal-title");
      const w = window.innerWidth;
      const h = window.innerHeight;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: `+=${cards.length * 36}%`, pin: true, scrub: 0.7, anticipatePin: 1 },
      });
      tl.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0);
      cards.forEach((c, i) => {
        const side = i % 3;
        const from = side === 0 ? { x: -w * 0.75, y: h * 0.25 } : side === 1 ? { x: 0, y: h * 0.95 } : { x: w * 0.75, y: h * 0.25 };
        tl.fromTo(
          c,
          { ...from, rotate: (side - 1) * 38 + (i % 2 ? 10 : -10), opacity: 0, scale: 1.2 },
          { x: 0, y: 0, rotate: slots[i].r, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          0.6 + i * 0.75,
        );
      });
      tl.to({}, { duration: 1 });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  useEffect(() => {
    if (open === null) return;
    strip.current?.querySelector<HTMLElement>(`[data-i="${open}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [open]);

  const heading = (
    <>
      <Eyebrow>Gallery</Eyebrow>
      <h2 id="g-h" className="fd mt-3 text-4xl uppercase tracking-wide md:text-6xl">
        Painted by the sea
      </h2>
    </>
  );

  return (
    <>
      {/* wide screens: pinned table, photos dealt one by one */}
      <div ref={stage} className="relative hidden h-[100svh] w-full overflow-hidden md:block" aria-labelledby="g-h">
        <div className="deal-title absolute inset-x-0 top-[6%] z-0 text-center">
          {heading}
          <p className="mx-auto mt-3 max-w-md text-[var(--ink)]/65">Scroll to deal the photos. Tap any one to see it large.</p>
        </div>
        {deal.map((id, i) => (
          <div
            key={id}
            className="deal-card absolute"
            style={{ left: `${slots[i].x}%`, top: `${slots[i].y}%`, width: "14vw", marginLeft: "-7vw", marginTop: "-9.4vw", zIndex: i + 1 }}
          >
            <button
              onClick={() => setOpen(photos.indexOf(id))}
              aria-label={`Open photo ${i + 1} of ${deal.length}`}
              className="group block w-full bg-white p-2 shadow-[0_16px_34px_rgba(50,35,20,.22)] transition-transform duration-500 hover:-translate-y-2 hover:scale-110"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={full(id)} alt={`Nisha and Vaishak, photo ${i + 1}`} fill sizes="16vw" className="object-cover" loading="lazy" />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* every photo, as a calm grid; each opens the viewer */}
      <div className="px-5 pb-24 pt-20 md:px-8 md:pt-28">
        <Reveal className="text-center">
          <div className="md:hidden">{heading}</div>
          <div className="hidden md:block">
            <Eyebrow>All {photos.length} photos</Eyebrow>
            <h3 className="fd mt-3 text-4xl uppercase tracking-wide md:text-5xl">Every frame</h3>
          </div>
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
          {photos.map((id, i) => (
            <li key={id}>
              <Reveal delay={(i % 4) * 0.08} scale={0.94}>
                <button
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo ${i + 1} of ${photos.length}`}
                  className="group block w-full overflow-hidden rounded-sm bg-white p-1.5 shadow-[0_10px_24px_rgba(50,35,20,.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(50,35,20,.24)] md:p-2"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={small(id)}
                      alt={`Nisha and Vaishak, photo ${i + 1}`}
                      fill
                      sizes="(min-width:768px) 22vw, 46vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
            <span>
              {open + 1} / {photos.length}
            </span>
            <button onClick={() => setOpen(null)} aria-label="Close" className="h-10 w-10 rounded-full bg-white/15 text-xl text-white">
              ×
            </button>
          </div>
          <div className="relative flex-1" onClick={() => setOpen(null)}>
            <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
              <Image key={photos[open]} src={full(photos[open])} alt={`Nisha and Vaishak, photo ${open + 1}`} fill sizes="100vw" className="object-contain" priority />
            </div>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/15 text-white">
              ←
            </button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/15 text-white">
              →
            </button>
          </div>
          <div ref={strip} className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-3" data-lenis-prevent>
            {photos.map((id, i) => (
              <button
                key={id}
                data-i={i}
                onClick={() => setOpen(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`relative h-16 w-12 shrink-0 overflow-hidden rounded transition-opacity ${i === open ? "opacity-100 ring-2 ring-[var(--gold)]" : "opacity-50 hover:opacity-90"}`}
              >
                <Image src={small(id)} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
