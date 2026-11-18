"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invite } from "@/data/invite";

/** Full-width film. Names rise in on load; the film drifts and the text fades as you scroll away. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    media.current?.play().catch(() => {
      /* autoplay can be blocked; the poster frame stays */
    });
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(media.current, { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(text.current, { yPercent: -28, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      <video
        ref={media}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/reel-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Vaishak and Nisha, a short film from their pre-wedding shoot"
      >
        <source src="/video/reel.webm" type="video/webm" />
        <source src="/video/reel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div ref={text} className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-12 md:pb-14">
        <div className="hero-rise flex items-center gap-4 text-white/90" style={{ animationDelay: "0.3s" }}>
          <span className="text-sm">The wedding of</span>
          <span className="hero-line h-px w-20 bg-white/70" />
        </div>
        <h1 className="fd mt-2 text-[clamp(3.4rem,13vw,11rem)] leading-[.9] text-white">
          <span className="hero-rise inline-block" style={{ animationDelay: "0.55s" }}>
            {invite.groom}
          </span>{" "}
          <span className="hero-rise inline-block italic" style={{ animationDelay: "0.8s" }}>
            &amp;
          </span>{" "}
          <span className="hero-rise inline-block" style={{ animationDelay: "1.05s" }}>
            {invite.bride}
          </span>
        </h1>
        <div className="hero-rise mt-5 flex flex-wrap items-center justify-between gap-4 text-white/90" style={{ animationDelay: "1.35s" }}>
          <p className="text-sm uppercase tracking-[.25em]">{invite.dateLabel} · 12:05 PM</p>
          <a href="#events" className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--ink)] transition-transform hover:scale-105">
            See the schedule
          </a>
        </div>
      </div>
    </section>
  );
}
