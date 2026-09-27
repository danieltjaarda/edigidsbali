"use client";

import { useState } from "react";

const subjects = [
  "Een tour boeken",
  "Eigen route samenstellen",
  "Vraag over prijzen of ophalen",
  "Iets anders",
];

const fieldStyle =
  "w-full rounded-2xl border border-jungle/15 bg-white px-4 py-3 text-base text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  /** Vooraf ingevuld onderwerp, bv. de naam van een tour. */
  defaultMessage?: string;
};

export default function ContactForm({ defaultMessage }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setErrorMessage(
          data?.error ??
            "Het bericht kon niet worden verzonden. Stuur Edi een WhatsApp, dan reageert hij snel.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "Het bericht kon niet worden verzonden. Controleer je verbinding en probeer het opnieuw.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          Bericht verzonden
        </h3>
        <p className="mt-2 max-w-sm text-pretty text-muted">
          Bedankt! Edi reageert meestal binnen een dag. Houd rekening met het
          tijdsverschil: op Bali is het 6 tot 7 uur later dan in Nederland.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Voor- en achternaam"
            className={fieldStyle}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="naam@voorbeeld.nl"
            className={fieldStyle}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
            Telefoon / WhatsApp{" "}
            <span className="font-normal text-muted">(optioneel)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+31 6 12345678"
            className={fieldStyle}
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-foreground">
            Waar gaat het over?
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue={subjects[0]}
            className={`${fieldStyle} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6b66%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={defaultMessage}
          placeholder="Welke tour(s) wil je doen, op welke datum, met hoeveel personen en waar verblijf je? Dan kan Edi direct een voorstel doen."
          className={`${fieldStyle} resize-y`}
        />
      </div>

      {/* Honeypot tegen spam: onzichtbaar voor bezoekers */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-semibold text-white hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Verzenden…
            </>
          ) : (
            "Verstuur bericht"
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted">
          We gebruiken je gegevens alleen om je aanvraag te beantwoorden.
        </p>
      </div>
    </form>
  );
}
