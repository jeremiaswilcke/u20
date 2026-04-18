"use client";

import * as React from "react";

type Format = "A" | "B" | "C" | "offen";

const FORMAT_LABELS: Record<Format, string> = {
  A: "Format A — Slam-Besuch mit Vorbereitung",
  B: "Format B — Werkstatt (Halbtag)",
  C: "Format C — Projektwoche",
  offen: "Noch unklar — einfach Gespräch",
};

export function TeacherForm() {
  const [format, setFormat] = React.useState<Format>("A");
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
          kind: `Lehrer-Anfrage · ${FORMAT_LABELS[format]}`,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      form.reset();
      setFormat("A");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <form className="form-fields" onSubmit={onSubmit}>
      <div className="form-row">
        <label>Format</label>
        <div className="radio-group">
          {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
            <label key={f}>
              <input
                type="radio"
                name="format"
                checked={format === f}
                onChange={() => setFormat(f)}
              />{" "}
              {FORMAT_LABELS[f]}
            </label>
          ))}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="l-name">Ihr Name &amp; Schule</label>
        <input
          id="l-name"
          name="name"
          type="text"
          placeholder="Mag. Beispiel · BG Beispielgasse"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="l-email">E-Mail</label>
        <input
          id="l-email"
          name="email"
          type="email"
          placeholder="name@schule.at"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="l-message">Worum geht&apos;s?</label>
        <textarea
          id="l-message"
          name="message"
          placeholder="Schulstufe, ungefähre Wunschzeit, Klassenstärke …"
          required
        />
      </div>
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Senden …" : "Anfrage senden →"}
      </button>
      {status === "ok" && (
        <p style={{ color: "var(--u-magenta)", marginTop: "0.5rem" }}>
          Danke! Wir melden uns innerhalb von 3 Werktagen.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "#c00", marginTop: "0.5rem" }}>
          Ups — das hat nicht geklappt. {error ?? ""} Schreiben Sie uns direkt
          an <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
        </p>
      )}
    </form>
  );
}
