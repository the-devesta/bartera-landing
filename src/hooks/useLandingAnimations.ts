"use client";

import { useEffect } from "react";

export function useLandingAnimations() {
  useEffect(() => {
    let disposed = false;
    let lenisInstance: any = null;
    let tickerFn: ((t: number) => void) | null = null;
    let gsapRef: any = null;
    let stRef: any = null;

    const cleanup = () => {
      disposed = true;
      if (tickerFn && gsapRef) gsapRef.ticker.remove(tickerFn);
      if (lenisInstance && lenisInstance.destroy) lenisInstance.destroy();
      if (gsapRef && stRef) {
        stRef.getAll().forEach((t: any) => t.kill());
        gsapRef.killTweensOf("[data-anim='up'], [data-hero], [data-swapcard], [data-swap-icon], [data-bg-glow], [data-poster-mark]");
      }
      gsapRef = null;
      stRef = null;
      lenisInstance = null;
      tickerFn = null;
    };

    const init = async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      const Lenis = (await import("lenis")).default;

      if (disposed) return;
      gsapRef = gsap;
      stRef = ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisInstance = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      document.querySelectorAll("[data-scroll-to]").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("data-scroll-to")!);
          if (t) lenis.scrollTo(t as HTMLElement, { offset: -70, duration: 1.1 });
        });
      });

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from('[data-hero="tag"]', { y: 20, opacity: 0, duration: 0.6 })
        .from('[data-hero="l1"]', { y: 80, opacity: 0, duration: 0.9 }, "-=0.2")
        .from('[data-hero="l2"]', { y: 80, opacity: 0, duration: 0.9 }, "-=0.7")
        .from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from('[data-hero="cta"]', { y: 24, opacity: 0, duration: 0.7 }, "-=0.55")
        .from(
          "[data-swapcard]",
          { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.4"
        )
        .from(
          "[data-swap-icon]",
          { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(2)" },
          "-=0.5"
        );
      gsap.to("[data-swap-icon]", { rotation: 360, repeat: -1, duration: 6, ease: "none" });

      ScrollTrigger.batch('[data-anim="up"]', {
        start: "top 88%",
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      gsap.set('[data-anim="up"]', { y: 40, opacity: 0 });

      gsap.to("[data-bg-glow]", {
        y: 180,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      gsap.to("[data-poster-mark]", {
        rotation: 120,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-poster-mark]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      document.querySelectorAll("[data-count]").forEach((node) => {
        const end = parseFloat(node.getAttribute("data-count")!);
        const suffix = node.getAttribute("data-suffix") || "";
        const dec = end % 1 !== 0;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: node,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: end,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                node.textContent = (dec ? obj.v.toFixed(1) : Math.round(obj.v)) + suffix;
              },
            });
          },
        });
      });

      ScrollTrigger.refresh();
    };

    init();

    return cleanup;
  }, []);
}
