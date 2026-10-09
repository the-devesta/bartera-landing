import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageShell, { Section } from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

const description =
  "How to permanently delete your Bartera account and personal data — in the app or by email — and what information is deleted or retained.";

export const metadata: Metadata = pageMetadata({
  title: "Delete your account",
  description,
  path: "/delete-account",
});

const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Account deletion request",
)}&body=${encodeURIComponent(
  "Please delete my Bartera account.\n\nRegistered email or phone number: \nUsername (if known): \n",
)}`;

export default function DeleteAccountPage() {
  return (
    <PageShell
      eyebrow="Bartera account"
      title="Delete your account"
      subtitle={
        <p>
          You can permanently delete your Bartera account and associated
          personal data at any time. Deletion cannot be undone.
        </p>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Section heading="Delete in the app" first>
          <ol>
            <li>Open the Bartera app and sign in.</li>
            <li>
              Go to <strong>Profile</strong> → <strong>Settings</strong>.
            </li>
            <li>
              Tap <strong>Delete account</strong> and confirm.
            </li>
          </ol>
          <p>
            Your account is deleted immediately and you are signed out on all
            devices. If you sign up again later, a brand-new account is
            created — your old data, coins and reviews can&apos;t be restored.
          </p>
        </Section>

        <Section heading="Request deletion without the app">
          <p>
            If you no longer have the app installed or can&apos;t sign in,{" "}
            <a href={mailto}>email {SUPPORT_EMAIL}</a> with the subject
            &ldquo;Account deletion request&rdquo;. Send it from the email
            address registered to your account, or include the phone number
            registered to your account so we can verify the request.
          </p>
          <p>
            We process verified requests within <strong>30 days</strong> and
            confirm by email once your account has been deleted.
          </p>
        </Section>

        <Section heading="What is deleted">
          <ul>
            <li>Your profile: name, email address, phone number, profile photo, bio and username</li>
            <li>Your location data and device push-notification tokens</li>
            <li>Your listings, wishlist and saved items</li>
            <li>Your login sessions (you are signed out everywhere)</li>
          </ul>
        </Section>

        <Section heading="What is retained">
          <ul>
            <li>
              Records of completed deals and coin ledger entries are kept in{" "}
              <strong>anonymised</strong> form — they are no longer linked to
              your name or contact details — so the other party&apos;s history
              stays accurate and for accounting, legal and fraud-prevention
              purposes.
            </li>
            <li>
              Reports and moderation records, and purchase records required by
              tax or payment regulations, may be kept for as long as the law
              requires.
            </li>
            <li>
              Unused Bartera Coins are forfeited and cannot be refunded or
              transferred.
            </li>
          </ul>
          <p>
            Encrypted backups are overwritten on a rolling basis. For more,
            see our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </Section>

        <Section heading="Questions">
          <p>
            Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or
            visit <Link href="/support">Support</Link>.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
