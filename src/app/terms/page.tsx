import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDoc } from "@/lib/legal";

// Re-fetch the backend-managed terms at most once an hour (ISR).
export const revalidate = 3600;

const description =
  "The terms that govern your use of Bartera — swapping items, Bartera Coins, conduct, moderation and account deletion.";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description,
  path: "/terms",
});

export default async function TermsOfServicePage() {
  const doc = await getLegalDoc("terms");
  return <LegalDocument doc={doc} />;
}
