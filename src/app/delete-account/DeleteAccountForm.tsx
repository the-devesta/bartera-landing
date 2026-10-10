"use client";

import { useState } from "react";
import { API_URL } from "@/lib/site";

type Method = "email" | "phone";
type Step = "identify" | "verify" | "confirm" | "done";

const API = `${API_URL}/api/v1`;

/** Pulls a readable message out of the API's error envelope. */
async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) return body.message.join(". ");
    if (body.message) return body.message;
  } catch {
    // Non-JSON error body — use the fallback.
  }
  return fallback;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid var(--border2)",
  background: "var(--surface2)",
  color: "var(--text)",
  fontSize: 16,
};

const buttonStyle = (danger = false): React.CSSProperties => ({
  padding: "12px 20px",
  borderRadius: 999,
  border: "none",
  background: danger ? "#E5484D" : "var(--text)",
  color: danger ? "#fff" : "var(--bg)",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
});

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid var(--border2)",
  background: active ? "var(--text)" : "transparent",
  color: active ? "var(--bg)" : "var(--text)",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
});

/**
 * Self-serve account deletion on the web (Google Play's account-deletion
 * requirement): verify ownership with a one-time code, confirm, then call
 * the same `DELETE /users/me` the app uses.
 */
export default function DeleteAccountForm() {
  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("identify");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const target = identifier.trim();
  const identifierValid =
    method === "email" ? /^\S+@\S+\.\S+$/.test(target) : /^[6-9]\d{9}$/.test(target);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const sendCode = () =>
    run(async () => {
      const res = await fetch(`${API}/auth/${method}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(method === "email" ? { email: target, theme: "light" } : { phone: target }),
      });
      if (!res.ok) throw new Error(await errorMessage(res, "Couldn't send the code. Please try again."));
      setStep("verify");
    });

  const verifyCode = () =>
    run(async () => {
      const res = await fetch(`${API}/auth/${method}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(method === "email" ? { email: target, code } : { phone: target, code }),
      });
      if (!res.ok) throw new Error(await errorMessage(res, "That code didn't work. Check it and try again."));
      const body = (await res.json()) as {
        data?: { tokens?: { accessToken?: string } };
        tokens?: { accessToken?: string };
      };
      const accessToken = body.data?.tokens?.accessToken ?? body.tokens?.accessToken;
      if (!accessToken) throw new Error("Verification failed. Please try again.");
      setToken(accessToken);
      setStep("confirm");
    });

  const deleteAccount = () =>
    run(async () => {
      const res = await fetch(`${API}/users/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await errorMessage(res, "Couldn't delete the account. Please contact support."));
      setToken(null);
      setStep("done");
    });

  if (step === "done") {
    return (
      <p role="status">
        <strong>Your account has been deleted.</strong> You have been signed out on all devices.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 440 }}>
      {step === "identify" && (
        <>
          <div style={{ display: "flex", gap: 8 }} role="tablist">
            {(["email", "phone"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={method === m}
                style={tabStyle(method === m)}
                onClick={() => {
                  setMethod(m);
                  setIdentifier("");
                  setError(null);
                }}
              >
                {m === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>{method === "email" ? "Email registered to your account" : "Phone number (10 digits)"}</span>
            <input
              style={inputStyle}
              type={method === "email" ? "email" : "tel"}
              inputMode={method === "email" ? "email" : "numeric"}
              autoComplete={method === "email" ? "email" : "tel-national"}
              placeholder={method === "email" ? "you@example.com" : "98104 00000"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </label>
          <div>
            <button type="button" style={buttonStyle()} disabled={!identifierValid || busy} onClick={sendCode}>
              {busy ? "Sending…" : "Send verification code"}
            </button>
          </div>
        </>
      )}

      {step === "verify" && (
        <>
          <p>
            Enter the 6-digit code we sent to <strong>{target}</strong>
            {method === "phone" ? " on WhatsApp" : ""}.
          </p>
          <input
            style={inputStyle}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" style={buttonStyle()} disabled={code.length !== 6 || busy} onClick={verifyCode}>
              {busy ? "Verifying…" : "Verify"}
            </button>
            <button
              type="button"
              style={tabStyle(false)}
              onClick={() => {
                setStep("identify");
                setCode("");
              }}
            >
              Back
            </button>
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <p>
            This permanently deletes your Bartera account, listings and personal data. Unused coins are
            forfeited. <strong>This cannot be undone.</strong>
          </p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>
              Type <strong>DELETE</strong> to confirm
            </span>
            <input style={inputStyle} value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
          </label>
          <div>
            <button
              type="button"
              style={buttonStyle(true)}
              disabled={confirmText !== "DELETE" || busy}
              onClick={deleteAccount}
            >
              {busy ? "Deleting…" : "Permanently delete my account"}
            </button>
          </div>
        </>
      )}

      {error && (
        <p role="alert" style={{ color: "#E5484D" }}>
          {error}
        </p>
      )}
    </div>
  );
}
