"use client";

import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const magneticRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(magneticRef);

  useEffect(() => {
    const getSystemTheme = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

    let saved: string | null = null;
    try {
      saved = localStorage.getItem("bartera-theme");
    } catch {}

    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    } else {
      const system = getSystemTheme();
      setTheme(system);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("bartera-theme", next);
    } catch {}
    setTheme(next);
  };

  const navLink = {
    opacity: 0.82,
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 28px",
        backdropFilter: "blur(12px)",
        background: "var(--navBg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1240,
          display: "flex",
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
            style={{ width: 30, height: 30 }}
          />
          <img
            src="/assets/mark-ink.png"
            data-mark="light"
            alt="Bartera"
            style={{ width: 30, height: 30 }}
          />
          <span
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 600,
              fontSize: 21,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Bartera
          </span>
        </a>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <a href="#how" data-scroll-to="#how" data-navlink style={navLink}>
            How it works
          </a>
          <a href="#offer" data-scroll-to="#offer" data-navlink style={navLink}>
            The offer
          </a>
          <a href="#trust" data-scroll-to="#trust" data-navlink style={navLink}>
            Trust
          </a>
          <a href="#coins" data-scroll-to="#coins" data-navlink style={navLink}>
            Coins
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            data-theme-toggle
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "var(--acidText)";
              b.style.background = "var(--glow)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "var(--border2)";
              b.style.background = "transparent";
            }}
            onClick={toggleTheme}
            style={{
              width: 38,
              height: 38,
              borderRadius: 100,
              border: "1px solid var(--border2)",
              background: "transparent",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color .2s ease, background .2s ease",
            }}
          >
            <svg
              data-mark="dark"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
            </svg>
            <svg
              data-mark="light"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <a
            href="#waitlist"
            data-scroll-to="#waitlist"
            data-magnetic
            ref={magneticRef}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 4px var(--glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 14,
              fontWeight: 600,
              background: "var(--acid)",
              color: "var(--acidInk)",
              padding: "11px 20px",
              borderRadius: 100,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
          >
            Join waitlist <span style={{ fontSize: 15 }}>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
