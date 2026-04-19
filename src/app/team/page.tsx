import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Unser Team",
  description:
    "Das Team hinter dem U20 Poetry Slam Wien — Moderation, Workshop, Technik.",
};

const MEMBERS: Array<{
  name: string;
  role: string;
  bio: string;
  image?: string;
  meta: string[];
}> = [
  {
    name: "Annalena Schuh",
    role: "Workshop · Slam",
    bio: "Volksschullehrerin, Slammerin, Berge & Seen. Lieblingsbuchstabe: K. Hauptverantwortlich für schreib' KLASSE! — den Workshop vor dem Slam.",
    image: "/images/team-annalena.jpg",
    meta: ["Wien"],
  },
  {
    name: "Jeremias Wilcke",
    role: "Web · Bild · Ton",
    bio: "Erlebnis-, Zirkus- & Prozesspädagoge. Kümmert sich um Website, Aufnahmen und alles, was Strom braucht.",
    image: "/images/team-jeremias.jpg",
    meta: ["Wien"],
  },
];

const TIMELINE = [
  {
    year: "2011",
    title: "Gründung",
    desc: "Der allererste U20 Slam findet im Dschungel Wien statt. 14 Slammer, 80 Zuschauer, kein Zurück.",
  },
  {
    year: "2014",
    title: "Erste Landesmeisterschaft",
    desc: "WNB-Slam startet. Wien, Niederösterreich und Burgenland bekommen eine gemeinsame Bühne für U20-Nachwuchs.",
  },
  {
    year: "2017",
    title: "schreib' KLASSE!",
    desc: "Der Workshop vor dem Slam wird zum festen Format. Zuerst nur sporadisch, dann jeden Monat.",
  },
  {
    year: "2020",
    title: "Digital-Saison",
    desc: "Slam im Wohnzimmer: über Zoom, mit Voting per Chat. Nicht perfekt, aber das Gefühl war da.",
  },
  {
    year: "2026",
    title: "Das jetzt",
    desc: "9 Slams pro Saison, 9 Workshops, 1 Landesmeisterschaft, Specials. Und ein Publikum, das immer wiederkommt.",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Unser Team
          </div>
          <h1>Unser Team.</h1>
          <p className="lede">
            Drei Menschen, eine Bühne — und ein Haufen Jugendliche, die uns
            immer wieder zeigen, wo&apos;s langgeht. Wir moderieren,
            organisieren, unterrichten und halten die Technik am Laufen.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="u-section">
        <div className="container-u">
          <div className="founder-block">
            <ScrollReveal className="founder-photo">
              <div className="photo-frame" style={{ background: "none" }}>
                <img
                  src="/images/team-adina.jpg"
                  alt="Adina Wilcke"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "var(--u-radius-lg)",
                  }}
                />
              </div>
              <div className="founder-tags">
                <span className="tag">Gründerin</span>
                <span className="tag">Moderation</span>
                <span className="tag">Pädagogin</span>
              </div>
            </ScrollReveal>
            <ScrollReveal className="founder-content">
              <span className="eyebrow">Gründerin &amp; Kopf</span>
              <h2>Adina Wilcke.</h2>
              <p className="founder-lede">
                Deutschlehrerin, Slam-Poetin, Moderatorin — und seit 2011 die
                Person, die den U20 Slam in Wien überhaupt möglich gemacht hat.
              </p>
              <p>
                Adina ist auf jeder Slam-Bühne Österreichs zu Hause. Sie
                gewinnt Landesmeisterschaften, unterrichtet an einer Wiener
                Schule und hat in ihrer Freizeit die Idee ausgeheckt, dass
                junge Menschen endlich ihre eigene Bühne verdienen.
              </p>
              <p>
                Ihre Workshops sind schnell, ehrlich, unsentimental — und
                trotzdem schafft sie es, dass am Ende jeder einen Text in der
                Hand hält.
              </p>
              <blockquote className="founder-quote">
                „Ich unterrichte in der Schule, damit Kinder nicht ausgehen —
                und mache Slam, damit sie wieder aufwachen."
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Das Team.</h2>
            <p>
              Zu dritt halten wir den U20 Slam am Laufen — Moderation,
              Workshop, Technik, alles aus einer Hand.
            </p>
          </ScrollReveal>
          <div className="team-grid">
            {MEMBERS.map((m) => (
              <article key={m.name} className="team-card reveal">
                <div className="team-photo">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="team-initials">
                      {m.name.split(/\s+/).map(p => p[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="team-body">
                  <h3>{m.name}</h3>
                  <span className="team-role">{m.role}</span>
                  <p>{m.bio}</p>
                  <div className="team-meta">
                    {m.meta.map((x, i) => (
                      <span key={i}>{x}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Seit 2011.</h2>
            <p>Ein paar Meilensteine aus den letzten vierzehn Jahren.</p>
          </ScrollReveal>
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li key={t.year} className="tl-item reveal">
                <span className="tl-year">{t.year}</span>
                <div className="tl-body">
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
