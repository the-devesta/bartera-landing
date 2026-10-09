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
      "Browse the feed for things worth swapping, send an offer with something you own (adding a cash top-up if the values differ), negotiate in chat until the trade feels fair, both tap confirm, then exchange and rate each other.",
  },
  {
    question: "Is Bartera really free? Do I need cash?",
    answer:
      "Bartera is an exchange marketplace — you trade items for items. If values differ, you can add a cash top-up, which the two traders settle directly between themselves. Listing and browsing are free, and your first completed deal is free.",
  },
  {
    question: "How do I make an offer on an item?",
    answer:
      "Pick something you own, attach it to the offer, add a cash top-up if the values are uneven, and send it to the owner. They can accept, reject, or send a counter-offer.",
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
      "Coins are an in-app credit for Bartera features: the fee for each completed deal after your first free one, boosting a listing to the top, and featuring it on the home feed. You earn coins while setting up and can buy coin packs in the app through the App Store or Google Play. Coins have no cash value, can't be withdrawn or transferred, and are never paid to the other trader.",
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
