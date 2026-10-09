import Link from "next/link";
import PageShell, { Section } from "@/components/PageShell";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";
import OpenAppButton from "./OpenAppButton";

/**
 * Web fallback for Universal / App Links (`/l/:id`, `/u/:id`). When the app is
 * installed the OS opens it directly and this page never renders.
 */
export default function AppLinkFallback({
  title,
  subtitle,
  appUrl,
}: {
  title: string;
  subtitle: string;
  appUrl: string;
}) {
  return (
    <PageShell eyebrow="Bartera" title={title} subtitle={<p>{subtitle}</p>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Section heading="Open the app" first>
          <OpenAppButton href={appUrl} />
        </Section>
        <Section heading="Don't have the app?">
          {APP_STORE_URL || PLAY_STORE_URL ? (
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
          ) : (
            <p>
              Bartera is launching soon — <Link href="/#waitlist">join the waitlist</Link>.
            </p>
          )}
        </Section>
      </div>
    </PageShell>
  );
}
