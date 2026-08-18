"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LegalPage {
  slug: string;
  title: string;
  sections: Array<{ heading: string; body: string }>;
  version: number;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.bartera.in";

const fallbackContent = {
  slug: "privacy",
  title: "Privacy Policy",
  sections: [
    {
      heading: "Introduction",
      body: "Bartera (\"we\", \"our\", \"us\") respects your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our mobile application and website (the \"Service\")."
    },
    {
      heading: "Information We Collect",
      body: "We collect information you provide directly to us, such as when you create an account, join the waitlist, or contact us. This may include your name, email address, phone number, and any other information you choose to provide."
    },
    {
      heading: "How We Use Your Information",
      body: "We use the information we collect to provide, maintain, and improve our Service, to communicate with you, and to comply with legal obligations."
    },
    {
      heading: "Information Sharing",
      body: "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, or as required by law."
    },
    {
      heading: "Data Security",
      body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      heading: "Your Rights",
      body: "Depending on your location, you may have rights to access, correct, delete, or restrict the processing of your personal information. Contact us at support@bartera.in to exercise these rights."
    },
    {
      heading: "Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date."
    },
    {
      heading: "Contact Us",
      body: "If you have questions about this Privacy Policy, please contact us at support@bartera.in."
    }
  ],
  version: 1,
  updatedAt: new Date().toISOString()
};

export default function PrivacyPolicyPage() {
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`${API_URL}/api/v1/legal/privacy`, {
          headers: { Accept: "application/json" },
          next: { revalidate: 300 },
        });
        if (res.ok) {
          const data = await res.json();
          setPage(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, []);

  const content = page ?? fallbackContent;
  const lastUpdated = content.updatedAt ? new Date(content.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) : "";

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 24px 120px", background: "var(--bg)", color: "var(--text)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="bt-skeleton" style={{ width: 140, height: 32, borderRadius: 100, marginBottom: 28 }} />
          <div className="bt-skeleton" style={{ width: "65%", height: 48, marginBottom: 16 }} />
          <div className="bt-skeleton" style={{ width: 220, height: 18, marginBottom: 48 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: i > 0 ? "1px solid var(--border)" : "none", paddingTop: i > 0 ? 32 : 0 }}>
                <div className="bt-skeleton" style={{ width: i % 2 === 0 ? "35%" : "45%", height: 26, marginBottom: 6 }} />
                <div className="bt-skeleton" style={{ width: "100%", height: 16 }} />
                <div className="bt-skeleton" style={{ width: "94%", height: 16 }} />
                <div className="bt-skeleton" style={{ width: i % 2 === 0 ? "85%" : "70%", height: 16 }} />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "80px 24px 120px", background: "var(--bg)", color: "var(--text)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <header style={{ marginBottom: 48 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, color: "var(--muted)", textDecoration: "none" }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </span>
            Back to Bartera
          </Link>
          <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>
            {content.title}
          </h1>
          {lastUpdated && (
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              Last updated: {lastUpdated} · Version {content.version}
            </p>
          )}
        </header>

        <article style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {content.sections.map((section, i) => (
            <section key={i} style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none", paddingTop: i > 0 ? 32 : 0 }}>
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", marginBottom: 12, color: "var(--ink)" }}>
                {section.heading}
              </h2>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: "var(--body)" }}>
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} style={{ marginBottom: j < section.body.split("\n\n").length - 1 ? 16 : 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <footer style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ color: "var(--faint)", fontSize: 14 }}>
            Bartera — exchange, not cash. &copy; {new Date().getFullYear()} Bartera
          </p>
        </footer>
      </div>
    </main>
  );
}