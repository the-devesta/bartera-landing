export default function Trust() {
  return (
    <section
      id="trust"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1240,
        margin: "0 auto",
        padding: "110px 28px",
      }}
    >
      <div
        data-anim="up"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--violetText)",
          marginBottom: 22,
        }}
      >
        04 — Trust
      </div>
      <h2
        data-anim="up"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 600,
          fontSize: "clamp(30px,4.6vw,58px)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          maxWidth: 820,
          marginBottom: 18,
        }}
      >
        Bartering with strangers, safely.
      </h2>
      <p
        data-anim="up"
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--muted)",
          maxWidth: 560,
          marginBottom: 56,
        }}
      >
        Verified profiles, real ratings, and an AI read on every product image.
        Trust signals stay visible while you decide.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 34,
          padding: "40px 0",
          borderTop: "1px solid var(--border2)",
          borderBottom: "1px solid var(--border2)",
          marginBottom: 56,
        }}
      >
        {[
          { count: "4.8", suffix: "", label: "Avg. trader rating", color: "var(--violetText)" },
          { count: "100", suffix: "%", label: "Images AI-checked", color: "" },
          { count: "24", suffix: "", label: "Reviews per active trader", color: "" },
          { count: "12", suffix: "", label: "Completed deals shown", color: "" },
        ].map((c) => (
          <div key={c.label} data-anim="up">
            <div
              data-count={c.count}
              data-suffix={c.suffix}
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: "clamp(34px,4vw,54px)",
                color: c.color || undefined,
              }}
            >
              {c.count}
              {c.suffix}
            </div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 14,
                color: "var(--faint)",
                marginTop: 6,
              }}
            >
              {c.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 22,
        }}
      >
        <div
          data-anim="up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 30,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 19,
              fontWeight: 600,
              marginBottom: 10,
              color: "var(--violetText)",
            }}
          >
            Verified identity
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
            KYC and identity verification give every trader a badge you can
            rely on before you offer.
          </p>
        </div>
        <div
          data-anim="up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 30,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 19,
              fontWeight: 600,
              marginBottom: 10,
              color: "var(--violetText)",
            }}
          >
            Ratings &amp; reviews
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
            After every completed exchange, both sides leave feedback — so
            reputation is earned, deal by deal.
          </p>
        </div>
        <div
          data-anim="up"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--violetText)",
            borderRadius: 20,
            padding: 30,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 19,
              fontWeight: 600,
              marginBottom: 10,
              color: "var(--violetText)",
            }}
          >
            AI image assessment
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
            AI scans listing photos for manipulation and flags anything
            suspicious. A confidence read — not a guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
