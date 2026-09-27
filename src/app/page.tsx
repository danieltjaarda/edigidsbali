import Link from "next/link";

import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HoeWerktHet from "@/components/HoeWerktHet";
import JsonLd from "@/components/JsonLd";
import OverEdi from "@/components/OverEdi";
import PraktischeTips from "@/components/PraktischeTips";
import RijstveldenBand from "@/components/RijstveldenBand";
import TourGrid from "@/components/TourGrid";
import Usps from "@/components/Usps";
import { FAQ } from "@/lib/faq";
import { faqSchema, tourListSchema } from "@/lib/seo";
import { GUIDE_NAME } from "@/lib/site";
import { TOURS } from "@/lib/tours";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Usps />

        <section id="tours" className="scroll-mt-24 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  De populairste tours van{" "}
                  <span className="accent-serif text-accent">Bali</span>
                </h2>
                <p className="mt-4 text-pretty text-muted">
                  Van de zonsopgang op de Mount Batur tot snorkelen met manta&apos;s:
                  {" "}{TOURS.length} dagtours, elk aan te passen aan jullie
                  tempo. Klik op een tour voor het programma, de richtprijs en
                  wat je moet meenemen.
                </p>
              </div>
              <Link
                href="/tours"
                className="btn-squeeze inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-jungle/20 px-6 text-sm font-semibold text-foreground hover:bg-jungle/5"
              >
                Alle tours op één pagina
              </Link>
            </div>

            <div className="mt-8">
              <TourGrid tours={TOURS} />
            </div>
          </div>
        </section>

        <RijstveldenBand />
        <HoeWerktHet />
        <OverEdi />
        <PraktischeTips />
        <Faq
          items={FAQ}
          intro={`Wat reizigers ${GUIDE_NAME} het vaakst vragen voordat ze boeken. Staat je vraag er niet bij? Stuur een WhatsApp.`}
        />
        <CtaBand />
      </main>
      <Footer />
      <JsonLd nodes={[tourListSchema(TOURS), faqSchema(FAQ)]} />
    </>
  );
}
