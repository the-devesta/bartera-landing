export default function Poster() {
  return (
    <section className="bt-section" style={{ position: "relative", zIndex: 1, padding: "40px 28px" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          background: "var(--acid)",
          color: "var(--acidInk)",
          borderRadius: 32,
          padding: "clamp(50px,8vw,120px) clamp(30px,6vw,90px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="/assets/mark-ink.png"
          data-poster-mark
          alt=""
          style={{
            position: "absolute",
            right: -60,
            bottom: -60,
            width: 340,
            height: 340,
            opacity: 0.12,
          }}
        />
        <div
          data-anim="up"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.55,
            marginBottom: 24,
          }}
        >
          What makes Bartera different
        </div>
        <h2
          data-anim="up"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(34px,6vw,86px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          The product itself becomes the currency of negotiation.
        </h2>
      </div>
    </section>
  );
}
