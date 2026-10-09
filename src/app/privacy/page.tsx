import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDoc } from "@/lib/legal";

// Re-fetch the backend-managed policy at most once an hour (ISR).
export const revalidate = 3600;

const description =
  "How Bartera collects, uses and protects your personal information — payments, image storage, error tracking, notifications, blocking, reporting and account deletion.";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
});

export default async function PrivacyPolicyPage() {
  const doc = await getLegalDoc("privacy");
  return <LegalDocument doc={doc} />;
}
