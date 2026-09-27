import Image from "next/image";

import { WhatsAppIcon } from "@/components/Header";
import { EMAIL, GUIDE_NAME, WHATSAPP_DEFAULT } from "@/lib/site";

type Props = {
  title?: React.ReactNode;
  text?: string;
};

export default function CtaBand({
  title = (
    <>
      Klaar voor <span className="accent-serif text-accent">Bali</span>?
    </>
  ),
  text = `Stuur ${GUIDE_NAME} een berichtje met je reisdatum en wat je graag wilt zien. Je krijgt snel een voorstel, zonder verplichtingen.`,
}: Props) {
  return (
    <section className="pb-16 pt-4 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-jungle-deep px-8 py-14 text-center sm:px-12 sm:py-20">
          <Image
            src="/images/tours/strand-zonsondergang.jpg"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover opacity-60"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-jungle-deep via-jungle-deep/55 to-jungle-deep/20"
          />
          <div className="relative">
            <h2 className="text-shadow text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="text-shadow mx-auto mt-4 max-w-md text-pretty text-white/80">
              {text}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-squeeze inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-base font-semibold text-white hover:brightness-105"
              >
                <WhatsAppIcon size={18} />
                WhatsApp {GUIDE_NAME}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="liquid-glass-btn btn-squeeze inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-semibold text-white"
              >
                Stuur een e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
