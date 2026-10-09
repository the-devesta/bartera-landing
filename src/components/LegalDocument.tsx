import PageShell, { Section } from "@/components/PageShell";
import { formatLegalDate, type LegalDoc } from "@/lib/legal";

/** Renders a legal document (privacy / terms). Server component. */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const lastUpdated = formatLegalDate(doc.updatedAt);

  return (
    <PageShell
      title={doc.title}
      subtitle={
        lastUpdated ? (
          <p style={{ fontSize: 15 }}>
            Last updated: {lastUpdated} · Version {doc.version}
          </p>
        ) : null
      }
    >
      <article style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {doc.sections.map((section, i) => (
          <Section key={i} heading={section.heading} first={i === 0}>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} style={{ whiteSpace: "pre-line" }}>
                {para}
              </p>
            ))}
          </Section>
        ))}
      </article>
    </PageShell>
  );
}
