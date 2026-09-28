"use client";

import Image from "next/image";
import { useState } from "react";

import { GUIDE_NAME } from "@/lib/site";

const VIDEO_ID = "IZ5TP73aBQ8";

/**
 * Introductievideo van Edi op YouTube. De speler wordt pas geladen als de
 * bezoeker op afspelen klikt: tot die tijd staat er alleen een stilstaand
 * beeld, zodat de pagina snel blijft en YouTube geen cookies plaatst.
 */
export default function IntroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="introductie" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-end">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Introductie
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Maak kennis met{" "}
              <span className="accent-serif text-accent">{GUIDE_NAME}</span>
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-muted">
              In deze korte video stelt {GUIDE_NAME} zich voor: wie hij is, hoe
              een dag met hem op Bali eruitziet en waarom je het eiland het
              best ontdekt met iemand die er is opgegroeid. Gewoon in het
              Nederlands, zodat je meteen weet met wie je op pad gaat.
            </p>
          </div>
          <p className="text-sm text-muted lg:text-right">
            Kijk eerst de video, stel daarna in een paar minuten je programma
            samen via WhatsApp.
          </p>
        </div>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-jungle-deep shadow-[0_24px_60px_rgba(15,43,34,0.25)]">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&hl=nl`}
              title={`Introductievideo van ${GUIDE_NAME}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Speel de introductievideo van ${GUIDE_NAME} af`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src="/images/intro-video-poster.jpg"
                alt=""
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-jungle-deep/85 via-jungle-deep/20 to-jungle-deep/10"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="liquid-glass-btn flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="ml-1"
                  >
                    <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
                  </svg>
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-6 text-left sm:p-8">
                <span>
                  <span className="text-shadow block text-xl font-semibold text-white sm:text-2xl">
                    {GUIDE_NAME} stelt zich voor
                  </span>
                  <span className="text-shadow mt-1 block text-sm text-white/75">
                    Klik om de video af te spelen
                  </span>
                </span>
                <span className="liquid-glass-btn rounded-full px-4 py-2 text-sm font-semibold text-white">
                  Introductievideo
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
