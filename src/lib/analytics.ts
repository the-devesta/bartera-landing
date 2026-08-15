"use client";

/**
 * Lightweight GA4 tracking helpers.
 * gtag is initialized in layout.tsx (next/script) when NEXT_PUBLIC_GA_ID is set.
 * All helpers are no-ops when analytics isn't configured, so the site works
 * identically without a tracking ID.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const enabled =
  typeof window !== "undefined" && typeof window.gtag === "function";

/** Fire a GA4 custom event. `track("waitlist_submit", { theme })`. */
export function track(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!enabled) return;
  window.gtag?.("event", event, params);
}

/** Convenience for button/link clicks: track(event, { label }). */
export function trackClick(label: string, event = "click"): void {
  track(event, { label });
}
