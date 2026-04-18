import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Unser Team",
  description:
    "Das Team hinter dem U20 Poetry Slam Wien — Moderation, Workshop, Technik, Social.",
};

const MEMBERS: Array<{
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  meta: string[];
  dark?: boolean;
}> = [
  {
    name: "Gabo Moyano",
    role: "Moderator · Host",
    bio: "Slampoet seit 2018, Architekt von Beruf, Witz-Maschine von Geburt an. Moderiert mit einem Timing, das man nicht lehren kann.",
    initials: "GB",
    color: "var(--u-orange)",
    meta: ["Wien", "seit 2022"],
  },
  {
    name: "BraVe",
    role: "Moderation · Workshop",
    bio: "Lyrikerin, Spoken-Word-Künstlerin, macht laute Texte und leise Pausen. Unterrichtet Schreibwerkstatt an Schulen in ganz NÖ.",
    initials: "BV",
    color: "var(--u-magenta)",
    meta: ["Wien / St. Pölten", "seit 2021"],
  },
  {
    name: "Annalena Schuh",
    role: "Workshop-Leitung",
    bio: "Hauptverantwortlich für schreib' KLASSE! — den Workshop vor dem Slam. Studiert Literaturwissenschaft und schreibt ihren ersten Roman.",
    initials: "AS",
    color: "var(--u-purple)",
    meta: ["Wien", "seit 2023"],
  },
  {
    name: "Jonas Kreisky",
    role: "Technik · Ton",
    bio: "Kümmert sich darum, dass das Mikro klingt, das Licht sitzt und nichts brennt. War selbst U20-Slammer 2019.",
    initials: "JK",
    color: "#6A9BD1",
    meta: ["Wien", "seit 2023"],
  },
  {
    name: "Mira Karner",
    role: "Social Media · Fotos",
    bio: "Dokumentiert, was passiert — und postet es so, dass man nicht wegschauen kann. Studentin, Fotografin, Slam-Zuschauerin seit sie 12 war.",
    initials: "MK",
    color: "#2F5D3E",
    meta: ["Wien", "seit 2024"],
  },
];

const TIMELINE = [
  {
    year: "2011",
    title: "Gründung",
    desc: "Der allererste U20 Slam findet im Dschungel Wien statt. 14 Slammer:innen, 80 Zuschauer:innen, kein Zurück.",
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
    year: "2023",
    title: "Neues Team",
    desc: "Gabo, BraVe und Annalena kommen dazu. Die Crew wird größer, die Bühne auch.",
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
              <div className="photo-frame">
                <div className="photo-initials">AW</div>
                <span className="photo-label">Adina Wilcke</span>
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
                trotzdem schafft sie es, dass am Ende jede:r einen Text in der
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
            <h2>
              Das Moderations-
              <br />
              und Workshop-Team.
            </h2>
            <p>
              Wir wechseln uns ab — so gibt&apos;s bei jedem Slam ein bisschen
              anderen Vibe. Alle sind aktive Slammer:innen.
            </p>
          </ScrollReveal>
          <div className="team-grid">
            {MEMBERS.map((m) => (
              <article key={m.name} className="team-card reveal">
                <div
                  className="team-photo"
                  style={{ ["--tc" as never]: m.color }}
                >
                  <span className="team-initials">{m.initials}</span>
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
            <article className="team-card reveal">
              <div
                className="team-photo"
                style={{
                  background: "var(--u-ink)",
                  color: "var(--u-paper)",
                }}
              >
                <span
                  className="team-initials"
                  style={{ color: "var(--u-orange)" }}
                >
                  +
                </span>
              </div>
              <div className="team-body">
                <h3>Und du?</h3>
                <span className="team-role">Mitmachen</span>
                <p>
                  Wir suchen immer wieder Leute, die anpacken — in Technik,
                  Hosting, Social oder Organisation. Schreib uns einfach.
                </p>
                <div className="team-meta">
                  <span>info@u20poetryslam.at</span>
                </div>
              </div>
            </article>
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
