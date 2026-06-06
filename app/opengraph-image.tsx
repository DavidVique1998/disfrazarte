import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Disfrazarte — Alquiler de Trajes y Disfraces";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/instagram/ig-07.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/logo_full.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Full-bleed costume photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${photoSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            display: "flex",
          }}
        />

        {/* Dark gradient — heavy left for text, fades to transparent right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,10,26,0.94) 0%, rgba(10,10,26,0.85) 42%, rgba(10,10,26,0.5) 65%, rgba(10,10,26,0.1) 100%)",
            display: "flex",
          }}
        />

        {/* Brand color bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 7,
            background: "linear-gradient(90deg, #1baeea, #ff1fa0)",
            display: "flex",
          }}
        />

        {/* Content — left column */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 72px",
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            style={{ height: 68, width: 247, objectFit: "contain" }}
          />

          {/* Tagline */}
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              fontWeight: 700,
              color: "rgba(255,255,255,0.93)",
              lineHeight: 1.3,
              maxWidth: 520,
            }}
          >
            Alquiler de trajes · Ambato & Riobamba
          </div>

          {/* Sub */}
          <div
            style={{
              marginTop: 14,
              fontSize: 20,
              color: "rgba(255,255,255,0.52)",
              maxWidth: 480,
            }}
          >
            Más de 500 modelos · Envíos a todo Ecuador
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {["Desfiles", "Carnaval", "Teatro"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "8px 22px",
                  background: "rgba(27,174,234,0.16)",
                  border: "1px solid rgba(27,174,234,0.42)",
                  color: "#1baeea",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
