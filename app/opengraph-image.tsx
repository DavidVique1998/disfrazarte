import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Disfrazarte — Alquiler de Trajes y Disfraces";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a1a 0%, #12123a 50%, #0a0a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern circles */}
        <div style={{
          position: "absolute", top: -120, left: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(27,174,234,0.25) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -120, right: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,31,160,0.25) 0%, transparent 70%)",
        }} />

        {/* Accent line top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: "linear-gradient(90deg, #1baeea, #ff1fa0)",
        }} />

        {/* Logo text */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          fontSize: 96, fontWeight: 800, letterSpacing: -2,
          marginBottom: 32,
        }}>
          <span style={{ color: "#1baeea" }}>DISFRAZ</span>
          <span style={{ color: "#ff1fa0" }}>ARTE</span>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 28, color: "rgba(255,255,255,0.7)",
          fontWeight: 500, textAlign: "center",
          maxWidth: 700, lineHeight: 1.4,
        }}>
          Alquiler de trajes y disfraces · Ambato & Riobamba
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          {["+500 modelos", "Desfiles · Carnaval · Teatro", "Envíos a todo Ecuador"].map((t) => (
            <div key={t} style={{
              padding: "10px 22px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 16, fontWeight: 600,
            }}>
              {t}
            </div>
          ))}
        </div>

        {/* Accent line bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
          background: "linear-gradient(90deg, #ff1fa0, #1baeea)",
        }} />
      </div>
    ),
    { ...size }
  );
}
