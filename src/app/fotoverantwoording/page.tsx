import type { Metadata } from "next";
import Image from "next/image";

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { PHOTO_CREDITS } from "@/lib/photo-credits";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { GUIDE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fotoverantwoording",
  description:
    "Overzicht van de fotografen en licenties van de foto's op Edigidsbali. Alle foto's komen van Wikimedia Commons en zijn vrij te gebruiken met naamsvermelding.",
  path: "/fotoverantwoording",
});

export default function FotoverantwoordingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pb-16 pt-[8.5rem] sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Breadcrumbs trail={[{ name: "Fotoverantwoording", path: "/fotoverantwoording" }]} />
            <h1 className="mt-6 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Foto<span className="accent-serif text-accent">verantwoording</span>
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-muted">
              De video&apos;s en de foto bij &apos;Over {GUIDE_NAME}&apos; zijn van {GUIDE_NAME} zelf. De foto&apos;s van
              de tours zijn gemaakt door reizigers en fotografen die hun werk
              via Wikimedia Commons hebben gedeeld onder een Creative
              Commons-licentie. Hieronder staat per foto wie hem maakte en onder
              welke voorwaarden hij gebruikt mag worden. Dank aan alle makers.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PHOTO_CREDITS.map((credit) => (
                <li
                  key={credit.file}
                  className="flex gap-4 rounded-3xl bg-white p-3"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl bg-sand">
                    <Image
                      src={credit.file}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 py-1 text-sm">
                    <p className="truncate font-semibold text-foreground" title={credit.title}>
                      {credit.title.replace(/\.(jpe?g|png)$/i, "")}
                    </p>
                    <p className="mt-1 text-muted">
                      Foto: <span className="text-foreground">{credit.author}</span>
                    </p>
                    <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                      {credit.licenseUrl ? (
                        <a
                          href={credit.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer license"
                          className="underline underline-offset-2 hover:text-foreground"
                        >
                          {credit.license}
                        </a>
                      ) : (
                        <span>{credit.license}</span>
                      )}
                      <a
                        href={credit.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        Bron op Wikimedia Commons
                      </a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        nodes={[
          breadcrumbSchema([{ name: "Fotoverantwoording", path: "/fotoverantwoording" }]),
        ]}
      />
    </>
  );
}
