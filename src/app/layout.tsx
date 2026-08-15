import type { Metadata } from "next";
import Script from "next/script";
import { Onest, Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://bartera.in";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bartera",
  url: siteUrl,
  logo: `${siteUrl}/assets/mark-acid.png`,
  description:
    "Bartera is a peer-to-peer marketplace for swapping what you own for what you want — no cash required, just a fair deal.",
  sameAs: [
    "https://www.instagram.com/bartera.in",
    "https://www.facebook.com/bartera.in",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bartera — A marketplace for exchange, not cash",
    template: "%s · Bartera",
  },
  description:
    "List what you have, discover what you want, and negotiate a fair swap — item for item, or with a little coin to balance it out. AI checks give you a confidence read on every listing.",
  applicationName: "Bartera",
  keywords: [
    "barter",
    "bartering",
    "swap items",
    "trade things",
    "no cash marketplace",
    "second hand exchange",
    "peer to peer trading India",
    "sell without money",
  ],
  icons: {
    icon: [
      { url: "/assets/mark-acid.png", media: "(prefers-color-scheme: dark)" },
      { url: "/assets/mark-ink.png", media: "(prefers-color-scheme: light)" },
    ],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bartera",
    title: "Bartera — A marketplace for exchange, not cash",
    description:
      "Swap things you own for things you want. Negotiate item-for-item, or add a little coin to balance it out. Trade with verified people you can trust.",
    images: [
      {
        url: `${siteUrl}/assets/mark-acid.png`,
        width: 512,
        height: 512,
        alt: "Bartera",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Bartera — A marketplace for exchange, not cash",
    description:
      "Swap things you own for things you want. Negotiate item-for-item, or add a little coin to balance it out.",
    images: [`${siteUrl}/assets/mark-acid.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "theme-color": "#0B0D07",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${spaceGrotesk.variable} ${unbounded.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bartera-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else{var s=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',s);}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        {children}

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){ dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
