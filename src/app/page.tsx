"use client";

import BackgroundGlows from "@/components/BackgroundGlows";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Offer from "@/components/Offer";
import Trust from "@/components/Trust";
import Coins from "@/components/Coins";
import Poster from "@/components/Poster";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import { useLandingAnimations } from "@/hooks/useLandingAnimations";

export default function LandingPage() {
  useLandingAnimations();

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <BackgroundGlows />
      <Navbar />
      <Hero />
      <Ticker />
      <Problem />
      <HowItWorks />
      <Offer />
      <Trust />
      <Coins />
      <Poster />
      <Waitlist />
      <Footer />
    </div>
  );
}
