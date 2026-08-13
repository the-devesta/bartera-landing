export default function Ticker() {
  const items = (
    <>
      <span>iPhone ⇄ MacBook</span>
      <span style={{ color: "var(--acidText)" }}>◆</span>
      <span>Camera ⇄ Guitar</span>
      <span style={{ color: "var(--violetText)" }}>◆</span>
      <span>PS5 ⇄ Road bike</span>
      <span style={{ color: "var(--acidText)" }}>◆</span>
      <span>Sneakers ⇄ Vinyl</span>
      <span style={{ color: "var(--amberText)" }}>◆</span>
      <span>Desk ⇄ Monitor</span>
      <span style={{ color: "var(--acidText)" }}>◆</span>
    </>
  );

  const halfStyle = {
    display: "flex",
    alignItems: "center",
    gap: 44,
    paddingRight: 44,
    fontFamily: "var(--font-unbounded)",
    fontWeight: 500,
    fontSize: 28,
    letterSpacing: "-0.01em",
    color: "var(--text)",
  };

  return (
    <div
      className="bt-ticker"
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "24px 0",
        overflow: "hidden",
        marginTop: 30,
      }}
    >
      <div
        className="bt-ticker-track"
        style={{
          display: "flex",
          width: "max-content",
          animation: "bartera-marquee 32s linear infinite",
        }}
      >
        <div className="bt-ticker-half" style={halfStyle}>{items}</div>
        <div className="bt-ticker-half" style={halfStyle}>{items}</div>
      </div>
    </div>
  );
}
