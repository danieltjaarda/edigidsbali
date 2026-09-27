import Image from "next/image";

const tips = [
  {
    title: "Beste reistijd",
    text: "April tot en met oktober is het droog seizoen: zon, weinig regen en de kalmste zee voor Nusa Penida en de Gili's. Van november tot maart regent het meestal een paar uur per dag, is het eiland op z'n groenst en zijn de prijzen lager.",
    image: "/images/tours/boer-rijstveld.jpg",
    alt: "Boer plant rijst in een terras op Bali",
  },
  {
    title: "Tempel-etiquette",
    text: "In een tempel draag je een sarong en een sjerp (overal te huur of te leen), met bedekte schouders. Loop niet voor biddende mensen, klim niet op muren en stap nooit op offers. Edi legt onderweg uit wat wel en niet hoort.",
    image: "/images/tours/taman-ayun.jpg",
    alt: "Meru-torens van de Taman Ayun-tempel",
  },
  {
    title: "Offers op straat",
    text: "De kleine palmbladbakjes met bloemen, rijst en wierook heten canang sari. Balinezen leggen ze elke ochtend neer als dank. Je ziet ze op stoepen, dashboards en tempels: eromheen lopen is genoeg.",
    image: "/images/tours/canang-sari.jpg",
    alt: "Twee canang sari-offers met bloemen op zwart zand",
  },
  {
    title: "Eten & drinken",
    text: "Nasi campur (rijst met een beetje van alles), babi guling (speenvarken), sate lilit en lawar zijn de Balinese klassiekers. In een warung eet je voor een paar euro. Drink water uit flessen en vraag Edi naar zijn favoriete adressen.",
    image: "/images/tours/nasi-campur.jpg",
    alt: "Bord nasi campur met kip, rijst en groenten",
  },
  {
    title: "Ceremonies & Nyepi",
    text: "Bijna elke dag is er ergens een ceremonie: optochten, kleurrijke offers en gamelan-muziek. Grote kans dat je er onderweg één tegenkomt. Op Nyepi, de dag van stilte (meestal in maart), staat het hele eiland een dag stil, inclusief het vliegveld.",
    image: "/images/tours/ceremonie.jpg",
    alt: "Melasti-ceremonie op het strand met een Barong-figuur en gelovigen in het wit",
  },
  {
    title: "Dans in de avond",
    text: "De Kecak bij Uluwatu is de bekendste, maar in Ubud is er elke avond wel een voorstelling: Legong, Barong of schaduwpoppenspel. Kaartjes kosten een paar euro en Edi weet welke voorstelling op welke avond de moeite is.",
    image: "/images/tours/barong.jpg",
    alt: "Legong-danseressen in gouden kostuums op een podium in Ubud",
  },
];

const weetjes = [
  ["Geld", "Indonesische rupiah (IDR). Contant is handig voor entree, warungs en markten; pinautomaten zijn overal in de toeristische gebieden."],
  ["Tijdsverschil", "Bali loopt 6 uur voor op Nederlandse zomertijd en 7 uur op wintertijd."],
  ["Stroom", "230 volt, stekkertype C en F: Nederlandse stekkers passen zonder adapter."],
  ["Simkaart", "Een lokale e-sim of simkaart (Telkomsel) is goedkoop en werkt in bijna heel Bali, ook in de bergen."],
  ["Verkeer", "Afstanden lijken klein, maar reistijden zijn lang. Een dagtour van 9 uur is vaak 3 tot 4 uur rijden."],
  ["Fooi", "Niet verplicht, wel gewaardeerd. Voor een dagtour is 50.000 tot 100.000 rupiah gebruikelijk."],
];

export default function PraktischeTips() {
  return (
    <section id="tips" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Praktische tips voor{" "}
            <span className="accent-serif text-accent">Bali</span>
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Wat je wilt weten voordat je gaat, van de beste reistijd tot hoe je
            je gedraagt in een tempel.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <li
              key={tip.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={tip.image}
                  alt={tip.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-foreground">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tip.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="liquid-glass mt-6 rounded-3xl p-6 sm:p-8">
          <h3 className="font-semibold text-foreground">Nog goed om te weten</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {weetjes.map(([term, text]) => (
              <div key={term}>
                <dt className="text-sm font-semibold text-accent">{term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
