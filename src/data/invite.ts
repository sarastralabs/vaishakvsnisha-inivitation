/** Everything editable lives here. Details come from the invitation card and the dress code PDF. */
export type EventItem = {
  name: string;
  day: string;
  date: string;
  time: string;
  venue: string; // leave "" until the venue is known
  place: string;
  /** Paste a Google Maps link here when you have it. It takes priority over mapQuery. */
  mapUrl?: string;
  /** Used to build a Google Maps search if there is no mapUrl. */
  mapQuery?: string;
  start: string; // ISO with +05:30
  /** Short extra line shown under the time. */
  note?: string;
  photo: string;
  icon: "heart" | "rings" | "om" | "arch" | "mehendi" | "kalash" | "cheers";
};

export const invite = {
  bride: "Nisha",
  groom: "Vaishak",
  intro: "Together with their families",
  tagline: "Cordially invite you to join the occasion of their joyous commitment",
  // Main ceremony, IST.
  date: "2026-11-29T12:05:00+05:30" as string | null,
  dateLabel: "Sunday, 29 November 2026",
  city: "Mahalakshmi Sabhabhavana, Uchila, Udupi",
  // Fill each answer (a), and optionally a date label (date). Empty answers show a soft placeholder.
  storyIntro: "Sometimes, the most beautiful love stories begin without us even realizing it.",
  story: [
    {
      q: "How did we meet?",
      a: "Our story began at the same workplace. During the COVID period, we would often see each other around the office, but little did we know that we were looking at someone who would eventually become such an important part of our lives. At first, we were just two colleagues who barely knew each other.",
      date: "",
    },
    {
      q: "How did we start talking?",
      a: "Our first real conversations started through our office internal team chat, where we connected over work-related discussions. Slowly, those professional conversations turned into friendly chats, and a beautiful friendship began to blossom.",
      date: "",
    },
    {
      q: "Then came Instagram",
      a: "As time passed, we connected on Instagram, and our conversations became more frequent. What started as simple messages slowly turned into long conversations, endless smiles, and a special bond that neither of us expected. We spent time getting to know each other, sharing our thoughts, dreams, and little moments of everyday life.",
      date: "",
    },
    {
      q: "When did we know?",
      a: "After a year of knowing each other, we realized that what we shared was more than just a friendship. Our hearts had found their way to each other, and our journey of pure love began.",
      date: "",
    },
    {
      q: "Our first meeting",
      a: "And then came the moment we had been waiting for. Finally seeing each other, beyond office conversations and Instagram messages, made everything feel even more special. It was the beginning of countless memories, beautiful moments, and a journey we knew we wanted to take together.",
      date: "",
    },
  ],
  storyClose: {
    lead: "Who would have thought that two people who once simply crossed paths at work would one day become each other's favorite person?",
    line: "From colleagues to friends, from friends to soulmates, this is our story.",
    last: "A story that started with a simple hello and turned into a forever kind of love.",
  },
  events: [
    {
      name: "Mehendi",
      day: "Friday",
      date: "27 November 2026",
      time: "6:00 PM",
      venue: "Hema Nivasa",
      place: "Uliyathadka, Salethuru",
      note: "Satyanarayana Pooja and Mehendi ceremony at our home",
      mapUrl: "https://maps.app.goo.gl/8gFkqABzw3m6SUuj6",
      start: "2026-11-27T18:00:00+05:30",
      photo: "post-b-10",
      icon: "mehendi",
    },
    {
      name: "The Marriage",
      day: "Sunday",
      date: "29 November 2026",
      time: "12:05 PM",
      venue: "Mahalakshmi Sabhabhavana",
      place: "Uchila, Udupi",
      note: "Abhijith Lagnam",
      mapUrl: "https://maps.app.goo.gl/rAGEwJrSnaCBVyTd8",
      start: "2026-11-29T12:05:00+05:30",
      photo: "post-a-07",
      icon: "kalash",
    },
    {
      name: "Reception",
      day: "Wednesday",
      date: "2 December 2026",
      time: "11:30 AM",
      venue: "Bantawalada Bantara Bhavana",
      place: "Brahmarakotlu, Thumbe",
      mapUrl: "https://maps.app.goo.gl/XDVWFY88KEjW3fuE8",
      start: "2026-12-02T11:30:00+05:30",
      photo: "post-b-08",
      icon: "cheers",
    },
  ] as EventItem[],
  // From "Dress code for Vaishak-Nisha wedding.pdf"
  dressIntro: "Ladies: any traditional or western wear, in any colour, for the Mehendi, Marriage and Reception.",
  dress: [
    {
      event: "Mehendi",
      icon: "kurta" as const,
      when: "27 November · 6:00 PM",
      rule: "Kurta, any colour",
      text: "Please wear a kurta in the style shown, in any colour.",
      swatches: [],
      photos: ["mehendi-1"],
    },
    {
      event: "The Marriage",
      icon: "ensemble" as const,
      when: "29 November",
      rule: "Traditional, any colour",
      text: "Any traditional outfit in any colour. A few ideas are shown.",
      swatches: [],
      photos: ["marriage-1", "marriage-2", "marriage-3"],
    },
    {
      event: "Reception",
      icon: "blazer" as const,
      when: "2 December",
      rule: "Blazer, any colour",
      text: "A blazer in any colour. Two examples are shown.",
      swatches: [],
      photos: ["reception-1", "reception-2"],
    },
  ],
  faq: [
    { q: "When and where is the Mehendi?", a: "Friday 27 November at 6:00 PM, at Hema Nivasa, Uliyathadka, Salethuru. It begins with the Satyanarayana Pooja at the family home." },
    { q: "Where is the marriage?", a: "Mahalakshmi Sabhabhavana, Uchila, Udupi, on Sunday 29 November at 12:05 PM (Abhijith Lagnam)." },
    { q: "Where is the reception?", a: "Bantawalada Bantara Bhavana, Brahmarakotlu, Thumbe, on Wednesday 2 December at 11:30 AM." },
    { q: "What should I wear?", a: "See the dress code section: a kurta for the Mehendi, traditional wear for the marriage and a blazer for the reception, all in any colour." },
  ],
};

/** All 26 photos, in order. */
export const photos = [
  ...Array.from({ length: 16 }, (_, i) => `post-a-${String(i + 1).padStart(2, "0")}`),
  ...Array.from({ length: 10 }, (_, i) => `post-b-${String(i + 1).padStart(2, "0")}`),
];
/** The best 12 for the gallery, picked for variety and sharpness. */
export const best = ["post-a-04", "post-a-01", "post-b-04", "post-a-06", "post-a-10", "post-a-14", "post-b-03", "post-a-07", "post-b-09", "post-a-15", "post-b-06", "post-b-08"];
export const full = (id: string) => `/img/${id}.webp`;
export const small = (id: string) => `/img/${id}-sm.webp`;

