"use client";

import { LogoMark } from "@/components/Logo";
import { GUIDE_NAME } from "@/lib/site";
import { useInView } from "@/lib/useInView";

const steps = [
  {
    title: "Kies je tour",
    text: `Kies een tour uit de lijst, of vertel ${GUIDE_NAME} wat je graag wilt zien. Elke tour is een voorbeeld en volledig aan te passen.`,
  },
  {
    title: "Stuur een WhatsApp",
    text: "Datum, verblijfplaats en aantal personen is genoeg. Je krijgt snel een bevestiging met de ophaaltijd en de prijs.",
  },
  {
    title: `${GUIDE_NAME} haalt je op`,
    text: "Op de afgesproken tijd staat de auto met airco voor de deur van je hotel, villa of homestay.",
  },
  {
    title: "Geniet van de dag",
    text: `${GUIDE_NAME} regelt tickets, parkeren, sarongs en de lunchplek met uitzicht. Jij hoeft alleen maar te kijken.`,
  },
];

export default function HoeWerktHet() {
  const { ref: headingRef, inView: headingInView } =
    useInView<HTMLDivElement>(0.25);
  const { ref: listRef, inView } = useInView<HTMLOListElement>(0.25);

  return (
    <section id="hoe-werkt-het" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={headingRef}
          className={`max-w-xl ${
            headingInView
              ? "translate-y-0 opacity-100 transition-all duration-700 ease-out"
              : "translate-y-6 opacity-0 transition-none"
          }`}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Zo werkt een dag met{" "}
            <span className="accent-serif text-accent">{GUIDE_NAME}</span>
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Vier stappen van een idee tot een dag waar je nog lang over
            napraat.
          </p>
        </div>

        <ol
          ref={listRef}
          className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            aria-hidden
            className={`absolute left-8 right-8 top-[41px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-accent/60 via-gold/40 to-accent/60 lg:block ${
              inView
                ? "scale-x-100 transition-transform duration-[1400ms] ease-out"
                : "scale-x-0 transition-none"
            }`}
          />

          {steps.map((step, i) => (
            <li
              key={step.title}
              style={{ transitionDelay: inView ? `${200 + i * 140}ms` : "0ms" }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white px-6 py-6 hover:-translate-y-1.5 ${
                inView
                  ? "translate-y-0 opacity-100 transition-all duration-700 ease-out"
                  : "translate-y-8 opacity-0 transition-none"
              }`}
            >
              <LogoMark
                tone="dark"
                className="pointer-events-none absolute -bottom-5 -right-5 w-28 select-none opacity-[0.05]"
              />
              <span
                style={{ transitionDelay: inView ? `${350 + i * 140}ms` : "0ms" }}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent group-hover:scale-110 ${
                  inView
                    ? "scale-100 opacity-100 transition-all duration-500 ease-out"
                    : "scale-0 opacity-0 transition-none"
                }`}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
