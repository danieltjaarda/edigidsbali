"use client";

import { useEffect, useState } from "react";

import { GUIDE_NAME, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DEFAULT } from "@/lib/site";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m2 7 10 7L22 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Onderschept elke klik op een tel:-link en toont in plaats daarvan een
 * keuzevenster: WhatsApp, bellen of het formulier. Op Bali is WhatsApp de
 * gangbare manier van contact, bellen vanuit Nederland is duur.
 */
export default function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link || link.closest("[data-contact-modal]")) return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-contact-modal
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Sluiten"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-jungle-deep/50 md:backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Neem contact op met ${GUIDE_NAME}`}
        className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Sluiten"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-sand hover:text-foreground"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Neem contact op met{" "}
          <span className="accent-serif text-accent">{GUIDE_NAME}</span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          WhatsApp is het snelst: Edi reageert meestal binnen een paar uur
          (houd rekening met het tijdsverschil van 6 tot 7 uur). Bellen of het
          formulier kan natuurlijk ook.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white hover:brightness-105"
          >
            <WhatsAppIcon />
            WhatsApp {GUIDE_NAME}
          </a>
          <a
            href={PHONE_TEL}
            className="liquid-glass-dark btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-base font-semibold text-white hover:brightness-125"
          >
            <PhoneIcon />
            Bel {PHONE_DISPLAY}
          </a>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-jungle/20 px-6 text-base font-semibold text-foreground hover:bg-sand"
          >
            <MailIcon />
            Formulier invullen
          </a>
        </div>
      </div>
    </div>
  );
}
