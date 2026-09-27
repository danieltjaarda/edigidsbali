import Link from "next/link";

import Logo from "@/components/Logo";
import {
  BASE_CITY,
  EMAIL,
  GUIDE_NAME,
  PHONE_DISPLAY,
  SITE_NAME,
  WHATSAPP_DEFAULT,
} from "@/lib/site";

const columns = [
  {
    title: "Populaire tours",
    links: [
      { label: "Ubud highlights", href: "/tours/ubud-highlights" },
      { label: "Nusa Penida west", href: "/tours/nusa-penida-west" },
      { label: "Mount Batur zonsopgang", href: "/tours/mount-batur-zonsopgang" },
      { label: "Uluwatu & Kecak-dans", href: "/tours/uluwatu-kecak" },
      { label: "Oost-Bali & Lempuyang", href: "/tours/oost-bali-lempuyang" },
      { label: "Alle tours", href: "/tours" },
    ],
  },
  {
    title: "Informatie",
    links: [
      { label: "Hoe werkt het", href: "/#hoe-werkt-het" },
      { label: `Over ${GUIDE_NAME}`, href: "/#over-edi" },
      { label: "Praktische tips", href: "/#tips" },
      { label: "Veelgestelde vragen", href: "/#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: SITE_NAME,
    links: [
      { label: "WhatsApp", href: WHATSAPP_DEFAULT, external: true },
      { label: "E-mail", href: `mailto:${EMAIL}` },
      { label: "Fotoverantwoording", href: "/fotoverantwoording" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-jungle/10 bg-white/50">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Privé dagtours op Bali met {GUIDE_NAME} als gids en chauffeur.
              Tempels, rijstvelden, watervallen en eilanden, in jullie eigen
              tempo. Ophalen bij je verblijf, vaste prijs per auto.
            </p>

            <address className="mt-7 space-y-3 text-sm not-italic">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PHONE_DISPLAY} (WhatsApp)
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {EMAIL}
              </a>
              <p className="flex items-center gap-3 text-foreground">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {BASE_CITY}, Bali, Indonesië
              </p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-jungle/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted/80 sm:text-left">
            © {new Date().getFullYear()} {SITE_NAME} · Privé tours op Bali met{" "}
            {GUIDE_NAME}
          </p>
          <p className="text-center text-xs text-muted/80 sm:text-right">
            Foto&apos;s van reizigers via Wikimedia Commons, zie de{" "}
            <Link
              href="/fotoverantwoording"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              fotoverantwoording
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
