"use client";
import { invite } from "@/data/invite";

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Builds a small .ics file with every celebration. Each event is assumed to run 3 hours. */
export default function AddToCalendar({ className = "", label = "Add to calendar" }: { className?: string; label?: string }) {
  const download = () => {
    const rows = invite.events.flatMap((e, i) => {
      const end = new Date(new Date(e.start).getTime() + 3 * 3600000).toISOString();
      const lines = [
        "BEGIN:VEVENT",
        `UID:${i}-${stamp(e.start)}@vaishak-nisha-wedding`,
        `DTSTAMP:${stamp(new Date().toISOString())}`,
        `DTSTART:${stamp(e.start)}`,
        `DTEND:${stamp(end)}`,
        `SUMMARY:${invite.groom} & ${invite.bride}: ${e.name}`,
      ];
      if (e.venue) lines.push(`LOCATION:${e.venue}\\, ${e.place}`);
      lines.push("END:VEVENT");
      return lines;
    });
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//EN", ...rows, "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "vaishak-nisha-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button onClick={download} className={className}>
      {label}
    </button>
  );
}
