"use client";

import { useCallback, useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/Header";
import {
  GUIDE_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_DEFAULT,
  whatsappLink,
} from "@/lib/site";

const FADE_MS = 300;

/**
 * WhatsApp-pop-up die in- en uitfadet. Opent bij een klik op:
 * - elk element met `data-contact` (optioneel `data-message` voor een
 *   vooraf ingevuld bericht), bv. de contactknop naast elke prijs;
 * - elke tel:-link.
 * Werkt ook binnen een <Link>: de klik wordt in de capture-fase
 * onderschept, zodat de kaart zelf niet opent.
 */
export default function ContactModal() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const open = useCallback((msg?: string | null) => {
    setMessage(msg ?? null);
    setMounted(true);
    // Eerst renderen in de beginstand, dan pas de eindstand: anders is er geen overgang.
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setMounted(false), FADE_MS);
  }, []);

  useEffect(() => {
    function trigger(target: EventTarget | null, e: Event) {
      const el = target as HTMLElement | null;
      if (!el?.closest || el.closest("[data-contact-modal]")) return false;
      const contact = el.closest<HTMLElement>("[data-contact]");
      if (contact) {
        e.preventDefault();
        e.stopPropagation();
        open(contact.getAttribute("data-message"));
        return true;
      }
      const tel = el.closest('a[href^="tel:"]');
      if (tel) {
        e.preventDefault();
        e.stopPropagation();
        open();
        return true;
      }
      return false;
    }
    const onClick = (e: MouseEvent) => {
      trigger(e.target, e);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("[data-contact]") && el.tagName !== "BUTTON" && el.tagName !== "A") {
        trigger(el, e);
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted, close]);

  if (!mounted) return null;

  const href = message ? whatsappLink(message) : WHATSAPP_DEFAULT;

  return (
    <div
      data-contact-modal
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Sluiten"
        onClick={close}
        style={{ transitionDuration: `${FADE_MS}ms` }}
        className={`absolute inset-0 bg-jungle-deep/60 transition-opacity ease-out md:backdrop-blur-sm ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`WhatsApp ${GUIDE_NAME}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
        className={`relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl transition-all ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Sluiten"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-sand hover:text-foreground"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366]">
          <WhatsAppIcon size={28} />
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          WhatsApp met{" "}
          <span className="accent-serif text-accent">{GUIDE_NAME}</span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Stuur {GUIDE_NAME} een berichtje met je reisdatum, je verblijfplaats
          en het aantal personen. Hij reageert meestal binnen een paar uur
          (op Bali is het 6 tot 7 uur later dan in Nederland).
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white hover:brightness-105"
          >
            <WhatsAppIcon size={18} />
            Open WhatsApp
          </a>
          <a
            href={PHONE_TEL}
            className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-jungle/20 px-6 text-base font-semibold text-foreground hover:bg-sand"
          >
            Bel {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Of stuur een e-mail via het{" "}
          <a href="/contact" onClick={close} className="underline underline-offset-2 hover:text-foreground">
            contactformulier
          </a>
          .
        </p>
      </div>
    </div>
  );
}
