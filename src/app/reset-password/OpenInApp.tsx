"use client";

import { useEffect, useSyncExternalStore } from "react";

const APP_SCHEME_URL = "bartera://reset-password";

const noopSubscribe = () => () => {};

function deepLinkFromLocation(): string | null {
  const token = new URLSearchParams(window.location.search).get("token");
  return token ? `${APP_SCHEME_URL}?token=${encodeURIComponent(token)}` : null;
}

/** Builds the app deep link from this page's `?token=` and tries it once. */
export default function OpenInApp() {
  const href = useSyncExternalStore(noopSubscribe, deepLinkFromLocation, () => null);

  useEffect(() => {
    if (href) window.location.href = href;
  }, [href]);

  if (!href) {
    return (
      <p>
        This reset link is incomplete. Request a new one from the Bartera
        sign-in screen.
      </p>
    );
  }

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
