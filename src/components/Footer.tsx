"use client";

import { trackClick } from "@/lib/analytics";
import { resetConsent } from "@/lib/consent";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const hasStoreLinks = Boolean(APP_STORE_URL || PLAY_STORE_URL);

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.55zM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.58-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
      <path d="M1.2.6C.9.9.7 1.4.7 2v22c0 .6.2 1.1.5 1.4l.1.1L13.6 13.2v-.3L1.3.5l-.1.1zM17.7 17.3l-4.1-4.1v-.3l4.1-4.1.1.1 4.9 2.8c1.4.8 1.4 2.1 0 2.9l-4.9 2.8-.1-.1zM17.8 17.2 13.6 13 1.2 25.4c.5.5 1.2.5 2.1.1l14.5-8.3M17.8 8.8 3.3.5C2.4 0 1.7.1 1.2.6L13.6 13l4.2-4.2z" />
    </svg>
  );
}

function StoreBadge({
  href,
  label,
  store,
  icon,
  event,
}: {
  href: string;
  label: string;
  store: string;
  icon: React.ReactNode;
  event: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bt-store-badge"
      aria-label={`${label} ${store}`}
      onClick={() => trackClick(event)}
    >
      {icon}
      <span style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <span style={{ fontSize: 10, color: "var(--muted)" }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{store}</span>
      </span>
    </a>
  );
}

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
        className="bt-footer-inner"
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
        <nav
          aria-label="Footer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 26px",
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
          {hasStoreLinks ? null : (
            <a href="#waitlist" data-scroll-to="#waitlist" data-navlink>
              Waitlist
            </a>
          )}
          <a href="/support" data-navlink>
            Support
          </a>
          <a href="/delete-account" data-navlink>
            Delete account
          </a>
          <a href="/privacy" data-navlink>
            Privacy
          </a>
          <a href="/terms" data-navlink>
            Terms
          </a>
          {gaEnabled ? (
            <button
              type="button"
              data-navlink
              onClick={resetConsent}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                font: "inherit",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Cookie preferences
            </button>
          ) : null}
        </nav>
        {hasStoreLinks ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {APP_STORE_URL ? (
              <StoreBadge
                href={APP_STORE_URL}
                label="Download on the"
                store="App Store"
                icon={<AppleIcon />}
                event="store_app_store"
              />
            ) : null}
            {PLAY_STORE_URL ? (
              <StoreBadge
                href={PLAY_STORE_URL}
                label="Get it on"
                store="Google Play"
                icon={<PlayIcon />}
                event="store_google_play"
              />
            ) : null}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 13,
          }}
        >
          <a
            href="https://www.instagram.com/bartera.in"
            target="_blank"
            rel="noopener noreferrer"
            data-navlink
            onClick={() => trackClick("social_instagram")}
            style={{ color: "var(--muted)" }}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/bartera.in"
            target="_blank"
            rel="noopener noreferrer"
            data-navlink
            onClick={() => trackClick("social_facebook")}
            style={{ color: "var(--muted)" }}
          >
            Facebook
          </a>
          <span style={{ color: "var(--faint)" }}>
            © 2026 Bartera — exchange, not cash.
          </span>
        </div>
      </div>
    </footer>
  );
}
