"use client";
import { useEffect, useId, useRef, useState } from "react";
import Countdown from "./Countdown";
import { Bloom, CREAM, GOLD, HeartRule, Lotus, MAROON, WaxSeal } from "./Blooms";
import { invite } from "@/data/invite";

/** Maroon bell-shaped back piece of the letter. viewBox 400 x 300. */
const BELL =
  "M0 300 L0 176 C0 146 12 130 42 120 C92 104 122 92 138 66 C150 44 168 14 200 14 C232 14 250 44 262 66 C278 92 308 104 358 120 C388 130 400 146 400 176 L400 300 Z";
/** Cream card with notched corners. */
const NOTCH = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 0 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 0 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 0 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 0 ${x + r} ${y} Z`;

/** The letter: maroon back with a lotus, a cream card on a gold edge, flowers in two corners. */
function Letter({ children }: { children: React.ReactNode }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_26px_rgba(60,25,25,.32)]" aria-hidden>
        <defs>
          <linearGradient id={`${id}m`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8e1a2c" />
            <stop offset="1" stopColor="#6c1020" />
          </linearGradient>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8913a" />
            <stop offset=".4" stopColor="#f3dc93" />
            <stop offset="1" stopColor="#c9a54f" />
          </linearGradient>
          <filter id={`${id}n`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .42  0 0 0 0 .3  0 0 0 .16 0" />
          </filter>
          <clipPath id={`${id}c`}>
            <path d={NOTCH(14, 92, 372, 196, 16)} />
          </clipPath>
        </defs>
        {/* maroon back, edged in gold */}
        <path d={BELL} fill={`url(#${id}m)`} />
        <path d={BELL} fill="none" stroke={`url(#${id}g)`} strokeWidth="2.2" />
        {/* gold paper under the card */}
        <path d={NOTCH(10, 100, 380, 196, 16)} fill={`url(#${id}g)`} />
        {/* the cream card */}
        <path d={NOTCH(14, 92, 372, 196, 16)} fill={CREAM} />
        <rect x="14" y="92" width="372" height="196" filter={`url(#${id}n)`} clipPath={`url(#${id}c)`} />
        <path d={NOTCH(22, 100, 356, 180, 12)} fill="none" stroke={`url(#${id}g)`} strokeWidth="1.2" />
        <path d={NOTCH(18, 96, 364, 188, 14)} fill="none" stroke={GOLD} strokeWidth=".6" opacity=".7" />
      </svg>
      {/* lotus on the maroon crown */}
      <Lotus className="absolute left-1/2 top-[11%] h-[9%] w-[16%] -translate-x-1/2" />
      {/* flowers in two corners of the card */}
      <Bloom className="pointer-events-none absolute left-[3%] top-[26%] w-[19%]" />
      <Bloom className="pointer-events-none absolute bottom-[1%] right-[3%] w-[19%] -scale-100" />
      <div className="absolute inset-x-[9%] bottom-[8%] top-[34%] flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

type Stage = 0 | 1 | 2; // 0 closed, 1 opening and rising, 2 letter shown large

const FLAP = "M4 20 Q4 4 20 4 H430 Q446 4 446 20 V62 C446 90 424 96 402 90 C360 80 326 108 292 140 C268 162 246 184 225 191 C204 184 182 162 158 140 C124 108 90 80 48 90 C26 96 4 90 4 62 Z";

/**
 * Tap or scroll to open: the flap lifts, the letter rises, then slides forward and grows into a
 * large card with the live countdown while the envelope fades back.
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
  const letterTransform = stage === 0 ? "translateY(14%) scale(.5)" : stage === 1 ? "translateY(-13%) scale(.5)" : "translateY(0%) scale(1)";
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
          className="absolute inset-x-[15%] top-[33%] aspect-[3/2]"
          style={{
            opacity: stage === 2 ? 0 : 1,
            transform: stage === 2 ? "translateY(10%) scale(.94)" : "none",
            transition: `opacity .9s ease ${stage === 2 ? ".25s" : "0s"}, transform 1s ${ease}`,
          }}
        >
          {/* inside of the envelope: maroon, with a cream shell offset to the left and up */}
          <svg viewBox="0 0 450 300" className="absolute inset-0 h-full w-full drop-shadow-xl" aria-hidden>
            <rect x="14" y="10" width="432" height="286" rx="16" fill={MAROON} />
            <rect x="4" y="4" width="432" height="286" rx="14" fill="#f5e9d0" />
            <rect x="4" y="4" width="432" height="286" rx="14" fill="#7d1626" opacity=".0" />
          </svg>
          {/* maroon interior shows when the flap is open */}
          <svg viewBox="0 0 450 300" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            <path d="M4 70 Q4 62 12 68 L225 196 L438 68 Q446 62 446 70 V4 H4Z" fill={MAROON} opacity={stage > 0 ? 1 : 0} style={{ transition: "opacity .4s ease .35s" }} />
          </svg>

          {/* front pocket, cream with gold folds */}
          <svg viewBox="0 0 450 300" className="pointer-events-none absolute inset-0 z-30 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="pocket-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fbf3e1" />
                <stop offset="1" stopColor="#f2e4c6" />
              </linearGradient>
            </defs>
            <path d="M4 292 V70 Q4 62 12 68 L225 196 L432 68 Q436 64 436 70 V292 Q436 290 432 290 H8 Q4 290 4 286Z" fill="url(#pocket-g)" stroke="#e3d3ae" strokeWidth="1.2" />
            <path d="M6 288 L168 174 M434 288 L282 174" stroke={GOLD} strokeWidth="1" fill="none" />
            <path d="M12 276 H428" stroke={GOLD} strokeWidth=".6" opacity=".55" />
            {/* faint leaf marks */}
            <g stroke={GOLD} strokeWidth="1" fill="none" opacity=".35" strokeLinecap="round">
              <path d="M64 262 C70 232 78 214 92 196" />
              <path d="M70 244 C58 240 52 232 54 224 C64 226 70 234 70 244Z" />
              <path d="M78 224 C90 218 100 220 104 228 C94 232 84 232 78 224Z" />
              <path d="M386 262 C380 232 372 214 358 196" />
              <path d="M380 244 C392 240 398 232 396 224 C386 226 380 234 380 244Z" />
              <path d="M372 224 C360 218 350 220 346 228 C356 232 366 232 372 224Z" />
            </g>
          </svg>

          {/* flap */}
          <div
            className="absolute inset-x-0 top-0 h-[65%] [transform-style:preserve-3d]"
            style={{
              transformOrigin: "top",
              transform: stage > 0 ? "rotateX(180deg)" : "rotateX(0deg)",
              transition: `transform 1s ${ease}, z-index 0s ${stage > 0 ? ".45s" : "0s"}`,
              zIndex: stage > 0 ? 5 : 40,
            }}
          >
            <svg viewBox="0 0 450 195" preserveAspectRatio="none" className="absolute inset-0 h-full w-full [backface-visibility:hidden]" aria-hidden>
              <defs>
                <linearGradient id="flap-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fbf3e1" />
                  <stop offset="1" stopColor="#f3e5c8" />
                </linearGradient>
              </defs>
              <path d={FLAP} transform="translate(0 6)" fill={MAROON} />
              <path d={FLAP} fill="url(#flap-g)" stroke="#e3d3ae" strokeWidth="1.2" />
              <path d={FLAP} fill="none" stroke={GOLD} strokeWidth="1.3" transform="translate(225 4) scale(.94 .9) translate(-225 -4)" />
            </svg>
            <svg viewBox="0 0 450 195" preserveAspectRatio="none" className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateX(180deg)]" aria-hidden>
              <path d={FLAP} fill="#6c1020" />
              <path d={FLAP} fill="none" stroke={GOLD} strokeWidth="1.3" transform="translate(225 4) scale(.94 .9) translate(-225 -4)" />
            </svg>
            <Lotus className="absolute left-1/2 top-[18%] h-[22%] w-[13%] -translate-x-1/2 [backface-visibility:hidden]" />
            <WaxSeal className="absolute left-1/2 top-[88%] z-10 w-[17%] -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_6px_8px_rgba(60,10,15,.35)] [backface-visibility:hidden]" />
          </div>

          {/* flowers on two corners */}
          <Bloom className="pointer-events-none absolute -left-[12%] -top-[22%] z-50 w-[40%]" />
          <Bloom className="pointer-events-none absolute -bottom-[26%] -right-[10%] z-50 w-[36%] -scale-100" />
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
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.28em] text-[#b88a2c] md:gap-3 md:text-sm">
              <span aria-hidden className="text-[8px] md:text-[10px]">◆</span>
              Save the date
              <span aria-hidden className="text-[8px] md:text-[10px]">◆</span>
            </p>
            <p className="fd mt-1 text-lg text-[#2a1a18] sm:text-2xl md:mt-2 md:text-[1.9rem]">{invite.dateLabel}</p>
            <div className="mt-2 w-full md:mt-4">
              <Countdown card />
            </div>
            <HeartRule className="mt-2 h-3 w-40 md:mt-4 md:h-4 md:w-56" />
            <p className="script mt-0.5 text-3xl leading-tight text-[#7d1626] sm:text-4xl md:mt-1 md:text-[3.2rem]">
              {invite.groom} &amp; {invite.bride}
            </p>
          </Letter>
        </div>
      </button>

      {/* the hint */}
      <div className="mt-4 flex flex-col items-center gap-2" aria-hidden>
        <HeartRule className="h-3 w-44" />
        <span className="inline-flex items-center gap-3 rounded-full border border-[#c9a54f] bg-gradient-to-b from-[#fbf3e1] to-[#f1e1bd] px-7 py-2.5 text-xs font-semibold uppercase tracking-[.3em] text-[#7d1626] shadow-sm">
          {stage === 2 ? "Tap the card to close" : stage === 0 ? "Tap to open" : "    "}
          {stage === 0 && (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11V5a1.5 1.5 0 0 1 3 0v5.5m0-1a1.5 1.5 0 0 1 3 0V12m0-1.2a1.5 1.5 0 0 1 3 0v3.7c0 4-2 6.5-6 6.5-3 0-4.5-1.5-6-4l-2-3a1.5 1.5 0 0 1 2.5-1.5L9 14" />
              <path d="M6 4 L4.5 2.5 M3.5 7 H1.5 M12 2 V0.5" opacity=".7" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}
