"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires a `section_view` event (once) when the attached section scrolls into
 * view. Usage:
 *   const sectionRef = useSectionView("how_it_works");
 *   <section ref={sectionRef} id="how">…</section>
 * The element's own `id` (used for anchor links) is preserved.
 */
export function useSectionView(name: string) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired) {
          fired = true;
          track("section_view", { section: name });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name]);

  return ref;
}
