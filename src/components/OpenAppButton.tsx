"use client";

import { useEffect } from "react";

/** Tries the app deep link once on load, and offers it as a button. */
export default function OpenAppButton({ href }: { href: string }) {
  useEffect(() => {
    window.location.href = href;
  }, [href]);

  return (
    <p>
      <a
        href={href}
        style={{
          display: "inline-block",
          padding: "12px 20px",
          borderRadius: 999,
          background: "var(--text)",
          color: "var(--bg)",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Open in Bartera
      </a>
    </p>
  );
}
