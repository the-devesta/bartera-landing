import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

function origin(url: string | undefined, fallback: string): string {
  try {
    return new URL(url || fallback).origin;
  } catch {
    return fallback;
  }
}

const apiOrigin = origin(process.env.NEXT_PUBLIC_API_URL, "https://api.bartera.in");

// GA4 endpoints (only allowed when NEXT_PUBLIC_GA_ID is configured; the
// script itself still loads only after the visitor accepts the banner).
const gaScript = gaEnabled ? " https://www.googletagmanager.com" : "";
const gaConnect = gaEnabled
  ? " https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
  : "";
const gaImg = gaEnabled
  ? " https://*.google-analytics.com https://*.googletagmanager.com"
  : "";

// Static CSP (no nonces, so pages stay statically rendered). Inline scripts
// are needed for the theme bootstrap, JSON-LD and Next.js hydration.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${gaScript}`,
  "style-src 'self' 'unsafe-inline'",
  // Hero showcases remote product photos over https.
  `img-src 'self' data: blob: https:${gaImg}`,
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin}${gaConnect}${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
