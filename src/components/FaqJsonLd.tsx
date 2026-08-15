"use client";

/**
 * FAQPage structured data (JSON-LD) so search engines and LLMs can surface
 * Bartera's core concepts. Keep questions/answers in sync with the visible
 * copy in HowItWorks / Offer / Trust / Coins.
 */

const faqs = [
  {
    question: "How does Bartera work?",
    answer:
      "Browse the feed for things worth swapping, send an offer with something you own (adding a little coin if needed), negotiate in chat until the trade feels fair, both tap confirm, then exchange and rate each other.",
  },
  {
    question: "Is Bartera really free? Do I need cash?",
    answer:
      "Bartera is an exchange marketplace — you trade items for items. You can add a small coin component only when it's needed to balance the value of a deal. No purchase is required.",
  },
  {
    question: "How do I make an offer on an item?",
    answer:
      "Pick something you own, attach it to the offer, add coin if the values are uneven, and send it to the owner. They can accept, reject, or send a counter-offer.",
  },
  {
    question: "How does the negotiation work?",
    answer:
      "Offers and counter-offers go back and forth in chat. Every change stays crystal clear, and when both of you agree, the deal is locked.",
  },
  {
    question: "How can I trust who I'm trading with?",
    answer:
      "Identities are verified, every member has real ratings and reviews, and an AI image check reads listing photos for signs of tampering before you trade.",
  },
  {
    question: "What are Bartera Coins?",
    answer:
      "Coins are a small balance used to level out a trade when the items don't match in value — for example, adding 40 coins on top of a vinyl set to match a film camera. They're not a cash purchase; they just balance the swap.",
  },
];

export default function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }),
      }}
    />
  );
}
