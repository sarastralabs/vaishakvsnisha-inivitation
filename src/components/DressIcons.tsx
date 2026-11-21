import Image from "next/image";

/** Your own icons (made in ChatGPT, cleaned up). Any icon not listed here falls back to the drawn one below. */
const files: Partial<Record<"kurta" | "ensemble" | "blazer", { src: string; w: number; h: number }>> = {
  kurta: { src: "/icons/dress-kurta.png", w: 164, h: 256 },
  ensemble: { src: "/icons/dress-ensemble.png", w: 135, h: 256 },
  blazer: { src: "/icons/dress-blazer.png", w: 229, h: 256 },
};

/** Simple gold line icons for each dress code (kurta, kurta with shawl and dhoti, blazer). viewBox 0 0 64 64. Decorative. */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export type DressIconName = "kurta" | "ensemble" | "blazer";

export default function DressIcon({ name, className = "" }: { name: DressIconName; className?: string }) {
  const f = files[name];
  if (f) return <Image src={f.src} alt="" width={f.w} height={f.h} unoptimized aria-hidden className="h-11 w-auto" />;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden {...base}>
      {name === "kurta" && (
        <>
          <path d="M24 9 C27 13 37 13 40 9 L52 17 L47 28 L41 24 V56 H23 V24 L17 28 L12 17 Z" />
          <path d="M32 13 V42" />
          <circle cx="32" cy="20" r=".9" />
          <circle cx="32" cy="27" r=".9" />
          <circle cx="32" cy="34" r=".9" />
          <path d="M23 50 H41" opacity=".6" />
        </>
      )}
      {name === "ensemble" && (
        <>
          <path d="M24 8 C27 12 37 12 40 8 L51 15 L47 25 L41 22 V36 H23 V22 L17 25 L13 15 Z" />
          <path d="M20 11 C28 22 36 29 45 41" strokeWidth="2.4" opacity=".75" />
          <path d="M23 36 L21 58 H43 L41 36" />
          <path d="M28 38 L27 58 M32 38 V58 M36 38 L37 58" opacity=".6" />
        </>
      )}
      {name === "blazer" && (
        <>
          <path d="M19 8 L32 23 L45 8 L55 16 L51 57 H13 L9 16 Z" />
          <path d="M32 23 V44" />
          <path d="M32 23 L24 15 M32 23 L40 15" opacity=".7" />
          <circle cx="32" cy="36" r="1" />
          <path d="M38 44 H46" opacity=".7" />
        </>
      )}
    </svg>
  );
}

/** A row of festive colour dots that says "any colour". */
export function ColourDots({ className = "", colours, label = "Any colour" }: { className?: string; colours?: string[]; label?: string }) {
  const dots = colours?.length ? colours : ["#7d1626", "#c9a54f", "#3f6a4a", "#2c4a7a", "#b04a6a", "#e2b93b"];
  return (
    <ul className={`flex items-center justify-center gap-1.5 ${className}`} aria-label={label}>
      {dots.map((c) => (
        <li key={c} className="h-4 w-4 rounded-full border border-black/10 shadow-inner" style={{ background: c }} />
      ))}
    </ul>
  );
}
