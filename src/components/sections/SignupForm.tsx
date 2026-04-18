"use client";

import * as React from "react";

type FormKind = "slam" | "workshop" | "beides" | "frage";

interface SignupFormProps {
  defaultKind?: FormKind;
  submitLabel?: string;
}

const KIND_LABELS: Record<FormKind, string> = {
  slam: "Anmeldung für U20 Poetry Slam",
  workshop: "Anmeldung für schreib' KLASSE!",
  beides: "Anmeldung für beides",
  frage: "Ich möchte etwas fragen",
};

export function SignupForm({
  defaultKind = "slam",
  submitLabel = "Abschicken →",
}: SignupFormProps) {
  const [kind, setKind] = React.useState<FormKind>(defaultKind);
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "ok" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: KIND_LABELS[kind],
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      form.reset();
      setKind(defaultKind);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <form className="form-fields" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label>Worum geht&apos;s?</label>
        <div className="radio-group">
          {(Object.keys(KIND_LABELS) as FormKind[]).map((k) => (
            <label key={k}>
              <input
                type="radio"
                name="kind"
                checked={kind === k}
                onChange={() => setKind(k)}
              />{" "}
              {KIND_LABELS[k]}
            </label>
          ))}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="name">Dein Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Vorname Nachname"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">E-Mail-Adresse</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="du@example.at"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="message">Nachricht</label>
        <textarea
          id="message"
          name="message"
          placeholder="Erzähl uns kurz, was du auf dem Herzen hast …"
          required
        />
      </div>
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Senden …" : submitLabel}
      </button>
      {status === "ok" && (
        <p style={{ color: "var(--u-magenta)", marginTop: "0.5rem" }}>
          Danke! Wir haben deine Nachricht bekommen und melden uns bald.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "#c00", marginTop: "0.5rem" }}>
          Ups — das hat leider nicht geklappt. {error ?? ""} Versuch es erneut
          oder schreib direkt an{" "}
          <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
        </p>
      )}
    </form>
  );
}
