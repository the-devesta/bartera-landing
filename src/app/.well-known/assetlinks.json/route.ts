import { ANDROID_PACKAGE } from "@/lib/site";

/**
 * Android App Links verification. Set ANDROID_SHA256_CERT to the Play App
 * Signing SHA-256 fingerprint (comma-separate multiple, e.g. upload + Play
 * signing keys). Returns an empty list until configured, so verification
 * simply fails closed instead of advertising a bogus fingerprint.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const fingerprints = (process.env.ANDROID_SHA256_CERT || "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  const body = fingerprints.length
    ? [
        {
          relation: [
            "delegate_permission/common.handle_all_urls",
            "delegate_permission/common.get_login_creds",
          ],
          target: {
            namespace: "android_app",
            package_name: ANDROID_PACKAGE,
            sha256_cert_fingerprints: fingerprints,
          },
        },
      ]
    : [];

  return Response.json(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
