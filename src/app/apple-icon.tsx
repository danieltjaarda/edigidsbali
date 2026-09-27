import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f2b22",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 64 64">
          <circle cx="32" cy="27" r="13" fill="#f0a640" />
          <path d="M7 55V37h3v-6h3v-6h3v-5h3v-4h6v39H7z" fill="#ffffff" />
          <path d="M57 55V37h-3v-6h-3v-6h-3v-5h-3v-4h-6v39h18z" fill="#ffffff" />
          <path d="M6 59c5-4 11-4 16 0s11 4 16 0 11-4 16 0" stroke="#2fb3ae" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    size,
  );
}
