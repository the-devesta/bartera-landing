import { useSectionView } from "@/hooks/useSectionView";

const timeline = [
  { who: "You", label: "Offer", body: "iPhone 15 + ₹10,000", accent: false },
  { who: "Them", label: "Counter", body: "iPhone 15 + ₹20,000", accent: false },
  { who: "You", label: "Counter", body: "iPhone 15 + ₹15,000", accent: false },
  { who: "Them", label: "Accepted", body: "Deal confirmed", accent: true },
];

export default function Offer() {
  const sectionRef = useSectionView("the_offer");
  return (
    <section
      ref={sectionRef}
      id="offer"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "120px 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="bt-offer-grid"
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
        <div>
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
            03 — The offer
          </div>
          <h2
            data-anim="up"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 600,
              fontSize: "clamp(30px,4.2vw,52px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              marginBottom: 26,
            }}
          >
            You don&apos;t press buy. You make an offer.
          </h2>
          <p
            data-anim="up"
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--muted)",
              marginBottom: 30,
              maxWidth: 480,
            }}
          >
            Offer a single item, stack a few together, or add some coin to
            balance the value. The other side can accept, reject, or counter —
            and every change is easy to read.
          </p>
          <div
            data-anim="up"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "var(--glow)",
                  color: "var(--acidText)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 700,
                }}
              >
                ＋
              </span>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 16 }}>
                Item + cash to balance the difference
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "var(--glow)",
                  color: "var(--acidText)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 700,
                }}
              >
                ≡
              </span>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 16 }}>
                Multiple items in one offer
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "var(--glow)",
                  color: "var(--acidText)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 700,
                }}
              >
                ⇄
              </span>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 16 }}>
                Counter back and forth until it&apos;s fair
              </span>
            </div>
          </div>
        </div>
        <div
          data-anim="up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: 26,
            boxShadow: "var(--cardShadow)",
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
              marginBottom: 20,
            }}
          >
            Negotiation timeline
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {timeline.map((r) => {
              const bg = r.accent ? "var(--acid)" : "var(--surface2)";
              const col = r.accent ? "var(--acidInk)" : "var(--text)";
              const bd = r.accent ? "none" : "1px solid var(--border)";
              return (
                <div
                  key={r.body}
                  style={{
                    alignSelf: r.who === "You" ? "flex-start" : "flex-end",
                    maxWidth: "78%",
                    background: bg,
                    border: bd,
                    color: col,
                    borderRadius: 16,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      opacity: 0.6,
                      marginBottom: 5,
                    }}
                  >
                    {r.who} · {r.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontWeight: 600,
                      fontSize: 17,
                    }}
                  >
                    {r.body}
                    {r.accent ? " ✓" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
