import type { Metadata } from "next";
import AppLinkFallback from "@/components/AppLinkFallback";

export const metadata: Metadata = {
  title: "View this profile in Bartera",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppLinkFallback
      title="View this profile in Bartera"
      subtitle="This trader's profile is in the Bartera app."
      appUrl={`bartera://u/${encodeURIComponent(id)}`}
    />
  );
}
