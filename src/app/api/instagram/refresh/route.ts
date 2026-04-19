import { NextResponse } from "next/server";
import { refreshInstagramToken } from "@/lib/instagram";

export const runtime = "nodejs";

/**
 * GET /api/instagram/refresh
 *
 * Refreshed den Instagram Long-Lived Token.
 * Aufruf z.B. alle 50 Tage per Cron (Token ist 60 Tage gültig).
 *
 * Geschützt durch CRON_SECRET — ohne Header wird 401 zurückgegeben.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newToken = await refreshInstagramToken();

  if (!newToken) {
    return NextResponse.json(
      { error: "Token-Refresh fehlgeschlagen — prüfe INSTAGRAM_ACCESS_TOKEN" },
      { status: 502 }
    );
  }

  // In der Praxis: hier den neuen Token in einem Secret-Manager oder
  // Vercel Environment Variable speichern. Für jetzt: nur zurückgeben.
  return NextResponse.json({
    ok: true,
    message: "Token erfolgreich refreshed. Bitte in .env aktualisieren.",
    token_preview: newToken.slice(0, 12) + "…",
  });
}
