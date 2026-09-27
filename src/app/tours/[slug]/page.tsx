import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { WhatsAppIcon } from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import TourCard from "@/components/TourCard";
import { creditFor } from "@/lib/photo-credits";
import { breadcrumbSchema, pageMetadata, tourSchema } from "@/lib/seo";
import { GUIDE_NAME, MAX_GUESTS } from "@/lib/site";
import {
  TOURS,
  categoryLabel,
  inbegrepenVan,
  nietInbegrepenVan,
  relatedTours,
  tourBySlug,
} from "@/lib/tours";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TOURS.map((tour) => ({ slug: tour.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour) return {};
  const credit = creditFor(tour.image);
  return pageMetadata({
    title: `${tour.title} | Privétour met gids`,
    description: `${tour.short}. ${tour.duration}, ${tour.region}. Privétour met gids en chauffeur ${GUIDE_NAME}, ophalen bij je verblijf. Bekijk het programma en de tips.`,
    path: `/tours/${tour.slug}`,
    keywords: [tour.title, `${tour.region} tour`, "Bali privétour", ...tour.highlights.slice(0, 3)],
    image: credit
      ? { url: tour.image, width: credit.width, height: credit.height, alt: tour.imageAlt }
      : undefined,
  });
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function TourPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour) notFound();

  const path = `/tours/${tour.slug}`;
  const related = relatedTours(tour, 3);
  const whatsappMessage = `Hoi ${GUIDE_NAME}, ik wil graag de tour "${tour.title}" boeken.\nDatum: …\nAantal personen: …\nWaar we verblijven: …`;

  return (
    <>
      <Header />
      <main className="flex-1">
        <article>
          <section className="pb-6 pt-[8.5rem] sm:pt-36">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Breadcrumbs
                trail={[
                  { name: "Tours", path: "/tours" },
                  { name: tour.title, path },
                ]}
              />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {categoryLabel(tour.category)} · {tour.region}
              </p>
              <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {tour.title}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">{tour.short}</p>

              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl bg-jungle-deep sm:aspect-[21/9]">
                <Image
                  src={tour.image}
                  alt={tour.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className={`object-cover ${tour.imagePosition ?? ""}`}
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                  <span className="liquid-glass-btn rounded-full px-3 py-1 text-xs font-semibold text-white">
                    {tour.duration}
                  </span>
                  {tour.popular && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                      Populair
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 sm:py-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:gap-14">
              <div className="space-y-12 lg:col-span-2">
                <div className="space-y-4 text-pretty leading-relaxed text-muted">
                  {tour.intro.map((paragraph) => (
                    <p key={paragraph} className="text-base sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Hoogtepunten
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {tour.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Programma van de dag
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Een voorbeeld; de tijden en de volgorde passen we samen aan.
                  </p>
                  <ol className="mt-5 space-y-0">
                    {tour.programma.map((step, index) => {
                      const [time, ...rest] = step.split(" · ");
                      const text = rest.join(" · ");
                      return (
                        <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
                          {index < tour.programma.length - 1 && (
                            <span aria-hidden className="absolute left-[3.35rem] top-7 h-[calc(100%-0.75rem)] w-px bg-jungle/15" />
                          )}
                          <span className="w-[4.25rem] shrink-0 pt-1 text-sm font-semibold tabular-nums text-accent">
                            {time}
                          </span>
                          <span className="relative mt-[0.45rem] h-2.5 w-2.5 shrink-0 -translate-x-[0.85rem] rounded-full border-2 border-accent bg-background" />
                          <span className="-ml-2 text-foreground">{text || time}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-6">
                    <h3 className="font-semibold text-foreground">Inbegrepen</h3>
                    <ul className="mt-3 space-y-2.5">
                      {inbegrepenVan(tour).map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                          <CheckIcon className="mt-1 shrink-0 text-ocean" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-white p-6">
                    <h3 className="font-semibold text-foreground">Niet inbegrepen</h3>
                    <ul className="mt-3 space-y-2.5">
                      {nietInbegrepenVan(tour).map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden className="mt-1 shrink-0 text-muted/60">
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="liquid-glass rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Goed om te weten
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {tour.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {tip}
                      </li>
                    ))}
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        <strong className="font-semibold text-foreground">Beste tijd:</strong>{" "}
                        {tour.bestTime}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="rounded-3xl bg-jungle-deep p-6 text-white lg:sticky lg:top-28 sm:p-7">
                  <p className="text-sm text-white/70">Prijs op aanvraag</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    Vraag {GUIDE_NAME} naar de mogelijkheden
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Eén prijs voor de hele auto (tot {MAX_GUESTS} personen),
                    afgestemd op jullie programma. Entreegelden en maaltijden
                    betaal je ter plekke.
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Duur</dt>
                      <dd className="text-right font-medium">{tour.duration}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Regio</dt>
                      <dd className="text-right font-medium">{tour.region}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Ophalen</dt>
                      <dd className="text-right font-medium">Bij je verblijf</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Groep</dt>
                      <dd className="text-right font-medium">Privé, max. {MAX_GUESTS} pers.</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    data-contact
                    data-message={whatsappMessage}
                    className="btn-squeeze mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white hover:brightness-105"
                  >
                    <WhatsAppIcon size={18} />
                    Contact via WhatsApp
                  </button>
                  <Link
                    href={`/contact?tour=${encodeURIComponent(tour.title)}`}
                    className="btn-squeeze mt-3 inline-flex h-12 w-full items-center justify-center rounded-full border border-white/25 px-6 text-base font-semibold text-white hover:bg-white/10"
                  >
                    Stel een vraag
                  </Link>
                  <p className="mt-4 text-center text-xs text-white/55">
                    Kosteloos annuleren tot 24 uur van tevoren.
                  </p>
                </div>
              </aside>
            </div>
          </section>
        </article>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Ook <span className="accent-serif text-accent">leuk</span>
              </h2>
              <Link href="/tours" className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">
                Alle tours
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <TourCard tour={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        nodes={[
          tourSchema(tour),
          breadcrumbSchema([
            { name: "Tours", path: "/tours" },
            { name: tour.title, path },
          ]),
        ]}
      />
    </>
  );
}
