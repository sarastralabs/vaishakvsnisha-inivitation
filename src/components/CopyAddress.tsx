"use client";
import { useState } from "react";

/** Copies a venue address to the clipboard. */
export default function CopyAddress({ text, className = "" }: { text: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };
  return (
    <button onClick={copy} className={className}>
      {done ? "Address copied" : "Copy address"}
    </button>
  );
}
