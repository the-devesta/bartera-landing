"use client";

/**
 * Lightweight GA4 tracking helpers.
 * gtag is only loaded (by AnalyticsConsent) when NEXT_PUBLIC_GA_ID is set AND
 * the visitor has accepted analytics cookies. Every helper is a no-op until
 * then, so the site works identically without tracking.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function enabled(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/** Fire a GA4 custom event. `track("waitlist_submit", { theme })`. */
export function track(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!enabled()) return;
  window.gtag?.("event", event, params);
}

/** Convenience for button/link clicks: track(event, { label }). */
export function trackClick(label: string, event = "click"): void {
  track(event, { label });
}
