import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EventCard } from "@/components/sections/EventCard";
import { NewsCard } from "@/components/sections/NewsCard";
import { TeamCard } from "@/components/sections/TeamCard";
import { FaqItem } from "@/components/sections/FaqItem";
import { SignupForm } from "@/components/sections/SignupForm";
import { fetchWP } from "@/lib/wp/api";
import { WPPost, WpEvent } from "@/lib/wp/types";

async function getUpcomingEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      "/tribe/events/v1/events?per_page=4&start_date=" +
        new Date().toISOString(),
      { next: { revalidate: 60 } }
    );
    return res?.events || [];
  } catch {
    return [];
  }
}

async function getLatestNews() {
  try {
    return await fetchWP<WPPost[]>(
      "/wp/v2/posts?per_page=3&_embed",
      { next: { revalidate: 300 } }
    );
  } catch {
    return [];
  }
}

const TEAM_FALLBACK = [
  {
    name: "Adina Wilcke",
    role: "Leitung · Moderation",
    description:
      "Künstlerin, Pädagogin, seit 2014 Kopf der U20-Arbeit in Wien. Steht selbst auf europäischen Bühnen.",
  },
  {
    name: "Annalena Schuh",
    role: "Workshop · Slam",
    description:
      "Volksschullehrerin, Slammerin, Berge & Seen. Lieblingsbuchstabe: K.",
  },
  {
    name: "Jeremias",
    role: "Web · Bild · Ton",
    description:
      "Erlebnis-, Zirkus- & Prozesspädagoge. Kümmert sich um Website, Aufnahmen und alles, was Strom braucht.",
  },
];

export default async function HomePage() {
  const [events, news] = await Promise.all([
    getUpcomingEvents(),
    getLatestNews(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-photo">
          <div className="container-u hero-content">
            <div>
              <div className="hero-dates">
                <span className="label">Die nächsten Termine</span>
                06.05. <span className="pipe">|</span> 05.06.{" "}
                <span className="pipe">|</span> 18.09.{" "}
                <span className="pipe">|</span> 16.10.
              </div>
              <h1 className="hero-tagline">
                Erobere
                <br />
                deine Bühne.
              </h1>
              <p className="hero-sub">
                Jeden Monat im DSCHUNGEL Wien: drei Minuten, du, ein Mikro und
                ein Publikum, das dich hören will. Kein Pathos, kein Schema.
                Nur deine Worte.
              </p>
              <div className="hero-cta">
                <a
                  className="btn"
                  href="https://www.dschungelwien.at/u20-poetry-slam"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zu den Tickets →
                </a>
                <Link className="btn btn-magenta" href="#anmeldung">
                  Als Slammer:in anmelden
                </Link>
              </div>
            </div>
            <div className="hero-logo-art" aria-hidden="true">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="center">
                U20
                <br />
                <span style={{ fontSize: "0.45em", opacity: 0.85 }}>Slam</span>
              </div>
            </div>
          </div>
          <div className="ph-caption">
            Foto: U20 Slam, Dschungel Wien · Petra Weixelbraun
          </div>
        </div>
      </section>

      {/* DATE STRIP */}
      <div className="date-strip">
        <div className="container-u date-strip-inner">
          <span className="label">Save the date</span>
          <span className="pill">06. Mai</span>
          <span className="pill">05. Juni</span>
          <span className="pill">18. September</span>
          <span className="pill">16. Oktober</span>
          <span className="pill">jeweils 19:00 · Dschungel Wien</span>
        </div>
      </div>

      {/* EVENTS */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Nächste Veranstaltungen</h2>
            <p>
              Jeden Monat ein Slam — davor immer ein Workshop für alle, die
              sich noch nicht auf die Bühne trauen.
            </p>
          </ScrollReveal>

          {events.length > 0 ? (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  startDate={event.start_date}
                  venue={event.venue?.venue}
                  excerpt={event.description}
                  slug={event.slug}
                />
              ))}
            </div>
          ) : (
            <div className="events-grid">
              <StaticEventCard
                day="06"
                mon="MAI"
                time="16:00 – 18:00"
                title="schreib' KLASSE!"
                desc="Der Schreibworkshop vor dem Slam. Für Neulinge, Klassen und alle, die Bock auf Worte haben."
                href="/schreib-klasse"
              />
              <StaticEventCard
                day="06"
                mon="MAI"
                time="19:00 – 21:00"
                title="U20 Poetry Slam"
                desc="Junge Slampoet:innen aufgepasst! Bühne 1, drei Minuten, deine Show."
                href="/veranstaltungen"
              />
              <StaticEventCard
                day="05"
                mon="JUN"
                time="15:00 – 17:00"
                title="schreib' KLASSE!"
                desc="Workshop vor dem Slam. Für Teilnehmer:innen ist der U20 Slam danach kostenlos."
                href="/schreib-klasse"
              />
              <StaticEventCard
                day="05"
                mon="JUN"
                time="18:00 – 20:00"
                title="U20 Poetry Slam"
                desc="Letzter Slam vor der Sommerpause. Komm vorbei, hör zu, klatsch laut, geh inspiriert nach Hause."
                href="/veranstaltungen"
              />
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link className="btn btn-ghost" href="/veranstaltungen">
              Alle Termine ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* WORKSHOP TEASER */}
      <section className="bg-soft u-section">
        <div className="container-u">
          <div className="workshop-block">
            <ScrollReveal className="workshop-content">
              <span className="eyebrow">Workshop</span>
              <h2>
                schreib&apos;
                <br />
                KLASSE!
              </h2>
              <p className="lead">
                Drei Stunden vor dem Slam. Du, ein Stift, ein paar Anstöße —
                und plötzlich Texte, die du dir nie zugetraut hättest.
              </p>
              <ul className="workshop-list">
                <li>Schreibimpulse, mit denen wirklich Texte entstehen</li>
                <li>Performance-Tipps von Profi-Slammer:innen</li>
                <li>Kleine Gruppe, viel Raum, kein Druck</li>
                <li>Danach direkt auf die Bühne — wenn du willst</li>
              </ul>
              <Link className="btn" href="/schreib-klasse">
                Zum Workshop →
              </Link>
            </ScrollReveal>
            <ScrollReveal className="workshop-card">
              <span className="small">Pro Workshop</span>
              <div className="price-big">€8</div>
              <div className="subtitle">2–3 Stunden Schreiben &amp; Bühne</div>
              <ul className="feature-list">
                <li>U20 Slam danach inkludiert</li>
                <li>Auch für ganze Schulklassen buchbar</li>
                <li>Material und Snacks gestellt</li>
                <li>Keine Vorerfahrung nötig</li>
              </ul>
              <Link className="btn btn-magenta" href="/schreib-klasse">
                Platz sichern
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ABOUT + RULES */}
      <section className="u-section">
        <div className="container-u about-grid">
          <ScrollReveal>
            <span className="eyebrow">Was ist Poetry Slam?</span>
            <p className="about-quote">
              Drei Minuten. Ein Mikro. Eigene Texte. Das Publikum entscheidet.
            </p>
            <div className="about-text">
              <p>
                Poetry Slam ist Literatur, die sich traut, laut zu sein. Du
                schreibst einen Text — egal ob Gedicht, Rap, Story, Brief —
                und trägst ihn live vor. Keine Requisiten, keine Kostüme,
                keine Musik. Nur deine Worte und du.
              </p>
              <p>
                Das Publikum bewertet. Ehrlich, aber nie gemein. Bei uns
                gewinnt am Ende, wer am meisten gewagt hat — nicht, wer am
                lautesten war.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <span className="eyebrow">Die 5 Slam-Regeln</span>
            <ol className="rules-list">
              <li>
                <div>
                  <strong>Eigener Text.</strong>
                  <span>
                    Du trägst nur Texte vor, die du selbst geschrieben hast.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>3 Minuten.</strong>
                  <span>
                    Mehr Zeit gibt&apos;s nicht. Drüber gibt&apos;s Punkteabzug.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Keine Hilfsmittel.</strong>
                  <span>
                    Kein Kostüm, keine Requisite, keine Musik vom Band.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Du bist unter 20.</strong>
                  <span>U20 heißt: bis und mit 19 Jahren. Punkt.</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Hab Spaß.</strong>
                  <span>Klingt kitschig, ist aber Regel Nummer eins.</span>
                </div>
              </li>
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* BIG QUOTE */}
      <section
        className="bg-soft section-tight"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <div className="container-u">
          <ScrollReveal as="div">
            <p className="big-quote">
              Wenn du noch nie auf einer Bühne warst, ist das genau der
              richtige Ort, um anzufangen.
            </p>
            <p className="big-quote-author">— Adina Wilcke, Leitung U20 Wien</p>
          </ScrollReveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Unser Team</h2>
            <p>
              Wir machen das hier nicht zufällig — wir machen es, weil junge
              Worte gehört gehören.
            </p>
          </ScrollReveal>
          <div className="team-grid">
            {TEAM_FALLBACK.map((m) => (
              <TeamCard
                key={m.name}
                name={m.name}
                role={m.role}
                description={m.description}
              />
            ))}
            <article className="team-card">
              <div className="team-photo">
                <span className="initials">?</span>
                <span className="ph-cap">Coming soon</span>
              </div>
              <div className="team-info">
                <h3>Überraschung!</h3>
                <div className="role">Bald im Team</div>
                <p className="bio">
                  Jemand Neues stößt zu uns. Mehr verraten wir hier — sobald
                  es offiziell ist.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* NEWS */}
      {news.length > 0 && (
        <section className="bg-soft u-section">
          <div className="container-u">
            <ScrollReveal className="section-title-wrap">
              <h2>Neuigkeiten</h2>
              <p>
                Nachberichte, Recap-Videos und alles, was zwischen den Slams
                passiert.
              </p>
            </ScrollReveal>
            <div className="news-grid">
              {news.map((post) => (
                <NewsCard
                  key={post.id}
                  title={post.title.rendered}
                  date={post.date}
                  excerpt={post.excerpt.rendered}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ANMELDUNG */}
      <section id="anmeldung" className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Schreib&apos; uns!</h2>
            <p>
              Du willst auf die Bühne, einen Workshop besuchen oder hast
              einfach eine Frage? Wir hören zu — unverbindlich und
              vertraulich.
            </p>
          </ScrollReveal>
          <ScrollReveal className="form-block">
            <div className="form-intro">
              <h2
                style={{
                  color: "var(--u-magenta)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                Wir sind für dich da.
              </h2>
              <p>
                Schreib uns kurz, worum&apos;s geht — wir antworten meistens
                innerhalb von ein paar Tagen. Versprochen.
              </p>
              <p className="hand-note">
                Auch wenn du dich nur traust, mal Hallo zu sagen.
              </p>
            </div>
            <SignupForm />
          </ScrollReveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>@u20slamwien</h2>
            <p>
              Folg uns auf Instagram — Bilder vom letzten Slam, Ankündigungen,
              Behind-the-Mic.
            </p>
          </ScrollReveal>
          <ScrollReveal className="ig-grid">
            {[
              { v: "v1", label: "Slam Recap" },
              { v: "v2", label: "Save the Date" },
              { v: "v3", label: "Backstage" },
              { v: "v4", label: "Workshop" },
              { v: "v5", label: "Poet:in d. Mts" },
              { v: "v6", label: "Tickets live" },
            ].map((t) => (
              <a
                key={t.v}
                className={`ig-tile ${t.v}`}
                href="https://www.instagram.com/u20slamwien"
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram: ${t.label}`}
              >
                {t.label}
                <span className="igh">@u20slamwien</span>
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Oft gefragt</h2>
            <p>
              Und immer wieder gerne beantwortet. Mehr im{" "}
              <Link href="/faq">FAQ</Link>.
            </p>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Wer darf mitmachen?" defaultOpen>
              Alle bis einschließlich 19 Jahre. Du brauchst keine
              Vorerfahrung — nur drei Minuten Text und Mut.
            </FaqItem>
            <FaqItem question="Was kostet der Eintritt?">
              € 8,– an der Abendkassa oder online über den Dschungel Wien.
              Workshop-Teilnehmer:innen zahlen nur € 1,– oder gar nichts.
            </FaqItem>
            <FaqItem question="Wie melde ich mich als Slammer:in an?">
              Über das Formular auf dieser Seite oder per E-Mail an{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
              Wir antworten meistens innerhalb weniger Tage.
            </FaqItem>
            <FaqItem question="Kann ich auch mit einer Schulklasse kommen?">
              Ja — sehr gerne. Für Lehrer:innen gibt&apos;s eine eigene Seite
              mit Infos zu <Link href="/lehrer">Klassenworkshops</Link>.
            </FaqItem>
          </div>
        </div>
      </section>
    </>
  );
}

function StaticEventCard({
  day,
  mon,
  time,
  title,
  desc,
  href,
}: {
  day: string;
  mon: string;
  time: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <article className="event-card">
      <div className="event-photo">
        <div className="ph-pattern" />
        <div className="ph-glyph">{day}</div>
        <div className="event-date-badge">
          <span className="day">{day}</span>
          <span className="mon">{mon}</span>
        </div>
      </div>
      <div className="event-body">
        <div className="event-meta">
          <span>{time}</span>
          <span>Dschungel Wien</span>
        </div>
        <h3 className="event-title">{title}</h3>
        <p className="event-desc">{desc}</p>
        <div className="event-foot">
          <span className="event-price">€ 8,–</span>
          <Link className="event-link" href={href}>
            Mehr Info
          </Link>
        </div>
      </div>
    </article>
  );
}
