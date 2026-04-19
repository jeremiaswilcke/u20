/**
 * Instagram Graph API Client
 *
 * Benötigt:
 *   INSTAGRAM_ACCESS_TOKEN  — Long-lived User Token (60 Tage gültig, auto-refresh via /api/instagram/refresh)
 *   INSTAGRAM_USER_ID       — Numerische User-ID des @u20slamwien-Accounts
 *
 * Docs: https://developers.facebook.com/docs/instagram-platform/instagram-graph-api
 */

const API_BASE = "https://graph.instagram.com";

export interface IGPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: { data: Array<{ id: string; media_url: string; media_type: string }> };
}

export interface IGPostNormalized {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: IGPost["media_type"];
}

function getToken(): string | null {
  return process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

function getUserId(): string | null {
  return process.env.INSTAGRAM_USER_ID || null;
}

/**
 * Fetch recent Instagram posts
 */
export async function fetchInstagramPosts(limit = 12): Promise<IGPostNormalized[]> {
  const token = getToken();
  const userId = getUserId();

  if (!token || !userId) {
    console.warn("[instagram] INSTAGRAM_ACCESS_TOKEN oder INSTAGRAM_USER_ID nicht gesetzt");
    return [];
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `${API_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 900 }, // 15 Min Cache
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[instagram] API Fehler:", res.status, errText);
      return [];
    }

    const json = (await res.json()) as { data: IGPost[] };
    return (json.data || []).map(normalize);
  } catch (err) {
    console.error("[instagram] Fetch fehlgeschlagen:", err);
    return [];
  }
}

/**
 * Fetch a single Instagram post by ID
 */
export async function fetchInstagramPost(postId: string): Promise<IGPostNormalized | null> {
  const token = getToken();
  if (!token) return null;

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `${API_BASE}/${postId}?fields=${fields}&access_token=${token}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const post = (await res.json()) as IGPost;
    return normalize(post);
  } catch {
    return null;
  }
}

/**
 * Refresh a long-lived token (gültig 60 Tage, muss vor Ablauf refreshed werden)
 * Gibt den neuen Token zurück — muss dann manuell in .env gespeichert werden
 * oder via Webhook/Cron aktualisiert werden.
 */
export async function refreshInstagramToken(): Promise<string | null> {
  const token = getToken();
  if (!token) return null;

  const url = `${API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[instagram] Token-Refresh fehlgeschlagen:", res.status);
      return null;
    }
    const json = (await res.json()) as { access_token: string; expires_in: number };
    console.log(`[instagram] Token refreshed, gültig für ${Math.round(json.expires_in / 86400)} Tage`);
    return json.access_token;
  } catch (err) {
    console.error("[instagram] Token-Refresh Fehler:", err);
    return null;
  }
}

function normalize(post: IGPost): IGPostNormalized {
  return {
    id: post.id,
    caption: post.caption || "",
    imageUrl: post.media_type === "VIDEO" ? (post.thumbnail_url || post.media_url) : post.media_url,
    permalink: post.permalink,
    timestamp: post.timestamp,
    mediaType: post.media_type,
  };
}

/**
 * Extrahiert den ersten Satz oder die ersten ~160 Zeichen aus einer IG-Caption
 * als Excerpt für die Blog-Ansicht
 */
export function captionToExcerpt(caption: string, maxLen = 160): string {
  // Hashtags und Mentions am Ende entfernen
  const cleaned = caption.replace(/(\n\n|\n)([#@][\w][\s\S]*)$/, "").trim();
  // Ersten Absatz nehmen
  const firstPara = cleaned.split(/\n\n/)[0] || cleaned;
  if (firstPara.length <= maxLen) return firstPara;
  return firstPara.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

/**
 * Extrahiert einen Titel aus der Caption (erster Satz oder erste Zeile)
 */
export function captionToTitle(caption: string): string {
  const firstLine = caption.split("\n")[0] || "";
  // Wenn die erste Zeile kurz genug ist, verwende sie als Titel
  if (firstLine.length <= 80) return firstLine;
  // Sonst ersten Satz
  const firstSentence = firstLine.match(/^[^.!?]+[.!?]/)?.[0];
  if (firstSentence && firstSentence.length <= 80) return firstSentence;
  return firstLine.slice(0, 60) + "…";
}
