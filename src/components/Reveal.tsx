"use client";
import { useEffect, useRef } from "react";

type From = "up" | "left" | "right" | "flip";

/**
 * Eases children into view once, like the reference: fade + slide, optional tilt that settles,
 * scale-up, blur-in, or a 3D flip. Respects reduced motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  rotate = 0,
  dist,
  scale = 1,
  blur = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: From;
  rotate?: number;
  /** Slide distance in px (phones use at most 110, wide screens up to 400). */
  dist?: number;
  scale?: number;
  blur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }
    const wide = window.innerWidth >= 768;
    const d = Math.min(dist ?? 60, wide ? 400 : 110);
    el.style.setProperty("--rx", from === "left" ? `${-d}px` : from === "right" ? `${d}px` : "0px");
    el.style.setProperty("--ry", from === "up" ? `${dist ?? 34}px` : from === "flip" ? "18px" : "0px");
    el.style.setProperty("--rr", `${rotate}deg`);
    el.style.setProperty("--rf", from === "flip" ? "-16deg" : "0deg");
    el.style.setProperty("--rs", `${scale}`);
    el.style.setProperty("--rb", `${blur}px`);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, from, rotate, dist, scale, blur]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
