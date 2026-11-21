import Image from "next/image";
import Smooth from "@/components/Smooth";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import OpenEnvelope from "@/components/OpenEnvelope";
import Hero from "@/components/Hero";
import TimelineLine from "@/components/TimelineLine";
import PopStar from "@/components/PopStar";
import Gallery from "@/components/Gallery";
import AddToCalendar from "@/components/AddToCalendar";
import StampSeal from "@/components/StampSeal";
import CoupleFooter from "@/components/CoupleFooter";
import CopyAddress from "@/components/CopyAddress";
import DressIcon, { ColourDots } from "@/components/DressIcons";
import { eventIcons } from "@/components/Textures";
import { full, invite, type EventItem } from "@/data/invite";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <Reveal from="left" dist={26} blur={6}>
    <p className="text-xs font-semibold uppercase tracking-[.35em] text-[var(--gold)]">{children}</p>
  </Reveal>
);

const storyPhotos = ["post-a-04", "post-b-03", "post-a-15", "post-b-09", "post-a-10"];
const storyIcons = ["heart", "rings", "arch", "heart", "rings"] as const;

const mapHref = (e: EventItem) =>
  e.mapUrl || (e.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}` : null);

export default function Page() {
  return (
    <Smooth>
      <main id="top" className="overflow-x-clip">
        {/* HERO: names rise in; film drifts as you scroll away */}
        <Hero />

        {/* INVITATION: wording, then the envelope opens to the countdown */}
        <section className="mx-auto max-w-4xl px-5 py-14 text-center md:py-16" aria-label="Invitation">
          <Reveal>
            <Eyebrow>{invite.intro}</Eyebrow>
            <p className="fd mx-auto mt-6 max-w-2xl text-3xl leading-snug md:text-5xl">{invite.tagline}</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[.25em] text-[var(--brush)]">{invite.dateLabel} · 12:05 PM</p>
            <p className="mt-1 text-sm uppercase tracking-[.2em] text-[var(--sea)]">{invite.city}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 md:mt-8">
            <OpenEnvelope />
          </Reveal>
        </section>

        {/* STORY: each question sits above its answer on the torn-paper card */}
        <section id="story" className="botanical px-5 py-24 md:py-32" aria-labelledby="story-h">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center">
              <div className="paper mx-auto inline-block px-14 py-8 md:px-20">
                <Eyebrow>Our story</Eyebrow>
                <h2 id="story-h" className="fd mt-2 text-3xl uppercase tracking-wide md:text-5xl">
                  A story written in the stars
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="text-center">
              <p className="fd mx-auto mt-8 max-w-xl text-2xl italic leading-snug text-[var(--ink)]/80 md:text-3xl">{invite.storyIntro}</p>
            </Reveal>
            <div className="mt-20 grid gap-28 md:gap-44">
              {invite.story.map((s, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={s.q} className={`relative flex flex-col items-center md:items-start ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <Reveal from={left ? "left" : "right"} dist={150} rotate={left ? -6 : 6} className="relative z-10 w-[84%] max-w-[340px] md:w-[360px]">
                      <Parallax amount={30} rotate={left ? 3 : -3}>
                        <div className="card-tilt" style={{ transform: `rotate(${left ? -3 : 3}deg)` }}>
                          <div className="flex items-center justify-between pb-3 text-base text-[var(--ink)]/70">
                            <span>Chapter</span>
                            <span>{i + 1}</span>
                          </div>
                          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                            <Image src={full(storyPhotos[i])} alt="" fill sizes="360px" className="object-cover" loading="lazy" />
                          </div>
                          {s.date && <p className="pt-3 text-base text-[var(--ink)]/75">{s.date}</p>}
                        </div>
                      </Parallax>
                    </Reveal>
                    <Reveal
                      from={left ? "right" : "left"}
                      dist={150}
                      delay={0.2}
                      className={`relative z-20 mt-8 w-[88%] max-w-[440px] md:mt-32 md:w-[440px] ${left ? "md:-ml-12" : "md:-mr-12"}`}
                    >
                      <div className="paper min-h-[230px] px-9 pb-12 pt-16 text-center">
                        <StampSeal icon={storyIcons[i]} className="absolute -top-7 left-1/2 -translate-x-1/2" />
                        <h3 className="fd text-3xl leading-tight md:text-4xl">{s.q}</h3>
                        <div className="mx-auto my-4 h-px w-16 bg-[var(--gold)]/60" />
                        {s.a ? (
                          <p className="leading-relaxed text-[var(--ink)]/85">{s.a}</p>
                        ) : (
                          <p className="fd text-xl italic text-[var(--ink)]/45">Our answer will be added here.</p>
                        )}
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>
            <Reveal className="mt-28 text-center md:mt-40">
              <div className="paper mx-auto max-w-2xl px-8 pb-12 pt-14 md:px-14">
                <StampSeal icon="heart" className="absolute -top-7 left-1/2 -translate-x-1/2" />
                <p className="text-[var(--ink)]/80">{invite.storyClose.lead}</p>
                <div className="mx-auto my-5 h-px w-16 bg-[var(--gold)]/60" />
                <p className="fd text-3xl leading-tight text-[#7d1626] md:text-4xl">{invite.storyClose.line}</p>
                <p className="mt-4 italic text-[var(--ink)]/70">{invite.storyClose.last}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SCHEDULE: Haldi, Mehendi, Marriage, Reception in order */}
        <section id="events" className="px-5 py-24 md:py-32" aria-labelledby="ev-h">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center">
              <Eyebrow>The celebrations</Eyebrow>
              <h2 id="ev-h" className="fd mt-3 text-4xl uppercase tracking-wide md:text-6xl">
                Wedding schedule
              </h2>
            </Reveal>
            <ol className="relative mt-16 grid gap-20">
              <TimelineLine />
              {invite.events.map((e, i) => {
                const href = mapHref(e);
                return (
                  <li key={e.name} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-24">
                    <PopStar className="absolute left-1/2 top-0 z-10 hidden h-10 w-10 -translate-x-1/2 bg-[var(--ivory)] md:block" />
                    <Reveal from={i % 2 ? "right" : "left"} dist={120} scale={0.9} className={i % 2 ? "md:order-2" : ""}>
                      <div className="paper mx-auto w-[85%] max-w-[340px] p-5 md:w-full">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image src={full(e.photo)} alt="" fill sizes="340px" className="object-cover" loading="lazy" />
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={0.25} from={i % 2 ? "left" : "right"} dist={40} className={`text-center md:text-left ${i % 2 ? "md:order-1 md:text-right" : ""}`}>
                      <StampSeal icon={e.icon} className={i % 2 ? "md:float-right" : ""} />
                      <div className="clear-both" />
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[.25em] text-[var(--gold)]">
                        {e.day}, {e.date}
                      </p>
                      <p className="mt-1 text-2xl text-[var(--ink)]/80">{e.time}</p>
                      {e.note && <p className="mt-1 text-sm italic text-[var(--sea)]">{e.note}</p>}
                      <h3 className="fd mt-2 text-4xl md:text-5xl">{e.name}</h3>
                      {e.venue && <p className="mt-3 text-lg font-semibold uppercase tracking-wide">{e.venue}</p>}
                      <p className="text-[var(--ink)]/75">{e.place}</p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-block rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                        >
                          Get directions
                        </a>
                      ) : (
                        <p className="mt-5 inline-block rounded-full border border-dashed border-[var(--sage)] px-5 py-2 text-sm text-[var(--sage)]">Location coming soon</p>
                      )}
                    </Reveal>
                  </li>
                );
              })}
            </ol>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
              <AddToCalendar className="rounded-full border border-[var(--ink)]/25 px-6 py-3 text-sm font-semibold hover:bg-white/60" />
              <a href="/img/invitation-card.webp" target="_blank" rel="noopener noreferrer" className="inline-block py-3 text-sm font-semibold underline underline-offset-4">
                View the invitation card
              </a>
            </div>
          </div>
        </section>

        {/* VENUES: where each celebration is, with directions */}
        <section id="maps" className="px-5 pb-24 md:pb-32" aria-labelledby="mp-h">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <Eyebrow>Find us</Eyebrow>
              <h2 id="mp-h" className="fd mt-3 text-4xl uppercase tracking-wide md:text-6xl">
                Venues and directions
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-2">
              {invite.events.filter((e) => e.venue).map((e, i) => {
                const href = mapHref(e);
                const address = [e.venue, e.place].filter(Boolean).join(", ");
                return (
                  <li key={e.name}>
                    <Reveal delay={i * 0.1} className="h-full">
                      <article className="flex h-full flex-col rounded-2xl border border-[var(--ink)]/12 bg-white/70 p-7 text-center">
                        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#c9a54f]/60 bg-[#f6ead0]" aria-hidden>
                          {e.icon === "haldi" ? (
                            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#b88a2c]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 11 H20 C20 16.5 16.5 20 12 20 C7.5 20 4 16.5 4 11Z" />
                              <path d="M8 11 C8 8 10 7 12 7 C14 7 16 8 16 11" />
                              <path d="M12 3 V5 M8.5 4 L9.5 5.5 M15.5 4 L14.5 5.5" />
                            </svg>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={eventIcons[e.icon as keyof typeof eventIcons] ?? "/icons/event-marriage.png"} alt="" className="h-9 w-9 object-contain" />
                          )}
                        </span>
                        <h3 className="fd mt-4 text-3xl">{e.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[.16em] text-[var(--gold)]">
                          {e.day}, {e.date.replace(" 2026", "")} · {e.time}
                        </p>
                        <p className="mt-4 text-lg font-semibold">{e.venue}</p>
                        <p className="text-[var(--ink)]/75">{e.place}</p>
                        <div className="mt-6 flex flex-1 flex-col justify-end gap-2.5">
                          {href && (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--sage)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
                              Open in Google Maps
                            </a>
                          )}
                          <CopyAddress text={address} className="rounded-full border border-[var(--ink)]/25 px-5 py-3 text-sm font-semibold hover:bg-white" />
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* GALLERY: photos dealt one by one */}
        <section id="gallery" className="botanical overflow-x-clip" aria-label="Gallery">
          <Gallery />
        </section>

        {/* DRESS CODE: maroon band, cream cards with a double gold border */}
        <section id="dress" className="relative overflow-hidden bg-[#7d1626] px-5 py-24 md:py-32" aria-labelledby="dc-h">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.12] [background:radial-gradient(60%_50%_at_50%_0%,#f3dc93,transparent_70%)]" />
          <div className="relative mx-auto max-w-5xl">
            <Reveal className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[.35em] text-[#e4c47e]">What to wear</p>
              <h2 id="dc-h" className="fd mt-3 text-4xl uppercase tracking-wide text-[#fbf3e1] md:text-6xl">
                Dress code
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[#f3dfc4]/90">{invite.dressIntro}</p>
            </Reveal>
            <ul className="mt-14 grid gap-6 md:grid-cols-2">
              {invite.dress.map((d, i) => (
                <li key={d.event}>
                  <Reveal delay={i * 0.12} className="h-full">
                    <article className="relative flex h-full flex-col items-center rounded-[1.4rem] bg-[#fbf3e1] px-6 pb-8 pt-9 text-center shadow-2xl shadow-black/25 ring-1 ring-[#c9a54f]/70 before:pointer-events-none before:absolute before:inset-2 before:rounded-[1.1rem] before:border before:border-[#c9a54f]/55">
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-[#c9a54f] bg-gradient-to-b from-[#fffaf0] to-[#f1e1bd] text-[#9b7420]">
                        <DressIcon name={d.icon} className="h-9 w-9" />
                      </span>
                      <h3 className="fd mt-4 text-3xl text-[#7d1626] md:text-4xl">{d.event}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[.25em] text-[#b88a2c]">{d.when}</p>
                      <p className="mt-4 rounded-full bg-[#eddcb8] px-4 py-1.5 text-sm font-semibold text-[#7d1626]">{d.rule}</p>
                      <ColourDots className="mt-4" colours={d.swatches} label={d.swatches.length ? d.rule : undefined} />
                      <div className="mt-6 grid w-full gap-6 border-t border-[#c9a54f]/40 pt-6 text-left">
                        {([["Men", d.men], ["Ladies", d.ladies]] as const).map(([who, g]) => (
                          <div key={who} className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#b88a2c]">{who}</p>
                            <p className="mx-auto mt-1 max-w-[18rem] text-sm text-[#3b2a26]/80">{g.text}</p>
                            <ul className="mt-3 flex justify-center gap-2.5">
                              {g.photos.map((ph) => (
                                <li key={ph} className="relative h-36 w-[4.5rem] overflow-hidden rounded-md bg-white p-1 shadow-md ring-1 ring-black/5 md:h-40 md:w-20">
                                  <div className="relative h-full w-full overflow-hidden rounded-[3px]">
                                    <Image src={`/dress/${ph}.webp`} alt={`${d.event} outfit idea for ${who.toLowerCase()}`} fill sizes="80px" className="object-cover object-top" loading="lazy" />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 pb-28 pt-20 md:pb-48 md:pt-28" aria-labelledby="f-h">
          <Reveal className="text-center">
            <Eyebrow>Questions you may have</Eyebrow>
            <h2 id="f-h" className="fd mb-8 mt-3 text-4xl uppercase tracking-wide md:text-5xl">
              Good to know
            </h2>
          </Reveal>
          <div className="divide-y divide-[var(--ink)]/15 border-y border-[var(--ink)]/15">
            {invite.faq.map((f, fi) => (
              <Reveal key={f.q} from="flip" delay={fi * 0.1}>
              <details className="group">
                <summary className="fd flex cursor-pointer list-none items-center justify-between py-5 text-2xl md:text-3xl">
                  {f.q}
                  <span className="ml-4 text-[var(--gold)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-5 text-[var(--ink)]/75">{f.a}</p>
              </details>
              </Reveal>
            ))}
          </div>
        </section>

        <CoupleFooter />
      </main>
    </Smooth>
  );
}
