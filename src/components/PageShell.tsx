import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared layout for content pages (legal, support, delete-account).
 * Server component — no client JS. Mirrors the not-found / legal styling.
 */
export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "80px 24px 120px",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <header style={{ marginBottom: 48 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
              color: "var(--muted)",
              textDecoration: "none",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            Back to Bartera
          </Link>
          {eyebrow ? (
            <p
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--acidText)",
                marginBottom: 14,
              }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            {title}
          </h1>
          {subtitle ? (
            <div style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>
              {subtitle}
            </div>
          ) : null}
        </header>

        {children}

        <footer
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            textAlign: "center",
          }}
        >
          <nav
            aria-label="Footer"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px 24px",
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 14,
              color: "var(--muted)",
              marginBottom: 18,
            }}
          >
            <Link href="/support" data-navlink>Support</Link>
            <Link href="/delete-account" data-navlink>Delete account</Link>
            <Link href="/privacy" data-navlink>Privacy</Link>
            <Link href="/terms" data-navlink>Terms</Link>
          </nav>
          <p style={{ color: "var(--faint)", fontSize: 14 }}>
            Bartera — exchange, not cash. &copy; 2026 Bartera
          </p>
        </footer>
      </div>
    </main>
  );
}

/** Section block with a divider, used by content pages. */
export function Section({
  heading,
  first,
  children,
  id,
}: {
  heading: string;
  first?: boolean;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        borderTop: first ? "none" : "1px solid var(--border)",
        paddingTop: first ? 0 : 32,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.01em",
          marginBottom: 12,
          color: "var(--text)",
        }}
      >
        {heading}
      </h2>
      <div
        className="bt-prose"
        style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text)" }}
      >
        {children}
      </div>
    </section>
  );
}
