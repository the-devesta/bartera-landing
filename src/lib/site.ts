/** Shared site-wide constants (safe for both server and client components). */

export const SITE_URL = "https://bartera.in";
export const SUPPORT_EMAIL = "support@bartera.in";

/** Backend base URL. `API_URL` (server-only) wins over the public one. */
export const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.bartera.in";

/** Store listing URLs — badges only render when these are set. */
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL || "";
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "";

/** Mobile app identifiers (mirrors mobile/app.json). */
export const IOS_BUNDLE_ID = "com.khaaonow.bartera";
export const ANDROID_PACKAGE = "com.khaaonow.bartera";
