"use client";
import { useEffect, useRef } from "react";
import { Seal, type SealIcon } from "./Textures";

/** A wax seal that stamps down when it scrolls into view. */
export default function StampSeal({ icon, className = "" }: { icon?: SealIcon; className?: string }) {
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
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={`stamp inline-block ${className}`}>
      <Seal icon={icon} />
    </span>
  );
}
