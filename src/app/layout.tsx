import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import ContactModal from "@/components/ContactModal";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { GUIDE_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
});

const TITLE = `${SITE_NAME} | Privé dagtours op Bali met gids en chauffeur ${GUIDE_NAME}`;
const DESCRIPTION =
  "Stel je eigen Bali-programma samen met Edi, 100% Nederlandssprekende gids en chauffeur: tempels, rijstvelden, watervallen, Nusa Penida en meer. Ophalen bij je verblijf, één prijs per auto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Reizen",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2b22",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl-NL"
      className={`${GeistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ContactModal />
        <JsonLd nodes={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
