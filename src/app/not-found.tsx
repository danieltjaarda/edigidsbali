import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { POPULAR_TOURS } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description:
    "Deze pagina bestaat niet of is verhuisd. Bekijk de tours of neem direct contact op.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pb-16 pt-[9rem] sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              404
            </p>
            <h1 className="mt-4 max-w-xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Deze weg loopt dood bij een{" "}
              <span className="accent-serif text-accent">rijstveld</span>
            </h1>
            <p className="mt-4 max-w-md text-pretty text-muted">
              De pagina bestaat niet of is verhuisd. Kies een tour of ga terug
              naar de homepage.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="btn-squeeze inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-white hover:brightness-110"
              >
                Naar de homepage
              </Link>
              {POPULAR_TOURS.slice(0, 4).map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="btn-squeeze inline-flex h-12 items-center justify-center rounded-full border border-jungle/20 px-6 text-base font-semibold text-foreground hover:bg-jungle/5"
                >
                  {tour.title.split(":")[0]}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
