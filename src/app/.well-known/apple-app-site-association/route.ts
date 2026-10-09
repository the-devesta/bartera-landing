import { IOS_BUNDLE_ID } from "@/lib/site";

/**
 * Apple universal links / shared web credentials.
 * Team ID comes from env APPLE_TEAM_ID (falls back to the team ID declared in
 * mobile/app.json). Served at /.well-known/apple-app-site-association with
 * Content-Type: application/json and no redirect, as Apple requires.
 */
export const dynamic = "force-dynamic";

const FALLBACK_TEAM_ID = "63DRL842JX";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID || FALLBACK_TEAM_ID;
  const appId = `${teamId}.${IOS_BUNDLE_ID}`;

  return Response.json(
    {
      applinks: {
        details: [
          {
            appIDs: [appId],
            components: [
              { "/": "/support*", exclude: true, comment: "Web-only pages" },
              { "/": "/privacy*", exclude: true },
              { "/": "/terms*", exclude: true },
              { "/": "/delete-account*", exclude: true },
              { "/": "/l/*", comment: "Listing links" },
              { "/": "/u/*", comment: "Profile links" },
              { "/": "/reset-password*", comment: "Password reset" },
            ],
          },
        ],
      },
      webcredentials: { apps: [appId] },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
