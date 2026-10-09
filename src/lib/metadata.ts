import type { Metadata } from "next";

/**
 * Per-page metadata helper. A page-level `openGraph` object replaces the root
 * one entirely, so re-declare the shared fields (incl. the 1200×630 card from
 * app/opengraph-image.tsx) here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Bartera — A marketplace for exchange, not cash",
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Bartera",
      locale: "en_IN",
      title: `${title} · Bartera`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Bartera`,
      description,
      images: [image.url],
    },
  };
}
