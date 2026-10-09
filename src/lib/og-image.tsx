import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Bartera — A marketplace for exchange, not cash";

const BG = "#0C0E0A";
const ACID = "#C6FF3D";
const TEXT = "#EDEBE6";
const MUTED = "#A6A89E";

/** Shared 1200×630 social card used by opengraph-image and twitter-image. */
export async function renderOgImage(): Promise<ImageResponse> {
  const logo = await readFile(
    join(process.cwd(), "public/assets/mark-acid.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BG,
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(198,255,61,0.22) 0%, rgba(12,14,10,0) 55%)",
          color: TEXT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={84} height={84} alt="" />
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Bartera
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 980,
            }}
          >
            <span>A marketplace for&nbsp;</span>
            <span style={{ color: ACID }}>exchange,</span>
            <span>&nbsp;not cash.</span>
          </div>
          <div style={{ fontSize: 32, color: MUTED, maxWidth: 900 }}>
            Swap what you own for what you want — item for item, or a cash
            top-up to balance it out.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <span>bartera.in</span>
          <span
            style={{
              display: "flex",
              background: ACID,
              color: BG,
              padding: "12px 28px",
              borderRadius: 100,
              fontWeight: 700,
            }}
          >
            Swap. Don&apos;t spend.
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
