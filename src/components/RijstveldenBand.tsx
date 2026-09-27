import Link from "next/link";

import LazyVideo from "@/components/LazyVideo";

/**
 * Volle-breedte band met de dronevideo van de rijstvelden. De video laadt pas
 * als de sectie bijna in beeld is en speelt gedempt in een lus.
 */
export default function RijstveldenBand() {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-3xl bg-jungle-deep sm:min-h-[600px]">
          <LazyVideo
            src="/videos/baliweiland.mp4"
            poster="/images/weiland-poster.jpg"
            ariaLabel="Dronebeelden van rijstterrassen op Bali"
            posterSizes="(max-width: 1152px) 100vw, 1152px"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-jungle-deep/90 via-jungle-deep/30 to-transparent"
          />
          <div className="relative grid grid-cols-1 gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-shadow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Het groene hart van Bali
              </p>
              <h2 className="text-shadow mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Rijstvelden zo ver je{" "}
                <span className="accent-serif text-accent">kijkt</span>
              </h2>
              <p className="text-shadow mt-4 max-w-md text-pretty text-white/85">
                Al duizend jaar delen Balinese boeren het water via de subak,
                een irrigatiesysteem dat door de tempels wordt beheerd en op de
                UNESCO-lijst staat. Vanuit de lucht zie je waarom.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/tours/jatiluwih"
                className="liquid-glass-btn btn-squeeze inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold text-white"
              >
                Jatiluwih-terrassen
              </Link>
              <Link
                href="/tours/sidemen-vallei"
                className="liquid-glass-btn btn-squeeze inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold text-white"
              >
                Sidemen-vallei
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
