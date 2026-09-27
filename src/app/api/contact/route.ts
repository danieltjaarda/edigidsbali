import { NextResponse } from "next/server";

import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Verstuurt het contactformulier per e-mail.
 *
 * - Met RESEND_API_KEY (aanbevolen, zie resend.com) gaat het via Resend.
 * - Zonder sleutel valt de route terug op FormSubmit, dat berichten gratis
 *   doorstuurt naar het ontvangstadres. Bij de eerste inzending stuurt
 *   FormSubmit één activatiemail naar dat adres.
 *
 * TODO: zet CONTACT_TO op het e-mailadres van Edi (of laat het op het
 * standaardadres staan zolang jij de aanvragen doorzet).
 */
const RECIPIENT = process.env.CONTACT_TO ?? "daniel@deskna.nl";

type Submission = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function validate(body: Record<string, unknown>): Submission | string {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 100) {
    return "Vul je naam in.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) {
    return "Vul een geldig e-mailadres in.";
  }
  if (message.length < 1 || message.length > 5000) {
    return "Schrijf een bericht.";
  }
  if (phone.length > 40 || subject.length > 60) {
    return "Er klopt iets niet in de ingevulde gegevens.";
  }

  return { name, email, phone, subject, message };
}

function emailText(submission: Submission): string {
  return [
    `Naam: ${submission.name}`,
    `E-mail: ${submission.email}`,
    `Telefoon: ${submission.phone || "-"}`,
    `Onderwerp: ${submission.subject || "-"}`,
    "",
    "Bericht:",
    submission.message,
    "",
    `— Verzonden via het contactformulier van ${SITE_URL}`,
  ].join("\n");
}

async function sendViaResend(submission: Submission, apiKey: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `${SITE_NAME} <onboarding@resend.dev>`,
      to: [RECIPIENT],
      reply_to: submission.email,
      subject: `Nieuwe aanvraag via ${SITE_NAME} — ${submission.name}`,
      text: emailText(submission),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend gaf status ${response.status}: ${await response.text()}`);
  }
}

async function sendViaFormSubmit(submission: Submission) {
  const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // FormSubmit eist een herkomst; anders weigert het de aanvraag.
      Origin: SITE_URL,
      Referer: `${SITE_URL}/contact`,
    },
    body: JSON.stringify({
      name: submission.name,
      email: submission.email,
      message: emailText(submission),
      _subject: `Nieuwe aanvraag via ${SITE_NAME} — ${submission.name}`,
      _template: "box",
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  if (!response.ok || !data || String(data.success) !== "true") {
    throw new Error(
      `FormSubmit gaf status ${response.status}: ${data?.message ?? "onbekende fout"}`,
    );
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ongeldige aanvraag." }, { status: 400 });
  }

  // Honeypot: echte bezoekers zien dit veld nooit; bots vullen het in.
  if (String(body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validate(body);
  if (typeof result === "string") {
    return NextResponse.json({ ok: false, error: result }, { status: 400 });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await sendViaResend(result, apiKey);
    } else {
      await sendViaFormSubmit(result);
    }
  } catch (error) {
    console.error("Contactformulier kon niet worden verzonden:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Het bericht kon niet worden verzonden. Stuur Edi een WhatsApp, dan reageert hij snel.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
