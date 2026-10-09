import type { Metadata } from "next";
import PageShell, { Section } from "@/components/PageShell";
import { APP_STORE_URL, PLAY_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";
import OpenInApp from "./OpenInApp";

/**
 * Universal / App Link target for password reset emails
 * (`https://bartera.in/reset-password?token=…`). When the app is installed the
 * OS opens it directly and this page never renders; otherwise it tries the
 * `bartera://` scheme and explains how to finish the reset.
 */
export const metadata: Metadata = {
  title: "Reset your password",
  description: "Finish resetting your Bartera password in the Bartera app.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ResetPasswordPage() {
  return (
    <PageShell
      eyebrow="Bartera account"
      title="Reset your password"
      subtitle={<p>Password resets are completed in the Bartera app.</p>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Section heading="Open the app" first>
          <OpenInApp />
          <p>
            Open this link on the phone where Bartera is installed. The link
            expires 30 minutes after it was sent and can only be used once — if
            it has expired, request a new one from the sign-in screen.
          </p>
        </Section>

        <Section heading="Don't have the app?">
          <p>
            Install Bartera, then open the reset link from your email again.
          </p>
          {(APP_STORE_URL || PLAY_STORE_URL) && (
            <ul>
              {APP_STORE_URL && (
                <li>
                  <a href={APP_STORE_URL}>Download on the App Store</a>
                </li>
              )}
              {PLAY_STORE_URL && (
                <li>
                  <a href={PLAY_STORE_URL}>Get it on Google Play</a>
                </li>
              )}
            </ul>
          )}
          <p>
            Need help? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
