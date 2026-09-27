import { useId } from "react";

type Tone = "light" | "dark";

/**
 * Beeldmerk: een opkomende zon tussen de twee helften van een candi bentar
 * (de gespleten Balinese tempelpoort), met een golf ervoor. Wordt inline
 * gerenderd zodat de kleuren per achtergrond kunnen wisselen.
 */
export function LogoMark({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const gate = tone === "light" ? "#ffffff" : "var(--jungle)";
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`sun-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7c85e" />
          <stop offset="1" stopColor="#e4762d" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="27" r="13" fill={`url(#sun-${id})`} />
      <path
        d="M7 55V37h3v-6h3v-6h3v-5h3v-4h6v39H7z"
        fill={gate}
      />
      <path
        d="M57 55V37h-3v-6h-3v-6h-3v-5h-3v-4h-6v39h18z"
        fill={gate}
      />
      <path
        d="M6 59c5-4 11-4 16 0s11 4 16 0 11-4 16 0"
        stroke="#1f8a86"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  tone?: Tone;
  className?: string;
  /** Grootte van het beeldmerk; de tekst schaalt mee. */
  size?: "sm" | "md" | "lg";
};

export default function Logo({ tone = "light", className = "", size = "md" }: LogoProps) {
  const text = tone === "light" ? "text-white" : "text-jungle-deep";
  const dims = {
    sm: { mark: "h-8 w-8", text: "text-[1.15rem]" },
    md: { mark: "h-9 w-9 sm:h-10 sm:w-10", text: "text-[1.25rem] sm:text-[1.4rem]" },
    lg: { mark: "h-12 w-12", text: "text-[1.75rem]" },
  }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className={`${dims.mark} shrink-0`} />
      <span
        className={`${dims.text} ${text} font-semibold leading-none tracking-tight`}
      >
        <span className="text-accent">Edi</span>gidsbali
      </span>
    </span>
  );
}
