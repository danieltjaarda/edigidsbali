import Image from "next/image";
import Link from "next/link";

import { GUIDE_NAME, MAX_GUESTS, WHATSAPP_DEFAULT } from "@/lib/site";

/**
 * TODO: laat Edi deze tekst nalezen en aanpassen. Het is een voorzet op basis
 * van wat de meeste privégidsen op Bali bieden; details als talen, jaren
 * ervaring en herkomst moeten kloppen voordat de site live gaat.
 */
const facts = [
  "Geboren en getogen op Bali",
  "Eigen auto met airco",
  "Spreekt Engels en Indonesisch",
  `Maximaal ${MAX_GUESTS} personen`,
];

export default function OverEdi() {
  return (
    <section id="over-edi" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative pb-10 pr-6 sm:pr-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/over-edi.jpg"
                alt={`Gast van ${GUIDE_NAME} in een roze jurk op de Bali Swing, hoog boven de jungle en de rivier bij Ubud`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-32 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:w-52">
              <Image
                src="/images/weiland-poster.jpg"
                alt="Rijstterrassen vanuit de lucht"
                width={1440}
                height={792}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Over {GUIDE_NAME}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Een gids die Bali kent zoals jij je{" "}
              <span className="accent-serif text-accent">eigen buurt</span>
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              {GUIDE_NAME} groeide op tussen de rijstvelden van Bali en rijdt al
              jaren reizigers rond over zijn eiland. Hij weet welke tempel je
              het best om zeven uur &apos;s ochtends bezoekt, waar de warung met de
              beste nasi campur zit en welke weg je neemt als de hoofdweg vol
              staat.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              Geen strak schema, wel een plan. Onderweg vertelt hij over de
              ceremonies, de offers en het dagelijks leven, en hij past de dag
              aan als jullie liever langer op een strand blijven hangen. Zo
              voelt een tour minder als een excursie en meer als een dag uit
              met een vriend die toevallig alles weet.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-foreground sm:grid-cols-2">
              {facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-squeeze inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-white hover:brightness-110"
              >
                Stuur {GUIDE_NAME} een berichtje
              </a>
              <Link
                href="/tours"
                className="btn-squeeze inline-flex h-12 items-center justify-center rounded-full border border-jungle/20 px-8 text-base font-semibold text-foreground hover:bg-jungle/5"
              >
                Bekijk de tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
