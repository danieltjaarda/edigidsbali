import Link from "next/link";

import { WhatsAppIcon } from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import { CTA_LABEL, CTA_MESSAGE, GUIDE_NAME, MAX_GUESTS } from "@/lib/site";
import { TOURS } from "@/lib/tours";

const facts = [
  `${TOURS.length} tours als inspiratie, alles aanpasbaar`,
  "Privé: alleen jullie in de auto",
  "Ophalen bij je verblijf",
  `Tot ${MAX_GUESTS} personen per auto`,
];

/**
 * Volledige-schermhero met de dronevideo van Edi als achtergrond. De video
 * speelt gedempt in een lus; HeroVideo toont eerst het posterbeeld en laadt
 * de video pas als de pagina klaar is.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-jungle-deep">
      <div aria-hidden className="slow-zoom absolute inset-0">
        <HeroVideo
          src="/videos/eddietours.mp4"
          poster="/images/hero-poster.jpg"
          loadingIndicator
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-jungle-deep via-jungle-deep/35 to-jungle-deep/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-jungle-deep/60 via-transparent to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-40 sm:px-6 sm:pb-20">
        <p className="text-shadow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          100% Nederlandssprekend
        </p>
        <h1 className="text-shadow mt-4 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Ontdek het échte Bali, met{" "}
          <span className="accent-serif text-accent">{GUIDE_NAME}</span> achter
          het stuur.
        </h1>
        <p className="text-shadow mt-5 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
          Tempels, rijstvelden, watervallen en eilanden: jij vertelt wat je
          wilt zien, {GUIDE_NAME} maakt er in het Nederlands een dagprogramma
          van. Met ophalen bij je verblijf en één prijs per auto.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-contact
            data-message={CTA_MESSAGE}
            className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-semibold text-white hover:brightness-110"
          >
            <WhatsAppIcon size={18} />
            {CTA_LABEL}
          </button>
          <Link
            href="#tours"
            className="liquid-glass-btn btn-squeeze inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold text-white"
          >
            Bekijk de tours voor inspiratie
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#tours"
        aria-label="Scroll naar de tours"
        className="scroll-hint absolute bottom-6 right-6 hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white/10 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14m0 0-6-6m6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
