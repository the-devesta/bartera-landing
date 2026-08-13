import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Bartera — A marketplace for exchange, not cash",
  description:
    "List what you have, discover what you want, and negotiate a fair swap — item for item, or with a little coin to balance it out. AI checks give you a confidence read on every listing.",
  icons: {
    icon: [
      { url: "/assets/mark-acid.png", media: "(prefers-color-scheme: dark)" },
      { url: "/assets/mark-ink.png", media: "(prefers-color-scheme: light)" },
    ],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
