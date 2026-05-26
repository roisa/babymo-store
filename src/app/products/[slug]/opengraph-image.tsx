import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/products";
import { formatIDR } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Baby Mo product";

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
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
        {/* Aurora */}
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

          {/* Title + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                color: "#162818",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: 1000,
              }}
            >
              {product.name}
            </div>
            {product.tagline && (
              <div
                style={{
                  fontSize: 30,
                  color: "#3B5036",
                  fontStyle: "italic",
                  maxWidth: 800,
                }}
              >
                {product.tagline}
              </div>
            )}
          </div>

          {/* Price chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                background: "linear-gradient(135deg,#2BB14C 0%,#1F9A3F 100%)",
                color: "#fff",
                padding: "20px 32px",
                borderRadius: 999,
                fontSize: 40,
                fontWeight: 700,
                boxShadow: "0 12px 32px rgba(31,154,63,0.35)",
              }}
            >
              {formatIDR(product.price)}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#6E7E66",
                fontWeight: 500,
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
