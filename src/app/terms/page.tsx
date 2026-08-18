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
  slug: "terms",
  title: "Terms of Service",
  sections: [
    {
      heading: "Agreement to Terms",
      body: "By accessing or using Bartera's mobile application, website, and services (collectively, the \"Service\"), you agree to be bound by these Terms of Service (\"Terms\"). If you disagree with any part of the Terms, you may not use the Service."
    },
    {
      heading: "Eligibility",
      body: "You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet this requirement."
    },
    {
      heading: "Accounts",
      body: "You may need to create an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      heading: "Trading & Swaps",
      body: "Bartera facilitates item-for-item swaps and cash-balanced trades between users. We are not a party to any transaction between users. You are solely responsible for verifying the condition, authenticity, and legality of items you trade."
    },
    {
      heading: "User Conduct",
      body: "You agree not to: (a) use the Service for any illegal purpose; (b) harass, abuse, or harm other users; (c) post fraudulent, misleading, or prohibited listings; (d) attempt to circumvent any security measures; or (e) interfere with the Service's operation."
    },
    {
      heading: "Intellectual Property",
      body: "The Service and its original content, features, and functionality are owned by Bartera and are protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      heading: "Disclaimers",
      body: "The Service is provided \"as is\" and \"as available\" without warranties of any kind. Bartera does not warrant that the Service will be uninterrupted, error-free, or secure."
    },
    {
      heading: "Limitation of Liability",
      body: "To the maximum extent permitted by law, Bartera shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service."
    },
    {
      heading: "Termination",
      body: "We may terminate or suspend your account and access to the Service at any time, with or without cause, including for breach of these Terms."
    },
    {
      heading: "Governing Law",
      body: "These Terms shall be governed by the laws of India, without regard to its conflict of law provisions."
    },
    {
      heading: "Changes",
      body: "We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms."
    },
    {
      heading: "Contact Us",
      body: "If you have questions about these Terms, please contact us at support@bartera.in."
    }
  ],
  version: 1,
  updatedAt: new Date().toISOString()
};

export default function TermsOfServicePage() {
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`${API_URL}/api/v1/legal/terms`, {
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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--text)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div className="bt-spinner" />
          <p style={{ marginTop: 16, color: "var(--muted)", fontFamily: "var(--font-space-grotesk)", fontSize: 15 }}>Loading terms of service…</p>
        </div>
      </div>
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