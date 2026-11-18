"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Moves its child vertically (and optionally sways it) as the page scrolls. */
export default function Parallax({ children, amount = 40, rotate = 0, className = "" }: { children: React.ReactNode; amount?: number; rotate?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const t = gsap.fromTo(
      el,
      { y: amount, rotate },
      { y: -amount, rotate: -rotate, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, [amount, rotate]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
