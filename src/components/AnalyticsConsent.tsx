"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import {
  readConsent,
  setConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

/** Server render (and first client render) = "unknown": show nothing. */
const getServerSnapshot = (): Consent | "unknown" => "unknown";

/**
 * Cookie-consent banner + Google Analytics loader. GA is injected only after
 * the visitor clicks "Accept"; declining (or ignoring the banner) means no GA
 * requests at all. Rendered only when NEXT_PUBLIC_GA_ID is configured.
 */
export default function AnalyticsConsent({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore<Consent | "unknown">(
    subscribeConsent,
    readConsent,
    getServerSnapshot,
  );

  // If consent is withdrawn after GA loaded, tell gtag to stop sending hits.
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    w[`ga-disable-${gaId}`] = consent !== "granted";
  }, [consent, gaId]);

  if (consent === "granted") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;
gtag('js', new Date());
// Never send password-reset tokens (?token=…) to analytics.
var loc = location.pathname.indexOf('/reset-password') === 0 ? location.origin + location.pathname : location.href;
gtag('config', ${JSON.stringify(gaId)}, { page_location: loc });`}
        </Script>
      </>
    );
  }

  if (consent !== null) return null; // "denied" or still unknown (SSR)

  return (
    <div className="bt-consent" role="region" aria-label="Cookie consent">
      <p>
        We&apos;d like to use Google Analytics cookies to understand how people
        use this site. No analytics run unless you accept.{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </p>
      <div className="bt-consent-actions">
        <button type="button" onClick={() => setConsent("denied")}>
          Decline
        </button>
        <button type="button" data-primary onClick={() => setConsent("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
