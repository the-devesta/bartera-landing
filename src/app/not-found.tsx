import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "var(--bg)",
        color: "var(--text)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Brand mark */}
        <div style={{ display: "inline-flex", marginBottom: 28 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/assets/mark-acid.png" data-mark="dark" alt="Bartera" style={{ width: 28, height: 28 }} />
              <img src="/assets/mark-ink.png" data-mark="light" alt="Bartera" style={{ width: 28, height: 28 }} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: "-0.03em",
              }}
            >
              bartera
            </span>
          </Link>
        </div>

        {/* 404 Large Code */}
        <div
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 800,
            fontSize: "clamp(80px, 16vw, 140px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "var(--acidText)",
            marginBottom: 16,
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(24px, 4vw, 36px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: 460,
            margin: "0 auto 36px",
            fontFamily: "var(--font-onest)",
          }}
        >
          Looks like this item has already been traded away or the page doesn&apos;t exist.
        </p>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 16,
              fontWeight: 600,
              background: "var(--acid)",
              color: "var(--acidInk)",
              padding: "15px 28px",
              borderRadius: 100,
              textDecoration: "none",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
          >
            Back to home →
          </Link>
          <Link
            href="/#waitlist"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 16,
              fontWeight: 600,
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border2)",
              padding: "15px 28px",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Join waitlist
          </Link>
        </div>

        {/* Helpful links footer */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            fontSize: 14,
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--muted)",
          }}
        >
          <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <span>·</span>
          <Link href="/privacy" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
