import Image from "next/image";
import Link from "next/link";

import { categoryLabel, formatPrice, type Tour } from "@/lib/tours";

export function ArrowButton() {
  return (
    <span className="liquid-glass-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:scale-110">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </span>
  );
}

type Props = {
  tour: Tour;
  /** Voor de eerste kaarten boven de vouw. */
  priority?: boolean;
  sizes?: string;
};

export default function TourCard({
  tour,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: Props) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-jungle-deep sm:aspect-[4/3.6]"
    >
      <Image
        src={tour.image}
        alt={tour.imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${
          tour.imagePosition ?? ""
        }`}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5"
      />

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className="liquid-glass-btn rounded-full px-3 py-1 text-xs font-semibold text-white">
          {categoryLabel(tour.category)}
        </span>
        {tour.popular && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            Populair
          </span>
        )}
      </div>

      <div className="relative p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">
          {tour.region} · {tour.duration}
        </p>
        <h3 className="mt-1.5 text-balance text-xl font-semibold leading-snug text-white">
          {tour.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/75">{tour.short}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-white/80">
            vanaf{" "}
            <span className="text-base font-semibold text-white">
              {formatPrice(tour)}
            </span>
          </p>
          <ArrowButton />
        </div>
      </div>
    </Link>
  );
}
