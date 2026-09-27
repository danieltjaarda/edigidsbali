import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import TourGrid from "@/components/TourGrid";
import { breadcrumbSchema, pageMetadata, tourListSchema } from "@/lib/seo";
import { GUIDE_NAME } from "@/lib/site";
import { TOURS } from "@/lib/tours";

export const metadata: Metadata = pageMetadata({
  title: `Alle tours op Bali | ${TOURS.length} privé dagtours met gids`,
  description: `Overzicht van alle ${TOURS.length} privétours van Edigidsbali: tempels, rijstvelden, watervallen, Nusa Penida, snorkelen en familietours. Met programma en tips per tour.`,
  path: "/tours",
  keywords: [
    "Bali tours",
    "Bali dagtour",
    "privé chauffeur Bali",
    "Bali gids Nederlands",
    "Nusa Penida tour",
    "Ubud tour",
  ],
});

export default function ToursPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pb-8 pt-[8.5rem] sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Breadcrumbs trail={[{ name: "Tours", path: "/tours" }]} />
            <h1 className="mt-6 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Alle tours op{" "}
              <span className="accent-serif text-accent">Bali</span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-muted">
              {TOURS.length} dagtours met {GUIDE_NAME} als gids en chauffeur.
              Filter op wat jij leuk vindt, of combineer twee tours tot een
              eigen dag. Vraag {GUIDE_NAME} via WhatsApp naar de prijs voor
              jullie programma.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <TourGrid tours={TOURS} eager />
          </div>
        </section>

        <CtaBand
          title={
            <>
              Iets anders in{" "}
              <span className="accent-serif text-accent">gedachten</span>?
            </>
          }
          text={`Elke tour is een voorbeeld. Vertel ${GUIDE_NAME} wat je wilt zien en hij maakt er een dag van.`}
        />
      </main>
      <Footer />
      <JsonLd
        nodes={[
          tourListSchema(TOURS),
          breadcrumbSchema([{ name: "Tours", path: "/tours" }]),
        ]}
      />
    </>
  );
}
