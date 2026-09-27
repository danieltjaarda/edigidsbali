"use client";

import { useId, useState } from "react";

export type FaqItem = { question: string; answer: string };

type Props = {
  items: FaqItem[];
  title?: React.ReactNode;
  intro?: string;
};

/**
 * Veelgestelde vragen met een zachte uitklapanimatie. De antwoorden staan
 * altijd in de HTML (alleen visueel verborgen), zodat Google ze leest en ze
 * overeenkomen met faqSchema() in JsonLd. Eén vraag tegelijk open.
 */
export default function Faq({ items, title, intro }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-14">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title ?? (
                <>
                  Veelgestelde{" "}
                  <span className="accent-serif text-accent">vragen</span>
                </>
              )}
            </h2>
            {intro && (
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                {intro}
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <div
              className="liquid-glass divide-y divide-jungle/10 rounded-3xl px-2 sm:px-4"
              style={{ boxShadow: "none" }}
            >
              {items.map((item, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                const buttonId = `${baseId}-button-${i}`;
                return (
                  <div key={item.question} className="px-4 sm:px-6">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-base font-semibold text-foreground transition-colors hover:text-accent sm:text-lg"
                      >
                        {item.question}
                        <span
                          aria-hidden
                          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen
                              ? "rotate-45 border-accent bg-accent text-white"
                              : "border-jungle/25 text-muted"
                          }`}
                        >
                          <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                          <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`max-w-2xl pb-5 text-pretty leading-relaxed text-muted transition-all duration-500 ease-out motion-reduce:transition-none ${
                            isOpen
                              ? "translate-y-0 opacity-100"
                              : "-translate-y-1 opacity-0"
                          }`}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
