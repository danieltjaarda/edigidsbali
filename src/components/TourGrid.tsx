"use client";

import { useState } from "react";

import TourCard from "@/components/TourCard";
import { CATEGORIES, type Category, type Tour } from "@/lib/tours";

type Filter = Category | "alle";

type Props = {
  tours: Tour[];
  /** Laadt de eerste kaarten met prioriteit (alleen als de grid boven de vouw staat). */
  eager?: boolean;
};

/** Tourkaarten met filterknoppen per categorie. Zonder JavaScript staan alle tours in de HTML. */
export default function TourGrid({ tours, eager = false }: Props) {
  const [active, setActive] = useState<Filter>("alle");

  const counts = CATEGORIES.map((c) => ({
    ...c,
    count: tours.filter((t) => t.category === c.id).length,
  })).filter((c) => c.count > 0);

  const visible =
    active === "alle" ? tours : tours.filter((t) => t.category === active);

  const chip = (selected: boolean) =>
    `btn-squeeze inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
      selected
        ? "bg-jungle text-white"
        : "border border-jungle/15 bg-white/70 text-foreground hover:bg-white"
    }`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter tours op categorie"
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          aria-pressed={active === "alle"}
          onClick={() => setActive("alle")}
          className={chip(active === "alle")}
        >
          Alle tours
          <span className={`rounded-full px-1.5 text-xs ${active === "alle" ? "bg-white/20" : "bg-jungle/10 text-muted"}`}>
            {tours.length}
          </span>
        </button>
        {counts.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
            className={chip(active === c.id)}
          >
            {c.label}
            <span className={`rounded-full px-1.5 text-xs ${active === c.id ? "bg-white/20" : "bg-jungle/10 text-muted"}`}>
              {c.count}
            </span>
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tour, index) => (
          <li key={tour.slug}>
            <TourCard tour={tour} priority={eager && index < 3} />
          </li>
        ))}
      </ul>
    </div>
  );
}
