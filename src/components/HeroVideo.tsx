"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

type Props = {
  /** Vídeo para tablet y escritorio. */
  src: string;
  /** Recorte vertical más pequeño para móviles; si falta, se usa src. */
  mobileSrc?: string;
  /** Primer fotograma de src; se muestra de inmediato y se queda si el vídeo no arranca. */
  poster: string;
  /** Primer fotograma de mobileSrc, para que póster y vídeo tengan el mismo encuadre en móviles. */
  mobilePoster?: string;
  className?: string;
  /** En móviles, muestra un pequeño indicador de carga abajo a la derecha hasta que el vídeo se reproduce. */
  loadingIndicator?: boolean;
};

const MOBILE = "(max-width: 767px)";
const DESKTOP = "(min-width: 768px)";
const DESKTOP_SIZES = "(max-width: 1152px) 100vw, 1152px";

/**
 * Vídeo de cabecera que solo empieza a descargarse cuando la página ya ha
 * cargado, para no competir con el texto, las fuentes y las imágenes. En
 * móviles esperamos además a que el navegador esté inactivo; preload se queda
 * en metadata para que no llegue el archivo entero de golpe. El póster es una
 * imagen normal (optimizada y precargada, con el encuadre adecuado por
 * breakpoint); el vídeo solo se superpone cuando ya se está reproduciendo. Si
 * iOS rechaza el autoplay (modo de bajo consumo) o el visitante prefiere menos
 * movimiento, el póster simplemente se queda.
 */
export default function HeroVideo({
  src,
  mobileSrc,
  poster,
  mobilePoster,
  className,
  loadingIndicator = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const desktopImg = getImageProps({
    src: poster,
    alt: "",
    fill: true,
    sizes: DESKTOP_SIZES,
    loading: "eager",
    fetchPriority: "high",
  }).props;
  const mobileImg = mobilePoster
    ? getImageProps({ src: mobilePoster, alt: "", fill: true, sizes: "100vw" })
        .props
    : null;

  // Precarga el póster como imagen LCP; por breakpoint solo la variante que se muestra.
  preload(desktopImg.src, {
    as: "image",
    imageSrcSet: desktopImg.srcSet,
    imageSizes: desktopImg.sizes,
    fetchPriority: "high",
    media: mobileImg ? DESKTOP : undefined,
  });
  if (mobileImg) {
    preload(mobileImg.src, {
      as: "image",
      imageSrcSet: mobileImg.srcSet,
      imageSizes: mobileImg.sizes,
      fetchPriority: "high",
      media: MOBILE,
    });
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let started = false;
    let idleId = 0;
    let fallbackId = 0;
    const start = () => {
      if (started) return;
      started = true;
      const mobile = Boolean(mobileSrc && window.matchMedia(MOBILE).matches);
      setVideoSrc(mobile ? mobileSrc! : src);
    };

    const afterIdle = () => {
      // Comprobación con typeof en lugar de `"in" window`: si no, TypeScript trata
      // la rama else como inalcanzable (requestIdleCallback está en los tipos DOM).
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 4000 });
      } else {
        fallbackId = window.setTimeout(start, 800);
      }
    };

    // Op mobiel: kort na hydratie starten, met een vangnet van 1,5 s. Wachten op
    // het load-event (zoals eerst) liet de video op telefoons soms nooit starten.
    const mobile = window.matchMedia(MOBILE).matches;
    if (mobile) {
      if (document.readyState === "complete") {
        afterIdle();
      } else {
        window.addEventListener("load", afterIdle, { once: true });
      }
      const safety = window.setTimeout(start, 1500);
      return () => {
        window.removeEventListener("load", afterIdle);
        if (idleId && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        }
        window.clearTimeout(fallbackId);
        window.clearTimeout(safety);
      };
    }

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    const timer = window.setTimeout(start, 1500);
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, [src, mobileSrc]);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;
    // El autoplay puede rechazarse (p. ej. modo de bajo consumo); entonces se queda el póster.
    video.play().catch(() => {});
  }, [videoSrc]);

  return (
    <>
      <picture className="contents">
        {mobileImg && (
          <source
            media={MOBILE}
            srcSet={mobileImg.srcSet}
            sizes={mobileImg.sizes}
          />
        )}
        <img {...desktopImg} alt="" aria-hidden className={className} />
      </picture>
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
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
      {loadingIndicator && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-opacity duration-500 motion-reduce:hidden md:hidden"
          style={{ opacity: playing ? 0 : 1 }}
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}
    </>
  );
}
