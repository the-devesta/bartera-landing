"use client";

import { useRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(ctaRef);

  return (
    <section
      id="top"
      className="bt-hero"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1240,
        margin: "0 auto",
        padding: "180px 28px 90px",
        textAlign: "center",
      }}
    >
      <div
        data-hero="tag"
        className="bt-hero-tag"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          fontFamily: "var(--font-space-grotesk)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--acidText)",
          border: "1px solid var(--acidText)",
          borderRadius: 100,
          padding: "8px 16px",
          marginBottom: 34,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--acid)",
            display: "inline-block",
          }}
        />
        A marketplace for exchange, not cash
      </div>
      <h1
        style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "clamp(52px, 9.2vw, 148px)",
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
          margin: "0 auto",
          maxWidth: 1050,
        }}
      >
        <span data-hero="l1" style={{ display: "block" }}>
          Trade
        </span>
        <span data-hero="l2" style={{ display: "block" }}>
          anything
          <span style={{ color: "var(--acidText)" }}>.</span>
        </span>
      </h1>
      <p
        data-hero="sub"
        style={{
          fontSize: "clamp(17px,2vw,21px)",
          lineHeight: 1.55,
          color: "var(--muted)",
          maxWidth: 620,
          margin: "34px auto 0",
        }}
      >
        List what you have, discover what you want, and negotiate a fair swap —
        item for item, or with a little coin to balance it out. AI checks give
        you a confidence read on every listing.
      </p>
      <div
        data-hero="cta"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginTop: 44,
        }}
      >
        <a
          href="#waitlist"
          data-scroll-to="#waitlist"
          data-magnetic
          ref={ctaRef}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 5px var(--glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 16,
            fontWeight: 600,
            background: "var(--acid)",
            color: "var(--acidInk)",
            padding: "16px 30px",
            borderRadius: 100,
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            transition: "transform .2s ease, box-shadow .2s ease",
          }}
        >
          Start trading <span>→</span>
        </a>
        <a
          href="#how"
          data-scroll-to="#how"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--acidText)";
            e.currentTarget.style.background = "var(--glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border2)";
            e.currentTarget.style.background = "transparent";
          }}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 16,
            fontWeight: 500,
            color: "var(--text)",
            padding: "16px 26px",
            borderRadius: 100,
            border: "1px solid var(--border2)",
            transition: "border-color .2s ease, background .2s ease",
          }}
        >
          See how it works
        </a>
      </div>

      <div
        data-hero="swap"
        className="bt-hero-swap"
        style={{
          marginTop: 78,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "clamp(14px,3vw,34px)",
          flexWrap: "nowrap",
        }}
      >
        <div
          data-swapcard
          className="bt-swapcard"
          style={{
            flex: 1,
            maxWidth: 340,
            textAlign: "left",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: 22,
            padding: 22,
            boxShadow: "var(--cardShadow)",
          }}
        >
          <div
            style={{
              aspectRatio: "4/3",
              borderRadius: 14,
              background:
                "repeating-linear-gradient(135deg,var(--surface),var(--surface) 11px,var(--surface2) 11px,var(--surface2) 22px)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "flex-end",
              padding: 14,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--faint)",
              }}
            >
              Their listing
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: 19,
              marginBottom: 6,
            }}
          >
            MacBook Air M2
          </div>
          <div
            className="bt-swap-meta"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "4px 9px",
                borderRadius: 6,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Used · Good
            </span>
            <span style={{ color: "var(--acidText)", fontWeight: 600 }}>
              ✓ Verified
            </span>
          </div>
        </div>
        <div
          className="bt-swap-icon-col"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            data-swap-icon
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--acid)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px var(--glow)",
            }}
          >
            <img
              src="/assets/mark-ink.png"
              alt="swap"
              style={{ width: 34, height: 34 }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--faint)",
            }}
          >
            swap
          </span>
        </div>
        <div
          data-swapcard
          className="bt-swapcard"
          style={{
            flex: 1,
            maxWidth: 340,
            textAlign: "left",
            background: "var(--surface2)",
            border: "1px solid var(--acidText)",
            borderRadius: 22,
            padding: 22,
            boxShadow: "var(--cardShadow)",
          }}
        >
          <div
            style={{
              aspectRatio: "4/3",
              borderRadius: 14,
              background:
                "repeating-linear-gradient(135deg,var(--surface),var(--surface) 11px,var(--surface2) 11px,var(--surface2) 22px)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "flex-end",
              padding: 14,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--faint)",
              }}
            >
              Your offer
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: 19,
              marginBottom: 6,
            }}
          >
            iPhone 15{" "}
            <span style={{ color: "var(--acidText)" }}>+ ₹20,000</span>
          </div>
          <div
            className="bt-swap-meta"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "4px 9px",
                borderRadius: 6,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Yours
            </span>
            <span>balances the value</span>
          </div>
        </div>
      </div>
    </section>
  );
}
