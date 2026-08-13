export default function BackgroundGlows() {
  return (
    <>
      <div
        data-bg-glow
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow), transparent 62%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        data-bg-glow2
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-10%",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow2), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
