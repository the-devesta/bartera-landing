import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LEGAL_FALLBACK_UPDATED_AT } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(LEGAL_FALLBACK_UPDATED_AT);

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/delete-account`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: legalUpdated, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: legalUpdated, changeFrequency: "monthly", priority: 0.3 },
  ];
}
