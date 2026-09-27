"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Meldt (eenmalig) of een element in beeld is, voor binnenkom-animaties.
 *
 * Begint op `true`: op de server en vóór hydratie is alles gewoon zichtbaar,
 * zodat de pagina ook compleet is zonder of vóór JavaScript. Pas na hydratie
 * verbergen we wat nog onder de vouw staat, en laten we dat verschijnen zodra
 * het in beeld scrollt. Bij prefers-reduced-motion animeren we niet.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Staat het element al (deels) in beeld? Dan niets verbergen.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
