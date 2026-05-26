import { ImageResponse } from "next/og";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Baby Mo category";

export default async function OG({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FBF7EC",
            fontSize: 64,
            color: "#162818",
          }}
        >
          Baby Mo 🌱
        </div>
      ),
      size,
    );
  }

  const count = getProductsByCategory(category).length;

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(55% 55% at 18% 22%, rgba(95,195,113,0.50) 0%, transparent 60%), radial-gradient(55% 55% at 85% 18%, rgba(245,168,92,0.42) 0%, transparent 60%), radial-gradient(60% 60% at 50% 95%, rgba(255,217,61,0.32) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
          }}
        >
          {/* Brand mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg,#2BB14C 0%,#1F9A3F 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              M
            </div>
            <div
              style={{ fontSize: 36, fontWeight: 700, color: "#162818" }}
            >
              Baby Mo
            </div>
          </div>

          {/* Category */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 30,
                  background: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  boxShadow: "0 12px 32px rgba(15,30,15,0.08)",
                }}
              >
                {cat.emoji}
              </div>
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 700,
                  color: "#162818",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {cat.name}
              </div>
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#3B5036",
                fontStyle: "italic",
                maxWidth: 900,
              }}
            >
              {cat.description}
            </div>
          </div>

          {/* Footer chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                background: "linear-gradient(135deg,#2BB14C 0%,#1F9A3F 100%)",
                color: "#fff",
                padding: "14px 26px",
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {count} produk
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#6E7E66",
              }}
            >
              babymo.id
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
