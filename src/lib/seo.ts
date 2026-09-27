import type { Metadata } from "next";

import type { Tour } from "@/lib/tours";
import {
  BASE_CITY,
  COUNTRY,
  EMAIL,
  GEO,
  GUIDE_NAME,
  PHONE_E164,
  PICKUP_AREAS,
  REGION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Pad met voorloopslash, bv. "/tours". */
  path: string;
  keywords?: string[];
  /** Eigen afbeelding voor social previews; standaard de gegenereerde OG-afbeelding. */
  image?: { url: string; width: number; height: number; alt: string };
};

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}, privé dagtours op Bali met gids en chauffeur ${GUIDE_NAME}`,
};

/** Unieke metadata per pagina, met canonical en Open Graph-varianten. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: PageMetaInput): Metadata {
  const og = image ?? OG_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [og.url],
    },
  };
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdNode = Record<string, unknown>;

export function organizationSchema(): JsonLdNode {
  return {
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: `${GUIDE_NAME} Gids Bali`,
    url: SITE_URL,
    description: `Privé dagtours op Bali met ${GUIDE_NAME} als gids en chauffeur: tempels, rijstvelden, watervallen, Nusa Penida en meer. Ophalen bij je verblijf, vaste prijs per auto.`,
    telephone: PHONE_E164,
    email: EMAIL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/edigidsbali-mark.svg`,
    },
    image: `${SITE_URL}/images/hero-poster.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: BASE_CITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Bali" },
      ...PICKUP_AREAS.map((name) => ({ "@type": "Place", name })),
    ],
    knowsLanguage: ["en", "id"],
    priceRange: "€€",
    currenciesAccepted: "IDR, EUR",
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: PHONE_E164,
      email: EMAIL,
      availableLanguage: ["en", "id", "nl"],
    },
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "nl-NL",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
      }),
    ),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Eén tour als TouristTrip, inclusief richtprijs en de belangrijkste stops. */
export function tourSchema(tour: Tour): JsonLdNode {
  const path = `/tours/${tour.slug}`;
  return {
    "@type": "TouristTrip",
    "@id": `${SITE_URL}${path}#trip`,
    name: tour.title,
    description: tour.intro.join(" "),
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}${tour.image}`,
    touristType: tour.category === "familie" ? "Gezinnen" : "Individuele reizigers en kleine groepen",
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.highlights.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "TouristAttraction", name },
      })),
    },
    provider: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
      description:
        tour.priceUnit === "auto"
          ? "Richtprijs per auto (privétour), exclusief entreegelden"
          : "Richtprijs per persoon, exclusief entreegelden",
    },
  };
}

/** Lijst van tours als ItemList, voor de overzichtspagina. */
export function tourListSchema(tours: Tour[]): JsonLdNode {
  return {
    "@type": "ItemList",
    name: "Populaire tours op Bali",
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/tours/${tour.slug}`,
      name: tour.title,
    })),
  };
}

/** Bundelt losse schema's in één @graph, zoals Google aanbeveelt. */
export function jsonLdGraph(nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
