import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { WhatsAppIcon } from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import {
  EMAIL,
  GUIDE_NAME,
  PHONE_DISPLAY,
  PICKUP_AREAS,
  WHATSAPP_DEFAULT,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Contact | Boek een tour met ${GUIDE_NAME}`,
  description: `Stuur ${GUIDE_NAME} een WhatsApp of gebruik het formulier om een privétour op Bali te boeken of een eigen route samen te stellen. Reactie meestal binnen een dag.`,
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const { tour } = await searchParams;
  const defaultMessage = tour
    ? `Hoi ${GUIDE_NAME}, ik heb een vraag over de tour "${tour}".\n\nDatum: \nAantal personen: \nWaar we verblijven: \n\nVraag: `
    : undefined;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pb-16 pt-[8.5rem] sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
              <div className="lg:col-span-2">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Boek je dag met{" "}
                  <span className="accent-serif text-accent">{GUIDE_NAME}</span>
                </h1>
                <p className="mt-4 text-pretty text-muted">
                  WhatsApp is het snelst en het handigst, ook onderweg op Bali.
                  Stuur je reisdatum, waar je verblijft, met hoeveel personen je
                  bent en wat je graag wilt zien. {GUIDE_NAME} reageert meestal
                  binnen een paar uur.
                </p>

                <a
                  href={WHATSAPP_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-squeeze mt-7 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-base font-semibold text-white hover:brightness-105"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp {GUIDE_NAME}
                </a>

                <dl className="mt-10 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">WhatsApp / telefoon</dt>
                    <dd className="mt-1 text-muted">{PHONE_DISPLAY}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">E-mail</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${EMAIL}`} className="text-muted transition-colors hover:text-accent">
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Tijdsverschil</dt>
                    <dd className="mt-1 text-muted">
                      Bali loopt 6 uur (zomertijd) tot 7 uur (wintertijd) voor op
                      Nederland. Een berichtje &apos;s avonds wordt &apos;s ochtends gelezen.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Gratis ophalen in</dt>
                    <dd className="mt-1 text-muted">{PICKUP_AREAS.join(", ")}. Andere plaatsen in overleg.</dd>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-3">
                <ContactForm defaultMessage={defaultMessage} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd nodes={[breadcrumbSchema([{ name: "Contact", path: "/contact" }])]} />
    </>
  );
}
