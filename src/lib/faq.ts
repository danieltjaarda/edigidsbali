import type { FaqItem } from "@/components/Faq";
import { GUIDE_NAME, MAX_GUESTS, PICKUP_AREAS } from "@/lib/site";

export const FAQ: FaqItem[] = [
  {
    question: `Spreekt ${GUIDE_NAME} Nederlands?`,
    answer: `Ja, ${GUIDE_NAME} is 100% Nederlandssprekend. Van het eerste WhatsAppje tot de uitleg bij een tempel: alles gaat gewoon in het Nederlands.`,
  },
  {
    question: "Hoe boek ik een tour?",
    answer: `Stuur ${GUIDE_NAME} een WhatsApp of vul het contactformulier in met de datum, je verblijfplaats, het aantal personen en de tour (of wensen) die je in gedachten hebt. Je krijgt meestal binnen een dag een bevestiging met de ophaaltijd en de prijs.`,
  },
  {
    question: "Wat kost een dagtour?",
    answer: `Dat hangt af van je programma. Stuur ${GUIDE_NAME} een WhatsApp met de tour, de datum en het aantal personen en je krijgt direct een prijs. Voor de meeste dagtours geldt één prijs voor de hele auto (tot ${MAX_GUESTS} personen); bij tours met een boot, berggids of activiteit is het per persoon. Entreegelden zijn niet inbegrepen.`,
  },
  {
    question: "Zijn entreegelden en maaltijden inbegrepen?",
    answer: `Nee. Entreegelden voor tempels, watervallen en parken betaal je ter plekke, meestal tussen de 30.000 en 150.000 rupiah per persoon. Lunch kies je zelf: ${GUIDE_NAME} kent overal een goede warung of een restaurant met uitzicht, maar je bepaalt zelf waar en wat je eet.`,
  },
  {
    question: "Kan ik een eigen route samenstellen of tours combineren?",
    answer: `Zeker. Elke tour op deze site is een voorbeeld. Wil je twee halve tours combineren, langer blijven bij een waterval of een tempel overslaan? Zeg het en ${GUIDE_NAME} maakt er een programma van dat past bij jullie tempo en interesses.`,
  },
  {
    question: "Waar haalt Edi op?",
    answer: `Ophalen en terugbrengen is gratis in ${PICKUP_AREAS.slice(0, -1).join(", ")} en ${PICKUP_AREAS.at(-1)}. Verblijf je verder weg, bijvoorbeeld in Amed, Lovina of Sidemen? Dat kan in overleg, soms met een kleine toeslag voor de extra kilometers.`,
  },
  {
    question: "Is een tour geschikt voor kinderen?",
    answer: `Ja. De familietours zijn speciaal samengesteld op kindertempo, maar ook de meeste andere dagtours zijn prima met kinderen te doen. Een kinderzitje is op verzoek beschikbaar. Alleen de Batur-trekking en het snorkelen bij Manta Point zijn minder geschikt voor jonge kinderen.`,
  },
  {
    question: "Kan ik annuleren of verzetten?",
    answer: `Tot 24 uur van tevoren kun je kosteloos annuleren of verzetten. Voor boottickets, entreetickets of activiteiten die vooraf zijn betaald, gelden de voorwaarden van die aanbieder. Bij slecht weer overlegt ${GUIDE_NAME} altijd over een alternatief.`,
  },
  {
    question: "Hoe betaal ik?",
    answer: `Na de tour, contant in Indonesische rupiah, of vooraf via overboeking als je dat prettiger vindt. Voor boten en tickets die vooraf gereserveerd moeten worden, vraagt ${GUIDE_NAME} soms een aanbetaling.`,
  },
  {
    question: "Wat neem ik mee op een dagtour?",
    answer: "Zonnebrand, een pet of hoed, contant geld voor entree en lunch, en een sarong voor de tempels (die kun je ook overal huren). Voor watervallen en snorkeltours: zwemkleding, handdoek en waterschoenen. In het regenseizoen een licht regenjasje.",
  },
];
