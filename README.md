# Edigidsbali

Website voor Edi, privégids en chauffeur op Bali. Gebouwd met Next.js 16,
React 19 en Tailwind CSS 4, op basis van de mediaspot-site.

## Ontwikkelen

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productiebuild
npm run lint
```

## Waar staat wat

- `src/lib/site.ts` – naam, WhatsApp-nummer, e-mail, standplaats, ophaalgebieden (TODO's vóór livegang).
- `src/lib/tours.ts` – alle tours: teksten, programma, richtprijzen, foto's.
- `src/lib/faq.ts` – veelgestelde vragen.
- `src/lib/photo-credits.ts` – bronvermelding van de foto's (Wikimedia Commons, CC-licenties).
- `src/components/Logo.tsx` en `public/logo/` – logo als React-component en als losse SVG's.
- `public/videos/` – dronevideo's van Edi (hero en rijstveldenband).

## Contactformulier

`src/app/api/contact/route.ts` stuurt aanvragen per e-mail. Zet op Vercel de
omgevingsvariabelen `CONTACT_TO` (ontvanger) en optioneel `RESEND_API_KEY` +
`CONTACT_FROM`. Zonder Resend-sleutel wordt FormSubmit gebruikt.
