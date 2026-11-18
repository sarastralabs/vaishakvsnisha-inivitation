/** Flowers, lotus, hearts and the wax seal for the envelope. Drawn from scratch, decorative only. */

export const MAROON = "#7d1626";
export const RED = "#9c1c2d";
export const GOLD = "#c9a54f";
export const CREAM = "#fbf3e1";

/** A sprig of cream blossoms, leaves and gold berries (made in ChatGPT). Place it in a corner; flip it for the opposite corner. */
export function Bloom({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/art/flowers.webp" alt="" aria-hidden width={800} height={511} className={`h-auto ${className}`} />
  );
}

/** Gold line-art lotus. viewBox 0 0 60 36. */
export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={className} fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M30 32 C22 26 20 14 30 4 C40 14 38 26 30 32Z" />
      <path d="M28 32 C16 30 8 22 6 12 C16 12 24 18 28 26" />
      <path d="M32 32 C44 30 52 22 54 12 C44 12 36 18 32 26" />
      <path d="M12 33 H48" />
      <path d="M30 14 V28" opacity=".6" />
    </svg>
  );
}

/** A thin gold rule with two small hearts in the middle. */
export function HeartRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 18" className={className} fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" aria-hidden>
      <path d="M2 9 H88" />
      <path d="M132 9 H218" />
      <path d="M106 14 C99 9 98 4 102 3 C104.5 2.5 106 4.5 106 5.5 C106 4.5 107.5 2.5 110 3 C114 4 113 9 106 14Z" />
      <path d="M114 14 C107 9 106 4 110 3 C112.5 2.5 114 4.5 114 5.5 C114 4.5 115.5 2.5 118 3 C122 4 121 9 114 14Z" />
    </svg>
  );
}

/** A lobed, wavy wax-seal outline. */
const waxPath = (() => {
  const n = 22;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r = 30 + (i % 2 ? 2.6 : -1.2);
    return [50 + Math.cos(a) * r, 46 + Math.sin(a) * r] as const;
  });
  return pts.map(([x, y], i) => `${i ? "Q" : "M"}${x.toFixed(1)} ${y.toFixed(1)}${i ? ` ${pts[(i + 1) % n][0].toFixed(1)} ${pts[(i + 1) % n][1].toFixed(1)}` : ""}`).join(" ") + "Z";
})();

/** Red wax seal with gold rings and a heart, plus two ribbon tails. viewBox 0 0 100 150. */
export function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 150" className={className} aria-hidden>
      <defs>
        <radialGradient id="wax-g" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#c5283b" />
          <stop offset=".6" stopColor="#9c1c2d" />
          <stop offset="1" stopColor="#6f1020" />
        </radialGradient>
      </defs>
      <path d="M36 68 L18 140 L38 128 L48 146 L56 78Z" fill={RED} />
      <path d="M64 68 L82 138 L62 126 L52 146 L44 78Z" fill="#8a1828" />
      <path d="M34 80 L25 120 M66 80 L75 118" stroke={GOLD} strokeWidth=".9" fill="none" />
      <path d={waxPath} fill="url(#wax-g)" />
      <circle cx="50" cy="46" r="22.5" fill="none" stroke={GOLD} strokeWidth="1.2" opacity=".9" />
      <circle cx="43.5" cy="51" r="8.2" fill="none" stroke={GOLD} strokeWidth="2.2" />
      <circle cx="56.5" cy="51" r="8.2" fill="none" stroke={GOLD} strokeWidth="2.2" />
      <path d="M50 38 C45 34 44.5 30.5 47.2 29.8 C49 29.4 50 31 50 31.8 C50 31 51 29.4 52.8 29.8 C55.5 30.5 55 34 50 38Z" fill={GOLD} />
    </svg>
  );
}
