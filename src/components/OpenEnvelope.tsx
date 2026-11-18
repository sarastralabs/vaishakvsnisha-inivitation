"use client";
import { useEffect, useId, useRef, useState } from "react";
import Countdown from "./Countdown";
import { Seal } from "./Textures";
import { invite } from "@/data/invite";

/** Bell-shaped card outline: narrow rounded top, curved shoulders, straight sides. viewBox 400 x 300. */
const CARD =
  "M0 300 L0 170 C0 140 12 124 42 114 C92 98 122 88 138 62 C150 40 168 12 200 12 C232 12 250 40 262 62 C278 88 308 98 358 114 C388 124 400 140 400 170 L400 300 Z";

/** The letter: cream card with a thin gold foil line that follows the shape. */
function Letter({ children }: { children: React.ReactNode }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_26px_rgba(60,45,25,.3)]" aria-hidden>
        <defs>
          <clipPath id={`${id}c`}>
            <path d={CARD} />
          </clipPath>
          <filter id={`${id}n`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" />
            <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .35  0 0 0 .22 0" />
          </filter>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8913a" />
            <stop offset=".35" stopColor="#f3dc93" />
            <stop offset=".65" stopColor="#c9a54f" />
            <stop offset="1" stopColor="#ecd07f" />
          </linearGradient>
        </defs>
        <path d={CARD} fill="#e9e1d1" />
        <rect width="400" height="300" filter={`url(#${id}n)`} clipPath={`url(#${id}c)`} />
        <path d={CARD} fill="none" stroke="#c9bfab" strokeWidth="1.2" />
        <path d={CARD} fill="none" stroke={`url(#${id}g)`} strokeWidth="2" strokeLinecap="round" transform="translate(200 302) scale(.955 .955) translate(-200 -302)" />
      </svg>
      <div className="absolute inset-x-[9%] bottom-[7%] top-[26%] flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

type Stage = 0 | 1 | 2; // 0 closed, 1 opening and rising, 2 letter shown large

/**
 * Tap or scroll to open: the flap opens, the letter rises out, then slides forward and grows
 * into a large card holding the countdown, while the envelope fades back.
 */
export default function OpenEnvelope() {
  const [stage, setStage] = useState<Stage>(0);
  const wrap = useRef<HTMLDivElement>(null);
  const auto = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const run = () => {
    clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(2);
      return;
    }
    setStage(1);
    timer.current = setTimeout(() => setStage(2), 1700);
  };
  const close = () => {
    clearTimeout(timer.current);
    setStage(0);
  };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !auto.current) {
          auto.current = true;
          t = setTimeout(run, 900);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) clearTimeout(t);
      clearTimeout(timer.current);
    };
  }, []);

  const ease = "cubic-bezier(.2,.8,.2,1)";
  const letterTransform = stage === 0 ? "translateY(16.5%) scale(.5)" : stage === 1 ? "translateY(-13%) scale(.5)" : "translateY(0%) scale(1)";
  return (
    <div ref={wrap} className="mx-auto w-full max-w-[34rem]">
      <button
        onClick={() => (stage === 0 ? run() : close())}
        aria-expanded={stage > 0}
        aria-label={stage === 0 ? "Open the envelope" : "Close the envelope"}
        className="relative block aspect-[4/3] w-full cursor-pointer text-left [perspective:1400px]"
      >
        {/* the envelope */}
        <div
          className="absolute inset-x-[18%] top-[38%] aspect-[3/2]"
          style={{
            opacity: stage === 2 ? 0 : 1,
            transform: stage === 2 ? "translateY(10%) scale(.94)" : "none",
            transition: `opacity .9s ease ${stage === 2 ? ".25s" : "0s"}, transform 1s ${ease}`,
          }}
        >
          <svg viewBox="0 0 450 300" className="absolute inset-0 h-full w-full drop-shadow-xl" aria-hidden>
            <rect x="4" y="4" width="442" height="292" rx="14" fill="#d9ceb4" />
          </svg>
          <svg viewBox="0 0 450 300" className="pointer-events-none absolute inset-0 z-30 h-full w-full" aria-hidden>
            <path d="M4 296 V70 Q4 62 12 68 L225 196 L438 68 Q446 62 446 70 V296Z" fill="#e6dcc7" stroke="#cdbf9f" strokeWidth="1.5" />
            <path d="M4 296 L170 170 M446 296 L280 170" stroke="#d3c6a8" strokeWidth="1.4" fill="none" />
          </svg>
          <div
            className="absolute inset-x-0 top-0 h-[58.7%] [transform-style:preserve-3d]"
            style={{
              transformOrigin: "top",
              transform: stage > 0 ? "rotateX(180deg)" : "rotateX(0deg)",
              transition: `transform 1s ${ease}, z-index 0s ${stage > 0 ? ".45s" : "0s"}`,
              zIndex: stage > 0 ? 5 : 40,
            }}
          >
            <svg viewBox="0 0 450 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full [backface-visibility:hidden]" aria-hidden>
              <path d="M4 18 Q4 4 18 4 H432 Q446 4 446 18 L232 172 Q225 177 218 172Z" fill="#efe6d2" stroke="#cdbf9f" strokeWidth="1.5" />
              <path d="M34 22 Q225 150 416 22" stroke="#c9a45c" strokeWidth="1.2" fill="none" opacity=".7" />
            </svg>
            <svg viewBox="0 0 450 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateX(180deg)]" aria-hidden>
              <path d="M4 18 Q4 4 18 4 H432 Q446 4 446 18 L232 172 Q225 177 218 172Z" fill="#e2d7bd" stroke="#cdbf9f" strokeWidth="1.5" />
            </svg>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 [backface-visibility:hidden]">
              <Seal icon="rings" className="scale-110" />
            </span>
          </div>
        </div>

        {/* the letter: rises out, then grows into a large card */}
        <div
          className="absolute inset-0"
          style={{
            transform: letterTransform,
            opacity: stage === 0 ? 0 : 1,
            zIndex: stage === 2 ? 50 : 20,
            transition: `transform ${stage === 1 ? `1.1s ${ease} .45s` : `1.2s ${ease}`}, opacity ${stage === 0 ? ".3s" : ".3s .45s"}`,
          }}
        >
          <Letter>
            <p className="text-[11px] font-semibold uppercase tracking-[.3em] text-[var(--gold)] md:text-xs">Save the date</p>
            <p className="fd mt-1 text-xl md:text-3xl">{invite.dateLabel}</p>
            <div className="mt-3 w-full md:mt-5">
              <Countdown compact />
            </div>
            <p className="script mt-2 text-2xl text-[var(--brush)] md:mt-4 md:text-4xl">
              {invite.groom} &amp; {invite.bride}
            </p>
          </Letter>
        </div>
      </button>
      <p className="mt-3 text-center text-xs uppercase tracking-[.3em] text-[var(--sea)]">{stage === 2 ? "Tap the card to close" : stage === 0 ? "Tap to open" : " "}</p>
    </div>
  );
}
