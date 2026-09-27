/**
 * Edigidsbali: centrale gegevens van de site.
 *
 * TODO vóór livegang: vervang elke placeholder door de echte gegevens van Edi
 * (domein, WhatsApp-nummer, e-mailadres, standplaats, talen, maximaal aantal
 * gasten). Header, footer, contactpagina, tourpagina's en de gestructureerde
 * data lezen allemaal uit dit bestand, dus je hoeft het maar één keer aan te passen.
 */
export const SITE_URL = "https://edigidsbali.nl";
export const SITE_NAME = "Edigidsbali";
export const GUIDE_NAME = "Edi";
export const TAGLINE = "Jouw persoonlijke gids en chauffeur op Bali";

/** Mobiele nummer van Edi (WhatsApp). */
export const PHONE_DISPLAY = "+62 813 3809 7022";
export const PHONE_E164 = "+6281338097022";
export const PHONE_TEL = `tel:${PHONE_E164}`;
export const WHATSAPP_NUMBER = PHONE_E164.replace("+", "");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "info@edigidsbali.nl";

/** TODO: standplaats van Edi. Bepaalt ook de coördinaten in de gestructureerde data. */
export const BASE_CITY = "Ubud";
export const REGION = "Bali";
export const COUNTRY = "ID";
export const GEO = { latitude: -8.5069, longitude: 115.2625 };

/** Plaatsen waar Edi standaard gratis ophaalt en terugbrengt. */
export const PICKUP_AREAS = [
  "Ubud",
  "Seminyak",
  "Canggu",
  "Kuta",
  "Legian",
  "Sanur",
  "Nusa Dua",
  "Jimbaran",
  "Uluwatu",
];

/** TODO: bevestigen met Edi. Aantal gasten dat in zijn auto past. */
export const MAX_GUESTS = 6;

/** Openbare profielen voor sameAs. Alleen toevoegen als ze echt bestaan. */
export const SOCIAL_PROFILES: string[] = [];

/** WhatsApp-link met een vooraf ingevuld bericht. */
export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappLink(
  `Hoi ${GUIDE_NAME}, ik heb je site Edigidsbali bekeken en wil graag een tour op Bali boeken. Kun je me meer vertellen?`,
);
