import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const phases = ["16-avos", "Oitavas", "Quartas", "Semifinais", "Final"];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "linear-gradient(135deg, #11161f 0%, #161d29 55%, #1d2738 100%)",
        color: "#f2f4f7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "44px" }}>🏆</div>
        <div
          style={{
            fontSize: "26px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#e3b23c",
            fontWeight: 700,
          }}
        >
          Copa do Mundo FIFA 2026 · EUA · Canadá · México
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: "92px",
            fontWeight: 800,
            lineHeight: 1.02,
            textTransform: "uppercase",
            letterSpacing: "-1px",
          }}
        >
          Chaveamento do mata-mata
        </div>
        <div style={{ fontSize: "34px", color: "#aab3c2", maxWidth: "900px" }}>
          Placares ao vivo, escalações e a trajetória de cada seleção rumo ao
          título.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          {phases.map((phase) => (
            <div
              key={phase}
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 600,
                color: "#e3b23c",
                border: "2px solid #e3b23c55",
                borderRadius: "9999px",
                padding: "10px 22px",
              }}
            >
              {phase}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "24px", color: "#7c879a" }}>
          chaveamento-copa-2026-16-avos.vercel.app
        </div>
      </div>
    </div>,
    size,
  );
}
