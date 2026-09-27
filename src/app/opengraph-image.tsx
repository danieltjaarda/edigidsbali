import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { GUIDE_NAME, SITE_URL } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Edigidsbali, privé dagtours op Bali met gids en chauffeur ${GUIDE_NAME}`;

const fontDir = join(process.cwd(), "src/assets/fonts");

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f2b22",
          fontFamily: "Geist",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            left: 300,
            width: 900,
            height: 640,
            borderRadius: 999,
            background: "#e4762d",
            opacity: 0.4,
            filter: "blur(140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -120,
            width: 700,
            height: 500,
            borderRadius: 999,
            background: "#1f8a86",
            opacity: 0.35,
            filter: "blur(140px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <circle cx="32" cy="27" r="13" fill="#f0a640" />
            <path d="M7 55V37h3v-6h3v-6h3v-5h3v-4h6v39H7z" fill="#ffffff" />
            <path d="M57 55V37h-3v-6h-3v-6h-3v-5h-3v-4h-6v39h18z" fill="#ffffff" />
            <path d="M6 59c5-4 11-4 16 0s11 4 16 0 11-4 16 0" stroke="#2fb3ae" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: -1, color: "#ffffff" }}>
            <span style={{ color: "#e4762d" }}>Edi</span>gidsbali
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: "#ffffff",
              maxWidth: 940,
            }}
          >
            {`Ontdek het échte Bali, met ${GUIDE_NAME} achter het stuur.`}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            Privé dagtours · Tempels · Rijstvelden · Watervallen · Nusa Penida
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 28,
              color: "#f0a640",
              fontWeight: 600,
            }}
          >
            {SITE_URL.replace(/^https?:\/\//, "")}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>
              Ophalen bij je verblijf
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
