"use client";
import { useEffect, useRef } from "react";
import { Star } from "./Textures";

/** A gold star that pops in when it scrolls into view. */
export default function PopStar({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={`star-pop ${className}`}>
      <Star className="h-full w-full" />
    </span>
  );
}
