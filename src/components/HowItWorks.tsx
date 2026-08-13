"use client";

const steps = [
  { n: "01", t: "Discover", d: "Browse the feed, categories and search for things worth swapping for." },
  { n: "02", t: "Make an offer", d: "Pick something you own, add coin if needed, and send it over." },
  { n: "03", t: "Negotiate", d: "Counter back and forth in chat until the trade feels fair." },
  { n: "04", t: "Agree", d: "Both tap confirm. The deal is locked and the swap is on." },
  { n: "05", t: "Exchange", d: "Meet or ship, complete the trade, then rate each other." },
];

const accents = [
  "var(--acidText)",
  "var(--acidText)",
  "var(--violetText)",
  "var(--amberText)",
  "var(--acidText)",
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bt-section"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1240,
        margin: "0 auto",
        padding: "80px 28px 120px",
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
        02 — How it works
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
          marginBottom: 60,
        }}
      >
        Discover. Offer. Negotiate. Exchange.
      </h2>
      <div
        className="bt-steps-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 16,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.n}
            data-anim="up"
            data-stepcard
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--acidText)";
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "26px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minHeight: 210,
              transition: "border-color .25s ease, transform .25s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: 30,
                color: accents[i],
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 600,
                fontSize: 19,
              }}
            >
              {s.t}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--muted)",
              }}
            >
              {s.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
