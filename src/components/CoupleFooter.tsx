"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { full, invite } from "@/data/invite";
import ShareButton from "./ShareButton";
import AddToCalendar from "./AddToCalendar";

/**
 * Closing section. Text on the left, the couple on the right: their heads rise above the top edge
 * of the footer and their bodies sit inside it (the footer clips only at the sides and bottom).
 */
export default function CoupleFooter() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const couple = useRef<HTMLDivElement>(null);

  // Warm the cache: fetch the illustration after the page has loaded so it is ready before you reach the footer.
  useEffect(() => {
    const warm = () => {
      const img = new window.Image();
      img.src = "/art/couple.webp";
      img.decode?.().catch(() => {
        /* decode is optional */
      });
    };
    if (document.readyState === "complete") {
      const t = setTimeout(warm, 1200);
      return () => clearTimeout(t);
    }
    let t: ReturnType<typeof setTimeout> | undefined;
    const onLoad = () => {
      t = setTimeout(warm, 1200);
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      if (t) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (bg.current) gsap.fromTo(bg.current, { yPercent: -10, scale: 1.1 }, { yPercent: 10, scale: 1.1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      if (couple.current) gsap.fromTo(couple.current, { yPercent: 14, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 80%", end: "top 25%", scrub: 0.8 } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative isolate px-5 pb-16 pt-[64vw] text-center text-white [clip-path:inset(-400px_0_0_0)] md:px-12 md:pb-20 md:pt-28 md:text-left">
      {/* background photo, clipped inside the footer */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div ref={bg} className="absolute inset-0">
          <Image src={full("post-b-04")} alt="" fill sizes="100vw" className="object-cover" loading="lazy" />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[#2f4636]/78" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <div className="relative mx-auto max-w-6xl">
        <div className="md:max-w-[46%]">
          <p className="text-xs font-semibold uppercase tracking-[.4em] text-[#e4c47e]">With love</p>
          <h2 className="fd mt-4 text-3xl uppercase tracking-wide md:text-5xl">Can&apos;t wait to celebrate with you</h2>
          <p className="script mt-6 text-6xl leading-tight md:text-7xl">
            {invite.groom} &amp; {invite.bride}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[.3em] text-[#e4c47e]">{invite.dateLabel}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <AddToCalendar label="Add all dates to calendar" className="rounded-full bg-[var(--sage)] px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105" />
            <ShareButton />
          </div>
        </div>
      </div>

      <p className="relative mx-auto mt-14 max-w-6xl text-center text-xs text-white/75 md:text-left">
        Designed and developed by{" "}
        <a href="https://www.sarastralabs.com" target="_blank" rel="noopener noreferrer" className="inline-block py-3 font-semibold text-[#e4c47e] underline-offset-4 hover:underline">
          Sarastra Labs
        </a>
      </p>

      {/* the couple: head above the footer edge, body inside it, on the right */}
      <div
        ref={couple}
        className="pointer-events-none absolute -top-[14vw] right-[-2vw] z-10 h-[74vw] w-[52vw] md:-top-[150px] md:bottom-0 md:right-[3%] md:h-auto md:w-[44vw] md:max-w-[620px]"
      >
        <div className="couple-sway absolute inset-0">
          <Image
            src="/art/couple.webp"
            unoptimized
            alt="Illustration of Vaishak and Nisha dancing"
            fill
            sizes="(min-width:768px) 44vw, 52vw"
            className="object-contain object-top drop-shadow-[0_18px_28px_rgba(0,0,0,.45)] md:object-bottom"
          />
        </div>
      </div>
    </footer>
  );
}
