import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface Payload {
  kind?: string;
  name?: string;
  email?: string;
  message?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Ungültiger Request-Body" }, { status: 400 });
  }

  const { kind, name, email, message } = data;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, E-Mail und Nachricht sind Pflicht." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "E-Mail-Adresse scheint ungültig." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? "U20 Poetry Slam <noreply@u20poetryslam.at>";
  const to = process.env.CONTACT_TO ?? "info@u20poetryslam.at";

  const subject = `[U20 Website] ${kind ?? "Neue Nachricht"} — ${name}`;
  const bodyText = [
    `Anliegen: ${kind ?? "—"}`,
    `Name:     ${name}`,
    `E-Mail:   ${email}`,
    "",
    "Nachricht:",
    message,
  ].join("\n");

  const bodyHtml = `
    <h2 style="font-family:system-ui,sans-serif;">Neue Nachricht über u20poetryslam.at</h2>
    <p style="font-family:system-ui,sans-serif;line-height:1.5;">
      <strong>Anliegen:</strong> ${escapeHtml(kind ?? "—")}<br>
      <strong>Name:</strong> ${escapeHtml(name)}<br>
      <strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
    </p>
    <p style="font-family:system-ui,sans-serif;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
  `;

  // Im Dev ohne Resend-Key einfach loggen und success zurück (damit Entwicklung läuft)
  if (!apiKey) {
    console.log("[contact] Kein RESEND_API_KEY gesetzt — Nachricht nur geloggt:\n" + bodyText);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: bodyText,
        html: bodyHtml,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[contact] Resend-Fehler:", res.status, errText);
      return NextResponse.json(
        { error: "E-Mail-Versand fehlgeschlagen." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unerwarteter Fehler:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
