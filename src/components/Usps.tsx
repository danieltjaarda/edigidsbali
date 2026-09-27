import { LogoMark } from "@/components/Logo";
import { GUIDE_NAME, MAX_GUESTS } from "@/lib/site";

const usps = [
  {
    title: "Privé, alleen jullie",
    text: `Geen groepsbus, geen vaste stops. Alleen jullie en ${GUIDE_NAME}, in een auto met airco.`,
  },
  {
    title: "Ophalen bij je verblijf",
    text: "Van hotel, villa of homestay in Zuid-Bali en Ubud. Op de tijd die jullie kiezen.",
  },
  {
    title: "Vaste prijs per auto",
    text: `Eén prijs voor de hele dag, voor maximaal ${MAX_GUESTS} personen. Geen verrassingen achteraf.`,
  },
  {
    title: "Flexibel programma",
    text: "Langer blijven bij die ene waterval? Een tempel overslaan? Onderweg aanpassen kan altijd.",
  },
];

export default function Usps() {
  return (
    <section className="relative z-10 -mt-8 pb-4 sm:-mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp) => (
            <div
              key={usp.title}
              className="liquid-glass relative overflow-hidden rounded-3xl px-6 py-5 text-left"
            >
              <LogoMark
                tone="dark"
                className="pointer-events-none absolute -bottom-4 -right-4 w-24 select-none opacity-[0.06]"
              />
              <p className="font-semibold text-foreground">{usp.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{usp.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
