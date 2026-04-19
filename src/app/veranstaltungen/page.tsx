import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fetchWP } from "@/lib/wp/api";
import { WpEvent } from "@/lib/wp/types";
import { decodeHtmlEntities, stripHtml } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Veranstaltungen",
  description:
    "Alle kommenden U20 Poetry Slams, Workshops und Specials im Dschungel Wien auf einen Blick.",
};

const MONTHS = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

type EventType = "slam" | "workshop" | "special" | "champ";

async function getUpcomingEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      "/tribe/events/v1/events?per_page=20&start_date=" +
        new Date().toISOString(),
      { next: { revalidate: 60 } }
    );
    return res?.events || [];
  } catch {
    return [];
  }
}

async function getPastEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      "/tribe/events/v1/events?per_page=6&end_date=" +
        new Date().toISOString() +
        "&order=desc",
      { next: { revalidate: 300 } }
    );
    return res?.events || [];
  } catch {
    return [];
  }
}

function classifyEvent(title: string): EventType {
  const t = title.toLowerCase();
  if (t.includes("klasse") || t.includes("workshop")) return "workshop";
  if (t.includes("meisterschaft") || t.includes("wnb")) return "champ";
  if (
    t.includes("halloween") ||
    t.includes("love slam") ||
    t.includes("special")
  )
    return "special";
  return "slam";
}

const TYPE_LABEL: Record<EventType, string> = {
  slam: "Slam",
  workshop: "Workshop",
  special: "Special",
  champ: "Meisterschaft",
};

const FALLBACK_UPCOMING: Array<{
  day: string;
  mon: string;
  type: EventType;
  title: string;
  desc: string;
  time: string;
  venue: string;
  price: string;
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
  big?: boolean;
}> = [
  {
    day: "06", mon: "Mai", type: "workshop",
    title: "schreib' KLASSE!",
    desc: "Der Poetry-Slam-Workshop vor dem Slam. Schreibimpulse, Performance-Tipps, kleine Gruppe.",
    time: "16:00 – 18:00", venue: "Dschungel Wien", price: "€ 8,–",
    ctaLabel: "Mehr Info", ctaHref: "/schreib-klasse",
  },
  {
    day: "06", mon: "Mai", type: "slam",
    title: "U20 Poetry Slam",
    desc: "Junge Slampoet:innen aufgepasst — Bühne 1, drei Minuten, deine Show.",
    time: "19:00 – 21:00", venue: "Bühne 1", price: "€ 8,–",
    ctaLabel: "Ticket", ctaHref: "https://www.dschungelwien.at/u20-poetry-slam",
    highlight: true,
  },
  {
    day: "05", mon: "Jun", type: "workshop",
    title: "schreib' KLASSE!",
    desc: "Letzter Workshop vor der Sommerpause. Teilnehmer:innen dürfen beim Slam danach gratis rein.",
    time: "15:00 – 17:00", venue: "Dschungel Wien", price: "€ 8,–",
    ctaLabel: "Mehr Info", ctaHref: "/schreib-klasse",
  },
  {
    day: "05", mon: "Jun", type: "slam",
    title: "U20 Poetry Slam — Season Finale",
    desc: "Der letzte Slam der Saison. Nominierungen für die Landesmeisterschaft.",
    time: "18:00 – 20:00", venue: "Bühne 1", price: "€ 8,–",
    ctaLabel: "Ticket", ctaHref: "https://www.dschungelwien.at/u20-poetry-slam",
    highlight: true,
  },
  {
    day: "18", mon: "Sep", type: "slam",
    title: "Saisonstart — U20 Poetry Slam",
    desc: "Der Auftakt zur neuen Saison. Viele neue Gesichter, einige alte Held:innen.",
    time: "19:00 – 21:00", venue: "Bühne 1", price: "€ 8,–",
    ctaLabel: "Ticket", ctaHref: "https://www.dschungelwien.at/u20-poetry-slam",
  },
  {
    day: "16", mon: "Okt", type: "special",
    title: "Halloween Slam",
    desc: "Gruseltexte, Kostüme erlaubt, Gänsehaut garantiert. Unser beliebtestes Special des Jahres.",
    time: "19:00 – 21:30", venue: "Bühne 1", price: "€ 8,–",
    ctaLabel: "Ticket", ctaHref: "https://www.dschungelwien.at/u20-poetry-slam",
  },
  {
    day: "14", mon: "Feb", type: "champ",
    title: "U20 WNB-Slam 2026",
    desc: "Landesmeisterschaft für Wien, Niederösterreich und Burgenland. Die Besten auf einer Bühne.",
    time: "17:00 – 22:00", venue: "Bühne 1", price: "€ 12,–",
    ctaLabel: "Meisterschaft", ctaHref: "https://www.dschungelwien.at/u20-poetry-slam",
    highlight: true, big: true,
  },
];

const FALLBACK_PAST = [
  {
    date: "14.02.2025",
    title: "U20 WNB-Slam 2025",
    descHtml: "Landesmeisterschaft Wien/NÖ/Bgld. Sieg: <strong>Lena K.</strong> aus Wiener Neustadt.",
    meta: ["Finale", "ausverkauft"],
  },
  {
    date: "17.05.2024",
    title: "Love Slam",
    descHtml: "Texte über Liebe in allen Formen — Moderation: Adina Wilcke.",
    meta: ["Special", "97 Zuschauer:innen"],
  },
  {
    date: "19.04.2024",
    title: "U20 Slam #7",
    descHtml: "Moderiert von Adina. Davor Workshop mit Annalena.",
    meta: ["Slam", "6 Slammer:innen"],
  },
  {
    date: "15.03.2024",
    title: "U20 Slam #6",
    descHtml: "Die zweite Ausgabe nach der Winterpause. Viele Debütant:innen.",
    meta: ["Slam", "5 Debüts"],
  },
];

export default async function VeranstaltungenPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const liveUpcoming = upcoming.map((e) => {
    const d = new Date(e.start_date);
    const end = new Date(e.end_date);
    const type = classifyEvent(decodeHtmlEntities(e.title));
    return {
      day: String(d.getDate()).padStart(2, "0"),
      mon: MONTHS[d.getMonth()],
      type,
      title: decodeHtmlEntities(e.title),
      desc: e.description ? stripHtml(e.description).slice(0, 120) + "…" : "",
      time: `${d.toLocaleTimeString("de-AT", {
        hour: "2-digit",
        minute: "2-digit",
      })} – ${end.toLocaleTimeString("de-AT", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      venue: e.venue?.venue ? decodeHtmlEntities(e.venue.venue) : "Dschungel Wien",
      price: "€ 8,–",
      ctaLabel: "Ticket",
      ctaHref: e.url || "https://www.dschungelwien.at/u20-poetry-slam",
      highlight: type === "slam" || type === "champ",
      big: type === "champ",
    };
  });

  const rows = liveUpcoming.length > 0 ? liveUpcoming : FALLBACK_UPCOMING;
  const pastRows =
    past.length > 0
      ? past.map((e) => {
          const d = new Date(e.start_date);
          return {
            date: d.toLocaleDateString("de-AT"),
            title: decodeHtmlEntities(e.title),
            descHtml: e.description ? stripHtml(e.description).slice(0, 100) + "…" : "",
            meta: [e.venue?.venue ? decodeHtmlEntities(e.venue.venue) : "Dschungel Wien"],
          };
        })
      : FALLBACK_PAST;

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Veranstaltungen
          </div>
          <h1>Veranstaltungen.</h1>
          <p className="lede">
            Jeden Monat ein Slam im Dschungel Wien — plus Workshop davor, plus
            Specials wie Love Slam, Halloween Slam und die jährliche
            Landesmeisterschaft. Hier findest du alles auf einen Blick.
          </p>
        </div>
      </section>

      {/* FILTER STRIP */}
      <div className="date-strip">
        <div className="container-u date-strip-inner">
          <span className="label">Saison 2025/26</span>
          <span className="pill">9 U20 Slams</span>
          <span className="pill">9 Workshops</span>
          <span className="pill">1 Landesmeisterschaft</span>
          <span className="pill">2 Specials</span>
        </div>
      </div>

      {/* UPCOMING */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Kommende Termine</h2>
            <p>
              Alle Veranstaltungen finden im DSCHUNGEL Wien, Museumsplatz 1,
              1070 Wien statt. Einlass 30 Min. vor Beginn.
            </p>
          </ScrollReveal>

          <ul className="event-list">
            {rows.map((row, i) => (
              <li
                key={i}
                className={`event-row reveal ${
                  row.highlight ? "highlight" : ""
                } ${row.big ? "big" : ""}`.trim()}
              >
                <div className="event-row-date">
                  <span className="d">{row.day}</span>
                  <span className="m">{row.mon}</span>
                </div>
                <div className="event-row-body">
                  <span className={`event-row-type ${row.type}`}>
                    {TYPE_LABEL[row.type]}
                  </span>
                  <h3>{row.title}</h3>
                  {row.desc && <p>{row.desc}</p>}
                  <div className="event-row-meta">
                    <span>{row.time}</span>
                    <span>{row.venue}</span>
                    <span>{row.price}</span>
                  </div>
                </div>
                <div className="event-row-cta">
                  <a
                    className={
                      row.big ? "btn btn-magenta" : row.highlight ? "btn" : "btn btn-ghost"
                    }
                    href={row.ctaHref}
                    target={row.ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={row.ctaHref.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {row.ctaLabel}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PAST */}
      <section className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Vergangene Slams</h2>
            <p>
              Ein paar Höhepunkte aus der Saison — Nachberichte, Fotos und
              Videos findest du auf der <Link href="/medien">Medien-Seite</Link>.
            </p>
          </ScrollReveal>
          <div className="past-grid">
            {pastRows.map((p, i) => (
              <article key={i} className="past-card reveal">
                <div className="past-date">{p.date}</div>
                <h3>{p.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: p.descHtml }} />
                <div className="past-meta">
                  {p.meta.map((m, j) => (
                    <span key={j}>{m}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link className="btn btn-ghost" href="/medien">
              Alle Nachberichte →
            </Link>
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section className="u-section">
        <div className="container-u">
          <div className="venue-block">
            <ScrollReveal>
              <span className="eyebrow">Die Location</span>
              <h2>
                Dschungel Wien.
                <br />
                Bühne 1.
              </h2>
              <p className="lede">
                Museumsplatz 1, 1070 Wien · Im MuseumsQuartier, direkt neben
                mumok. Öffnungszeiten: 30 Minuten vor Slam-Beginn.
              </p>
              <ul className="venue-info">
                <li>
                  <strong>U-Bahn:</strong> U2 Museumsquartier (2 Min.) · U3
                  Volkstheater (4 Min.)
                </li>
                <li>
                  <strong>Straßenbahn:</strong> 49 Volkstheater, 1/2/D Burgring
                </li>
                <li>
                  <strong>Barrierefrei:</strong> Ja — Lift bis Bühne 1,
                  rollstuhlgerechte WCs
                </li>
                <li>
                  <strong>Bar:</strong> Getränke &amp; Snacks im Foyer ab 18:30
                </li>
              </ul>
              <a
                className="btn"
                href="https://www.dschungelwien.at"
                target="_blank"
                rel="noreferrer"
              >
                Dschungel Wien besuchen →
              </a>
            </ScrollReveal>
            <ScrollReveal className="venue-map" aria-hidden="true">
              <div className="map-pin">📍</div>
              <div className="map-label">
                Dschungel Wien
                <br />
                <span>Museumsplatz 1 · 1070</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
