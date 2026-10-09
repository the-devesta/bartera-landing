import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageShell, { Section } from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/lib/site";

const description =
  "Get help with Bartera — contact support, and find answers about bartering, Bartera Coins, safety, verification, blocking and reporting, and deleting your account.";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description,
  path: "/support",
});

const faqs: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "How does bartering on Bartera work?",
    a: (
      <>
        <p>
          List something you own, browse for something you want, and send an
          offer with one of your items. The owner can accept, decline or
          counter. You negotiate in chat until the trade feels fair, both of
          you confirm the deal, then meet up, exchange and rate each other.
        </p>
      </>
    ),
  },
  {
    q: "What are Bartera Coins?",
    a: (
      <>
        <p>
          Coins are an in-app credit for Bartera features: the fee for each
          completed deal after your first free one, boosting a listing to the
          top, and featuring it on the home feed. You earn coins while setting
          up, and you can buy coin packs in the app through the App Store or
          Google Play with real money.
        </p>
        <p>
          Coins have no cash value, can&apos;t be withdrawn or transferred, and
          are never paid to the other trader — if item values differ, any cash
          top-up is settled directly between you. For refunds on
          a store purchase, request one from Apple or Google; if your coins
          didn&apos;t arrive after a purchase, email us with the order ID from
          your store receipt.
        </p>
      </>
    ),
  },
  {
    q: "How do I stay safe when trading?",
    a: (
      <ul>
        <li>Meet in a busy public place during the day, and tell a friend where you&apos;re going.</li>
        <li>Keep chats and offers inside Bartera — they&apos;re your record if something goes wrong.</li>
        <li>Inspect the item before you hand yours over. Check it powers on, matches the photos and isn&apos;t damaged.</li>
        <li>Never share OTPs, passwords or bank/UPI details, and never pay anyone outside the app.</li>
        <li>Check the other person&apos;s ratings, reviews and verification badge before agreeing.</li>
        <li>If something feels off, walk away and report the user.</li>
      </ul>
    ),
  },
  {
    q: "What does verification mean?",
    a: (
      <p>
        Verified members have confirmed their phone number or email and
        completed our identity checks. Listings also get an AI image check that
        looks for signs of tampering or stock photos and gives you a confidence
        read. Verification lowers risk but doesn&apos;t guarantee an item —
        always inspect before you trade.
      </p>
    ),
  },
  {
    q: "How do I block or report someone?",
    a: (
      <>
        <p>
          Open the person&apos;s profile, a listing, or a chat and tap the menu
          (⋯) to choose <strong>Block</strong> or <strong>Report</strong>.
          Blocking hides your listings from each other and stops new chats,
          offers and messages between you. You can unblock people later
          from your blocked list in Settings.
        </p>
        <p>
          Reports go to our moderation team, who review them and can remove
          content or suspend accounts. For anything urgent or involving your
          safety, also email {SUPPORT_EMAIL} — and contact local police if you
          are in danger.
        </p>
      </>
    ),
  },
  {
    q: "How do I delete my account?",
    a: (
      <p>
        In the app, go to Profile → Settings → Delete account. You can also
        request deletion by email. See{" "}
        <Link href="/delete-account">Delete your account</Link> for what is
        deleted and what is kept.
      </p>
    ),
  },
];

export default function SupportPage() {
  return (
    <PageShell
      eyebrow="Help centre"
      title="Support"
      subtitle={
        <p>
          Questions, problems with a trade, or feedback? We&apos;re here to help.
        </p>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Section heading="Contact us" first>
          <p>
            Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
            email address or phone number linked to your Bartera account, and
            include your username plus any relevant screenshots, listing links
            or order IDs.
          </p>
          <p>
            <strong>Response time:</strong> we usually reply within 1–2
            business days (Monday–Saturday, IST). Safety reports are
            prioritised.
          </p>
          <p style={{ marginTop: 20 }}>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Bartera support")}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 16,
                fontWeight: 600,
                background: "var(--acid)",
                color: "var(--acidInk)",
                padding: "14px 26px",
                borderRadius: 100,
                textDecoration: "none",
              }}
            >
              Email support →
            </a>
          </p>
        </Section>

        <Section heading="Frequently asked questions">
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="bt-faq">
                <summary>{f.q}</summary>
                <div>{f.a}</div>
              </details>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
