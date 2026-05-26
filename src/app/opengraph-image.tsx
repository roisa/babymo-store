import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE_ID } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Baby Mo — sesuatu yang lembut untuk hari-hari kecil";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FBF7EC",
          position: "relative",
        }}
      >
        {/* Aurora wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(55% 55% at 18% 22%, rgba(95,195,113,0.55) 0%, transparent 60%), radial-gradient(55% 55% at 85% 18%, rgba(245,168,92,0.45) 0%, transparent 60%), radial-gradient(60% 60% at 50% 95%, rgba(255,217,61,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px 88px",
            width: "100%",
          }}
        >
          {/* Brand mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg,#2BB14C 0%,#1F9A3F 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 34,
                fontWeight: 800,
                boxShadow: "0 12px 32px rgba(31,154,63,0.35)",
              }}
            >
              M
            </div>
            <div
              style={{ fontSize: 44, fontWeight: 700, color: "#162818" }}
            >
              {SITE_NAME}
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontSize: 110,
                fontWeight: 700,
                color: "#162818",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                maxWidth: 1000,
              }}
            >
              {SITE_TAGLINE_ID}
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#3B5036",
                maxWidth: 820,
                lineHeight: 1.4,
              }}
            >
              Buku cerita anak, stiker doa, kaos katun organik, dan barang
              hangat lainnya — dipilih dengan tenang.
            </div>
          </div>

          {/* Footer chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.7)",
                color: "#3B5036",
                padding: "14px 24px",
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              babymo.id
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#6E7E66",
              }}
            >
              kirim ke seluruh Indonesia 🌱
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
