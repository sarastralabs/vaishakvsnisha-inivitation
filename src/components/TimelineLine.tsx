"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** The vertical timeline line draws itself down as you scroll through the schedule. Desktop only. */
export default function TimelineLine() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) el.style.transform = "scaleY(1)";
      return;
    }
    const t = gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: parent, start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
  return <span ref={ref} aria-hidden className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-[2px] origin-top -translate-x-1/2 bg-[var(--sage)] md:block" />;
}
