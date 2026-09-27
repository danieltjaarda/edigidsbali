"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** Imagen fija visible desde el primer momento; el vídeo se superpone en cuanto empieza a reproducirse. */
  poster: string;
  className?: string;
  ariaLabel?: string;
  /** Véase el atributo sizes de next/image; el valor por defecto encaja con una tarjeta a ancho completo. */
  posterSizes?: string;
};

/**
 * Vídeo que solo empieza a cargarse cuando está a punto de entrar en pantalla,
 * solo se reproduce cuando es visible de verdad y se pausa al salir de pantalla.
 * Sin JavaScript, o si el navegador bloquea la reproducción automática, se
 * mantiene el póster.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  ariaLabel,
  posterSizes = "(max-width: 1024px) 100vw, 58vw",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-label={ariaLabel} role={ariaLabel ? "img" : undefined}>
      <Image
        src={poster}
        alt=""
        aria-hidden
        fill
        sizes={posterSizes}
        className={className}
      />
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={className}
          style={{
            opacity: playing ? 1 : 0,
            transition:
              "opacity 500ms ease, scale 700ms ease-out, transform 700ms ease-out",
          }}
        />
      )}
    </div>
  );
}
