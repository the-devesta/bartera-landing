"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

// Backend waitlist endpoint. Override via NEXT_PUBLIC_API_URL (e.g. local dev).
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.bartera.in";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seg, setSeg] = useState("");
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const segOpts = ["Love it", "Curious", "Skeptical"];

  const sectionRef = useRef<HTMLElement | null>(null);

  // Track when the waitlist section becomes visible (funnel entry point).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired) {
          fired = true;
          track("waitlist_view");
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const firstTrade = (form.elements.namedItem("firsttrade") as HTMLInputElement)?.value.trim() ?? "";
    const thoughts = (form.elements.namedItem("thoughts") as HTMLTextAreaElement)?.value.trim() ?? "";

    if (!email) {
      (form.elements.namedItem("email") as HTMLInputElement)?.focus();
      return;
    }

    // Detect the user's UI theme so the confirmation email matches (light/dark).
    let theme: "light" | "dark" = "dark";
    try {
      const stored = localStorage.getItem("bartera-theme");
      if (stored === "light" || stored === "dark") {
        theme = stored;
      } else {
        theme =
          window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
      }
    } catch {}

    track("waitlist_submit_attempt", { theme, sentiment: seg || undefined });

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          theme,
          sentiment: seg || undefined,
          starRating: star || undefined,
          firstTrade: firstTrade || undefined,
          thoughts: thoughts || undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const already = body?.message === "This email is already on the waitlist";
        if (already) {
          track("waitlist_already_joined", { email });
          setAlreadyJoined(true);
        } else {
          track("waitlist_error", { email, message: body?.message ?? "unknown" });
          setError(
            body?.message === "This email is already on the waitlist"
              ? "You're already on the list!"
              : "Something went wrong. Please try again.",
          );
        }
        return;
      }
      track("waitlist_joined", {
        theme,
        sentiment: seg || undefined,
        starRating: star || undefined,
      });
      setSubmitted(true);
    } catch {
      track("waitlist_error", { message: "network" });
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    fontFamily: "var(--font-space-grotesk)",
    fontSize: 16,
    background: "var(--bg)",
    border: "1px solid var(--border2)",
    color: "var(--text)",
    borderRadius: 12,
    padding: "15px 18px",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-space-grotesk)",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
  };

  const starFill = (n: number) =>
    n <= (hoverStar || star)
      ? { fill: "var(--amber)", stroke: "var(--amber)" }
      : { fill: "none", stroke: "var(--border2)" };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        borderTop: "1px solid var(--border)",
        padding: "120px 28px 90px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="bt-waitlist-grid"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 70,
          alignItems: "start",
        }}
      >
        <div>
          <div
            data-anim="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--acidText)",
              border: "1px solid var(--acidText)",
              borderRadius: 100,
              padding: "7px 15px",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--acid)",
              }}
            />
            Early access — limited spots
          </div>
          <h2
            data-anim="up"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "clamp(40px,6vw,80px)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Join the
            <br />
            waitlist.
          </h2>
          <p
            data-anim="up"
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 440,
              marginBottom: 40,
            }}
          >
            Be first to trade when Bartera opens — and tell us what would make
            you swap instead of buy. Your answers shape what we build.
          </p>
          <div
            data-anim="up"
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {[
              { n: 1, t: "Drop your email — no spam, just the launch", c: "var(--acidText)" },
              { n: 2, t: "Share a few thoughts on the idea", c: "var(--violetText)" },
              { n: 3, t: "Get your invite when we go live", c: "var(--amberText)" },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-unbounded)",
                    fontWeight: 700,
                    color: s.c,
                  }}
                >
                  {s.n}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: 16,
                    color: "var(--muted)",
                  }}
                >
                  {s.t}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-anim="up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 26,
            padding: "clamp(26px,3vw,42px)",
            boxShadow: "var(--cardShadow)",
          }}
        >
          {submitted || alreadyJoined ? (
            <div data-wl-thanks style={{ textAlign: "center", padding: "30px 10px" }}>
              {alreadyJoined ? (
                <div
                  style={{
                    border: "1px dashed var(--border2)",
                    borderRadius: 18,
                    padding: "26px 18px",
                    marginBottom: 22,
                    background: "var(--glow)",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 18px",
                    }}
                  >
                    <img src="/assets/mark-acid.png" data-mark="dark" alt="Bartera" style={{ width: 36, height: 36 }} />
                    <img src="/assets/mark-ink.png" data-mark="light" alt="Bartera" style={{ width: 36, height: 36 }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-unbounded)",
                      fontWeight: 700,
                      fontSize: 24,
                      marginBottom: 10,
                    }}
                  >
                    You&apos;re already on the list.
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      maxWidth: 300,
                      margin: "0 auto",
                    }}
                  >
                    No need to sign up again — we&apos;ve saved your spot and
                    will email your invite the moment we open the doors.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "var(--acid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 22px",
                    }}
                  >
                    <img src="/assets/mark-acid.png" data-mark="dark" alt="Bartera" style={{ width: 40, height: 40 }} />
                    <img src="/assets/mark-ink.png" data-mark="light" alt="Bartera" style={{ width: 40, height: 40 }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-unbounded)",
                      fontWeight: 700,
                      fontSize: 30,
                      marginBottom: 12,
                    }}
                  >
                    You&apos;re on the list.
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      maxWidth: 340,
                      margin: "0 auto",
                    }}
                  >
                    Thanks for shaping Bartera — we&apos;ll email your invite the
                    moment we open the doors.
                  </p>
                </>
              )}
            </div>
          ) : (
            <form
              data-wl-form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 26 }}
            >
              <div>
                <label style={labelStyle}>Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  How do you feel about swapping instead of buying?
                </label>
                <div data-seg style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {segOpts.map((opt) => {
                    const active = seg === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        data-seg-opt={opt}
                        onClick={() => {
                          setSeg(opt);
                          track("waitlist_sentiment", { sentiment: opt });
                        }}
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          fontSize: 14,
                          fontWeight: 500,
                          padding: "11px 18px",
                          borderRadius: 100,
                          border: active ? "1px solid var(--acid)" : "1px solid var(--border2)",
                          background: active ? "var(--acid)" : "transparent",
                          color: active ? "var(--acidInk)" : "var(--text)",
                          cursor: "pointer",
                          transition: "all .18s ease",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelStyle}>What would you trade first?</label>
                <input
                  type="text"
                  name="firsttrade"
                  placeholder="e.g. my old DSLR for a mountain bike"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  How likely are you to use Bartera?
                </label>
                <div
                  data-stars
                  style={{ display: "flex", gap: 8 }}
                  onMouseLeave={() => setHoverStar(0)}
                >
                  {[1, 2, 3, 4, 5].map((n) => {
                    const f = starFill(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        data-star={n}
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        onMouseEnter={() => setHoverStar(n)}
                        onClick={() => {
                          setStar(n);
                          track("waitlist_star_rating", { rating: n });
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          lineHeight: 1,
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill={f.fill}
                          stroke={f.stroke}
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelStyle}>
                  Anything you&apos;d want Bartera to nail?
                </label>
                <textarea
                  name="thoughts"
                  rows={3}
                  placeholder="Tell us what would make this a yes for you…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              {error && (
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: 14,
                    color: "var(--acidText)",
                    background: "var(--glow)",
                    borderRadius: 12,
                    padding: "12px 16px",
                  }}
                >
                  {error}
                </div>
              )}
              <button
                type="submit"
                data-magnetic
                disabled={submitting}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 5px var(--glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 16,
                  fontWeight: 600,
                  background: "var(--acid)",
                  color: "var(--acidInk)",
                  border: "none",
                  padding: "17px 30px",
                  borderRadius: 100,
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  transition: "transform .2s ease, box-shadow .2s ease",
                }}
              >
                {submitting ? "Joining…" : "Join the waitlist →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
