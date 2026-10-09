import { useSectionView } from "@/hooks/useSectionView";

export default function Coins() {
  const sectionRef = useSectionView("coins");
  return (
    <section
      ref={sectionRef}
      id="coins"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "110px 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="bt-coins-grid"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 28px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div data-anim="up" style={{ order: 2 }}>
          <div
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--amberText)",
              borderRadius: 24,
              padding: 36,
              boxShadow: "var(--cardShadow)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--faint)",
                marginBottom: 14,
              }}
            >
              Coin wallet
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 26,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="/assets/mark-ink.png" style={{ width: 26, height: 26 }} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-unbounded)",
                  fontWeight: 700,
                  fontSize: 44,
                }}
              >
                1,250
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--muted)" }}>
                  Deal completed · iPhone ⇄ MacBook
                </span>
                <span>−100</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--muted)" }}>
                  Featured listing boost
                </span>
                <span>−50</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--muted)" }}>Coin pack</span>
                <span style={{ color: "var(--amberText)" }}>+1,000</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ order: 1 }}>
          <div
            data-anim="up"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--amberText)",
              marginBottom: 22,
            }}
          >
            05 — Coins
          </div>
          <h2
            data-anim="up"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 600,
              fontSize: "clamp(30px,4.2vw,52px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Coins power the extras.
          </h2>
          <p
            data-anim="up"
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: 480,
            }}
          >
            Your first deal is free. After that, coins cover the deal fee,
            boost a listing to the top or feature it on the home feed. Earn
            them as you set up, or buy coin packs in the app. Coins never
            change hands between traders.
          </p>
        </div>
      </div>
    </section>
  );
}
