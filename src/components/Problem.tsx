export default function Problem() {
  return (
    <section
      className="bt-section"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1240,
        margin: "0 auto",
        padding: "120px 28px",
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
          color: "var(--acidText)",
          marginBottom: 22,
        }}
      >
        01 — The problem
      </div>
      <h2
        data-anim="up"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 600,
          fontSize: "clamp(30px,4.6vw,58px)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          maxWidth: 900,
          marginBottom: 60,
        }}
      >
        Selling something to buy something else is four steps too many.
      </h2>
      <div
        className="bt-problem-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
        }}
      >
        <div
          data-anim="up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 22,
            padding: 34,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--faint)",
              marginBottom: 26,
            }}
          >
            The old way
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Own something",
              "Sell it",
              "Wait for money",
              "Search for the thing you want",
              "Buy it",
            ].map((s) => (
              <div
                key={s}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 17,
                  color: "var(--faint)",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div
          data-anim="up"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--acidText)",
            borderRadius: 22,
            padding: 34,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,var(--glow),transparent 65%)",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--acidText)",
              marginBottom: 26,
            }}
          >
            With Bartera
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Own something",
              "Find what you want",
              "Offer your product",
              "Negotiate & exchange",
            ].map((s) => (
              <div
                key={s}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 17,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
