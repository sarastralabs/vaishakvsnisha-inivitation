"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invite } from "@/data/invite";

/** Full-width film. Names rise in on load; the film drifts and the text fades as you scroll away. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const ambient = useRef<HTMLVideoElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Pick the film after the page is up (WebM where supported, else MP4); none on data saver.
    const v = media.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (v && !conn?.saveData) {
      const webm = v.canPlayType('video/webm; codecs="vp9"') !== "";
      // phones get the 960 px film (the band is only ~390 px wide, so it is just as sharp); everything else the full one
      const small = window.matchMedia("(max-width: 767px)").matches;
      const src = small ? "/video/film-md.mp4" : `/video/film.${webm ? "webm" : "mp4"}`;
      for (const el of [v, ambient.current]) {
        if (!el) continue;
        // the blurred copy needs no detail, so it gets a tiny file
        el.src = el === v ? src : "/video/film-bg.mp4";
        el.play().catch(() => {
          /* autoplay can be blocked; the poster frame stays */
        });
      }
    }
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      if (window.matchMedia("(min-width: 768px)").matches) gsap.to(media.current, { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(text.current, { yPercent: -28, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      {/* phones: a soft blurred still, then a blurred moving copy of the film, fill the screen behind the sharp film */}
      <div aria-hidden className="absolute inset-0 scale-125 bg-cover bg-center opacity-60 blur-2xl md:hidden" style={{ backgroundImage: "url(/video/film-poster.jpg)" }} />
      <video
        ref={ambient}
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl md:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <video
        ref={media}
        className="absolute left-0 top-[13svh] aspect-video w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] md:inset-0 md:top-0 md:aspect-auto md:h-full md:[mask-image:none]"
        poster="/video/film-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label="Vaishak and Nisha, their pre-wedding film by the sea"
      />
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
