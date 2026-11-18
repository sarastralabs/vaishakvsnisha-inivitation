/** Paper, wax seal, star and envelope art used across the page. Decorative only. */

/** SVG filters referenced from CSS (.paper and .seal). Mount once. */
export function TextureDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <filter id="torn" x="-6%" y="-6%" width="112%" height="112%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="wax" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="8" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 0 C21.5 12 28 18.5 40 20 C28 21.5 21.5 28 20 40 C18.5 28 12 21.5 0 20 C12 18.5 18.5 12 20 0Z" fill="#c9a45c" />
    </svg>
  );
}

const icons = {
  heart: <path d="M12 20 C5 14.5 3 11 3 8.2 C3 5.8 4.8 4 7 4 C9 4 10.8 5.2 12 7 C13.2 5.2 15 4 17 4 C19.2 4 21 5.8 21 8.2 C21 11 19 14.5 12 20Z" />,
  rings: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M7 6 L9 3 L11 6 L9 8Z" />
    </>
  ),
  om: <path d="M7 9c3-3 7-1 6 2-1 2-4 2-4 5 0 2 2 3 4 3 3 0 5-2 4-5M14 7c1-2 3-2 5-1M16 10c1 0 2-1 2-2" />,
  arch: (
    <>
      <path d="M6 20 V10 C6 3 18 3 18 10 V20" />
      <path d="M12 20 V10" />
    </>
  ),
};

export function Seal({ icon = "heart", className = "" }: { icon?: keyof typeof icons; className?: string }) {
  return (
    <span className={`seal ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icons[icon]}
      </svg>
    </span>
  );
}

/** A closed envelope with a wax seal. */
export function Envelope({ className = "", note = "With love" }: { className?: string; note?: string }) {
  return (
    <div className={`relative mx-auto aspect-[3/2] w-full max-w-xl ${className}`} aria-hidden>
      <svg viewBox="0 0 450 300" className="h-full w-full drop-shadow-xl">
        <rect x="4" y="4" width="442" height="292" rx="14" fill="#e6dcc7" />
        <path d="M4 18 Q4 4 18 4 H432 Q446 4 446 18 L232 176 Q225 181 218 176Z" fill="#f1e9d8" stroke="#cdbf9f" strokeWidth="1.5" />
        <path d="M4 292 L190 150" stroke="#d8cbb0" strokeWidth="1.5" fill="none" />
        <path d="M446 292 L260 150" stroke="#d8cbb0" strokeWidth="1.5" fill="none" />
        <path d="M30 20 Q225 150 420 20" stroke="#c9a45c" strokeWidth="1.2" fill="none" opacity=".7" />
      </svg>
      <Seal icon="rings" className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 scale-125" />
      <p className="fd absolute inset-x-0 bottom-[10%] text-center text-lg italic text-[#8a7a58]">{note}</p>
    </div>
  );
}
