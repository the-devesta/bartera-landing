import { API_URL, SUPPORT_EMAIL } from "@/lib/site";

export type LegalSlug = "privacy" | "terms";

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDoc {
  slug: string;
  title: string;
  sections: LegalSection[];
  version: number;
  updatedAt: string;
}

/**
 * Fixed "last updated" date for the bundled fallback copy. Bump this whenever
 * the fallback text below changes — never derive it from `new Date()`.
 */
export const LEGAL_FALLBACK_UPDATED_AT = "2026-10-09";

const privacyFallback: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  version: 2,
  updatedAt: LEGAL_FALLBACK_UPDATED_AT,
  sections: [
    {
      heading: "Introduction",
      body: `Bartera ("we", "our", "us") respects your privacy. This Privacy Policy explains what personal information we collect, how we use and share it, and the choices you have when you use the Bartera mobile app and website (the "Service").`,
    },
    {
      heading: "Information We Collect",
      body: `Account information: your name, phone number and/or email address, profile photo, bio and username. If you sign in with Google or Apple we receive your name and email address from that provider.

Listings and trades: photos and descriptions of items you list, wishlists, offers, counter-offers, chat messages, deals, ratings and reviews.

Location: your approximate or precise location (only with your permission) so we can show trades nearby and help you meet safely for handovers.

Verification: information you submit to verify your identity or listings, including photos checked by our AI image tools.

Purchases: records of Bartera Coin purchases (product, amount, transaction identifiers). We never receive or store your full card or bank details.

Device and usage data: device type, operating system, app version, push notification tokens, crash and error reports, and — on the website, only if you accept analytics cookies — Google Analytics usage data.`,
    },
    {
      heading: "How We Use Your Information",
      body: `We use your information to create and secure your account; show, match and moderate listings; enable offers, chat and deals; credit Bartera Coins you purchase; send notifications you have enabled; detect fraud, spam and abuse; respond to support requests and reports; fix bugs and improve the Service; and comply with legal obligations.`,
    },
    {
      heading: "Service Providers We Use",
      body: `We share information only with providers that help us run the Service, under contracts that limit their use of it:

• Payments — in-app purchases of Bartera Coins are processed by Apple (App Store) and Google (Google Play). We use RevenueCat to validate purchases and keep your coin balance in sync; RevenueCat receives your Bartera user ID and purchase details, not your payment card.
• Image storage — photos you upload (listings, avatars, chat images, verification photos) are stored and delivered by Cloudinary.
• Error tracking — we use Sentry to collect crash and error diagnostics (device, app version, error details) so we can fix problems.
• Push notifications — notifications are delivered through Expo's push service, Apple Push Notification service and Firebase Cloud Messaging using your device's push token.
• Sign-in — Google and Apple, if you choose to sign in with them.
• AI checks — listing photos and trade details may be processed by AI providers to estimate value and flag possible tampering.
• Hosting and analytics — cloud hosting providers, and Google Analytics on our website only after you give consent.

We do not sell your personal information.`,
    },
    {
      heading: "Information Visible to Other Users",
      body: `Your public profile (name, photo, username, ratings, reviews and approximate area) and your listings are visible to other Bartera users. Messages and offers are visible to the people you trade with. Exact location is never shown publicly.`,
    },
    {
      heading: "Safety, Blocking and Reporting",
      body: `You can block any user. Blocking hides your listings from each other and prevents new chats, offers and messages between you. You can report users, listings, messages or chats for spam, scams, harassment, prohibited items or other problems. Reports — including the reported content and your report details — are reviewed by our moderation team, and we may take action such as removing content or suspending accounts. We keep report records to keep the community safe and to meet legal obligations.`,
    },
    {
      heading: "Account Deletion",
      body: `You can permanently delete your account in the app under Profile → Settings → Delete account, or by emailing ${SUPPORT_EMAIL} from your registered email address or phone number (we process email requests within 30 days).

When your account is deleted we delete or anonymise your personal information — name, email, phone number, profile photo, bio, location and push tokens — and delete your listings, wishlist and sessions. Records of completed deals and coin ledger entries are kept in anonymised form, and we may retain limited information where required for legal, tax, fraud-prevention or dispute-resolution purposes. Deletion cannot be undone. See bartera.in/delete-account for details.`,
    },
    {
      heading: "Data Retention",
      body: `We keep your information for as long as your account is active. After deletion we keep only the anonymised or legally required records described above, and backups are overwritten on a rolling basis.`,
    },
    {
      heading: "Data Security",
      body: `We use encryption in transit, hashed credentials and session tokens, access controls and monitoring to protect your information. No system is completely secure, so please keep your login details private and report anything suspicious.`,
    },
    {
      heading: "Your Rights and Choices",
      body: `Subject to applicable law (including India's Digital Personal Data Protection Act, 2023), you may access, correct or delete your personal information, withdraw consent (for example to location or notifications in your device settings), and raise a grievance with us. On the website you can accept or decline analytics cookies at any time via the cookie banner. Contact ${SUPPORT_EMAIL} to exercise these rights.`,
    },
    {
      heading: "Children",
      body: `Bartera is not intended for anyone under 18 and we do not knowingly collect information from children.`,
    },
    {
      heading: "Changes to This Policy",
      body: `We may update this Privacy Policy from time to time. We will post the updated policy here, update the "Last updated" date, and notify you in the app for material changes.`,
    },
    {
      heading: "Contact Us",
      body: `Questions or grievances about this Privacy Policy? Email ${SUPPORT_EMAIL}.`,
    },
  ],
};

const termsFallback: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  version: 2,
  updatedAt: LEGAL_FALLBACK_UPDATED_AT,
  sections: [
    {
      heading: "Agreement to Terms",
      body: `By accessing or using Bartera's mobile application, website and services (collectively, the "Service"), you agree to these Terms of Service ("Terms") and our Privacy Policy. If you do not agree, do not use the Service.`,
    },
    {
      heading: "Eligibility",
      body: "You must be at least 18 years old to use the Service. By using the Service, you represent that you meet this requirement.",
    },
    {
      heading: "Accounts",
      body: "You are responsible for keeping your login credentials confidential and for all activity under your account. Provide accurate information and keep it up to date.",
    },
    {
      heading: "Trading & Swaps",
      body: "Bartera lets users swap items with each other, optionally balancing a trade with a cash top-up that the users settle directly between themselves. We are not a party to any trade between users. You are solely responsible for checking the condition, authenticity and legality of items you trade and for meeting safely.",
    },
    {
      heading: "Bartera Coins",
      body: "Bartera Coins are a virtual credit used only inside the Service to pay for platform features such as completed-deal fees, listing boosts and featured listings. Coins are never transferred between users. Coins can be purchased through the App Store or Google Play and are subject to those stores' terms. Coins have no cash value, cannot be withdrawn or transferred outside the Service, and except where required by law or store policy, purchases are non-refundable. Refund requests for store purchases are handled by Apple or Google.",
    },
    {
      heading: "User Conduct",
      body: "You agree not to: (a) use the Service for any illegal purpose; (b) harass, abuse or harm other users; (c) post fraudulent, misleading or prohibited listings; (d) attempt to circumvent security measures; or (e) interfere with the Service's operation.",
    },
    {
      heading: "Blocking, Reporting and Moderation",
      body: "You can block users and report users, listings, messages or chats that break these Terms. We review reports and may remove content, restrict features, or suspend or terminate accounts at our discretion.",
    },
    {
      heading: "Your Content",
      body: "You keep ownership of the photos and text you post. You grant Bartera a non-exclusive, worldwide, royalty-free licence to host, display and process that content to operate and promote the Service. You must have the rights to anything you upload.",
    },
    {
      heading: "Intellectual Property",
      body: "The Service and its original content, features and functionality are owned by Bartera and protected by copyright, trademark and other laws.",
    },
    {
      heading: "Disclaimers",
      body: `The Service is provided "as is" and "as available" without warranties of any kind. AI checks and valuations are estimates only. Bartera does not warrant that the Service will be uninterrupted, error-free or secure.`,
    },
    {
      heading: "Limitation of Liability",
      body: "To the maximum extent permitted by law, Bartera is not liable for any indirect, incidental, special, consequential or punitive damages, or for losses arising from trades between users.",
    },
    {
      heading: "Termination and Account Deletion",
      body: "You can delete your account at any time in the app (Profile → Settings → Delete account) or as described at bartera.in/delete-account. We may suspend or terminate your access for breach of these Terms.",
    },
    {
      heading: "Governing Law",
      body: "These Terms are governed by the laws of India, without regard to conflict-of-law provisions.",
    },
    {
      heading: "Changes",
      body: "We may modify these Terms. We will post the updated Terms here and notify you of material changes. Continued use of the Service after changes means you accept them.",
    },
    {
      heading: "Contact Us",
      body: `Questions about these Terms? Email ${SUPPORT_EMAIL}.`,
    },
  ],
};

export const LEGAL_FALLBACK: Record<LegalSlug, LegalDoc> = {
  privacy: privacyFallback,
  terms: termsFallback,
};

function isLegalDoc(value: unknown): value is LegalDoc {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<LegalDoc>;
  return (
    typeof v.title === "string" &&
    Array.isArray(v.sections) &&
    v.sections.length > 0 &&
    v.sections.every(
      (s) =>
        s && typeof s.heading === "string" && typeof s.body === "string",
    )
  );
}

/**
 * Fetch a legal document from the backend (ISR, revalidated hourly).
 * Falls back to the bundled copy if the API is unreachable or malformed.
 */
export async function getLegalDoc(slug: LegalSlug): Promise<LegalDoc> {
  try {
    const res = await fetch(`${API_URL}/api/v1/legal/${slug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    if (!isLegalDoc(data)) throw new Error("Malformed legal document");
    return {
      slug: data.slug ?? slug,
      title: data.title,
      sections: data.sections,
      version: typeof data.version === "number" ? data.version : 1,
      updatedAt:
        typeof data.updatedAt === "string" && data.updatedAt
          ? data.updatedAt
          : LEGAL_FALLBACK_UPDATED_AT,
    };
  } catch {
    return LEGAL_FALLBACK[slug];
  }
}

export function formatLegalDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
