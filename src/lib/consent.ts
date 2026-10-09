"use client";

/**
 * Tiny analytics-consent store backed by localStorage (with an in-memory
 * fallback when storage is unavailable, e.g. private mode / blocked cookies).
 */

export type Consent = "granted" | "denied" | null;

const KEY = "bartera-analytics-consent";
const listeners = new Set<() => void>();
let memory: Consent = null;

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "granted" || v === "denied") return v;
    return memory;
  } catch {
    return memory;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function setConsent(value: Exclude<Consent, null>): void {
  memory = value;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable — keep in-memory choice for this page view */
  }
  emit();
}

/** Clear the stored choice so the banner is shown again. */
export function resetConsent(): void {
  memory = null;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
