export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border)",
        padding: "56px 28px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="#top"
          data-scroll-to="#top"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <img
            src="/assets/mark-acid.png"
            data-mark="dark"
            alt="Bartera"
            style={{ width: 28, height: 28 }}
          />
          <img
            src="/assets/mark-ink.png"
            data-mark="light"
            alt="Bartera"
            style={{ width: 28, height: 28 }}
          />
          <span
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 600,
              fontSize: 19,
              letterSpacing: "-0.03em",
            }}
          >
            Bartera
          </span>
        </a>
        <div
          style={{
            display: "flex",
            gap: 30,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          <a href="#how" data-scroll-to="#how" data-navlink>
            How it works
          </a>
          <a href="#trust" data-scroll-to="#trust" data-navlink>
            Trust
          </a>
          <a href="#coins" data-scroll-to="#coins" data-navlink>
            Coins
          </a>
          <a href="#waitlist" data-scroll-to="#waitlist" data-navlink>
            Waitlist
          </a>
        </div>
        <div
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 13,
            color: "var(--faint)",
          }}
        >
          © 2026 Bartera — exchange, not cash.
        </div>
      </div>
    </footer>
  );
}
