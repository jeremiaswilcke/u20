import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TeacherForm } from "./TeacherForm";

export const metadata: Metadata = {
  title: "Für Lehrer:innen",
  description:
    "Poetry Slam in der Schule — drei Formate für Wiener und niederösterreichische Schulklassen. Anfrage, Materialien und Infos für Lehrkräfte.",
};

const FORMATS = [
  {
    tag: "Format A",
    title: "Slam-Besuch mit Vorbereitung.",
    lead: "Sie bringen Ihre Klasse zu einem U20 Slam im Dschungel Wien. Davor besuchen wir Sie einmal in der Schule zur Vorbereitung.",
    points: [
      { k: "Dauer.", v: "2 Schulstunden in der Schule + Abend-Slam" },
      { k: "Gruppe.", v: "Ganze Klasse (bis ca. 30)" },
      { k: "Kosten.", v: "€8,– pro Schüler:in für den Slam; Schulbesuch kostenlos" },
      { k: "Ort.", v: "Ihre Schule + Dschungel Wien" },
    ],
    cta: "Anfragen",
    ctaClass: "btn btn-ghost",
    feature: false,
  },
  {
    tag: "Format B · beliebt",
    title: "Poetry-Slam-Werkstatt (Halbtag).",
    lead: "Drei bis vier Stunden intensive Schreib- und Performance-Arbeit. Ihre Klasse schreibt, überarbeitet und performt eigene Texte — mit oder ohne Abschluss-Mini-Slam.",
    points: [
      { k: "Dauer.", v: "3–4 Schulstunden am Stück" },
      { k: "Gruppe.", v: "Max. 25, idealerweise eine Klasse" },
      { k: "Kosten.", v: "Pauschal €280 für die ganze Klasse" },
      { k: "Ort.", v: "Ihre Schule (wir brauchen einen ruhigen Raum)" },
    ],
    cta: "Jetzt anfragen",
    ctaClass: "btn",
    feature: true,
  },
  {
    tag: "Format C",
    title: "Projektwoche.",
    lead: "Für Schulen mit Ambition. Eine volle Woche Poetry Slam, am Ende ein Showcase im Dschungel Wien oder bei Ihnen — mit Publikum.",
    points: [
      { k: "Dauer.", v: "5 Tage à 4–5 Stunden" },
      { k: "Gruppe.", v: "15–20 Teilnehmer:innen" },
      { k: "Kosten.", v: "Auf Anfrage — Förderungen möglich" },
      { k: "Ort.", v: "Ihre Schule + Abschluss-Bühne" },
    ],
    cta: "Gespräch vereinbaren",
    ctaClass: "btn btn-ghost",
    feature: false,
  },
];

const DOWNLOADS = [
  {
    icon: "📄",
    title: "Konzept-PDF (12 Seiten)",
    desc: "Ziele, Methoden, Lehrplan-Bezüge, Ablauf eines Werkstatttags.",
    meta: "PDF · 1,8 MB",
  },
  {
    icon: "✎",
    title: "10 Schreibimpulse",
    desc: "Für den Unterricht, sofort einsetzbar. Mit Anleitung und Beispieltexten.",
    meta: "PDF · 640 KB",
  },
  {
    icon: "▶",
    title: "Beispielvideo (7 Min.)",
    desc: "Kurzer Einblick in einen Klassenbesuch — mit O-Tönen von Lehrkräften.",
    meta: "MP4 · 58 MB",
  },
  {
    icon: "✉",
    title: "Infomail für Eltern",
    desc: "Vorformulierte Elterninfo zum Slam-Besuch mit Klasse, zum Anpassen.",
    meta: "DOCX · 30 KB",
  },
];

export default function LehrerPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Für Lehrer:innen
          </div>
          <h1>Für Lehrer:innen.</h1>
          <p className="lede">
            Poetry Slam ist der wahrscheinlich niederschwelligste Zugang zu
            Literatur, den wir kennen. Wir kommen in Ihre Klasse, arbeiten ein
            bis drei Stunden — und danach haben Ihre Schüler:innen eigene
            Texte. Garantiert.
          </p>
        </div>
      </section>

      {/* FORMATS */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Drei Formate.</h2>
            <p>
              Wählen Sie, was zu Ihrer Klasse passt. Alle Formate sind für
              8.–13. Schulstufe ausgelegt, andere Gruppen auf Anfrage.
            </p>
          </ScrollReveal>
          <div className="format-grid">
            {FORMATS.map((f) => (
              <article
                key={f.tag}
                className={`format-card reveal ${f.feature ? "feature" : ""}`}
              >
                <div className="format-tag">{f.tag}</div>
                <h3>{f.title}</h3>
                <p className="format-lead">{f.lead}</p>
                <ul className="format-points">
                  {f.points.map((p, i) => (
                    <li key={i}>
                      <strong>{p.k}</strong> {p.v}
                    </li>
                  ))}
                </ul>
                <a className={f.ctaClass} href="#anfrage">
                  {f.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-soft u-section">
        <div className="container-u about-grid">
          <ScrollReveal>
            <span className="eyebrow">Warum Poetry Slam?</span>
            <p className="about-quote">
              Weil Schüler:innen zum ersten Mal merken, dass ihre Sprache zählt.
            </p>
            <div className="about-text">
              <p>
                Poetry Slam bricht mit dem Deutschunterricht-Reflex „ich kann
                das nicht richtig". Es gibt kein richtig. Es gibt nur: was
                trifft, was ehrlich ist, was laut gelesen trägt.
              </p>
              <p>
                Fast alle Schüler:innen, die wir begleiten, schreiben
                innerhalb der ersten 30 Minuten einen Text, den sie vorher nie
                geschrieben hätten.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <span className="eyebrow">Das bringt&apos;s konkret</span>
            <ol className="rules-list">
              <li>
                <div>
                  <strong>Lehrplan-Bezug.</strong>
                  <span>
                    Textsorten, sprachliche Gestaltung, Rezitation — deckt
                    zentrale Kompetenzbereiche ab.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Gleichberechtigung.</strong>
                  <span>
                    Slam funktioniert unabhängig von Muttersprache und
                    Vorwissen.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Klassenklima.</strong>
                  <span>
                    Wer den eigenen Text vorträgt, wird anders gesehen — und
                    sieht die anderen anders.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Keine Note.</strong>
                  <span>
                    Wir bewerten nicht. Sie müssen auch nicht. Das ist Teil
                    des Magie-Tricks.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Nachhaltig.</strong>
                  <span>
                    Viele Klassen kommen danach privat zum Slam. Ganz ohne
                    Verpflichtung.
                  </span>
                </div>
              </li>
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Material &amp; Downloads.</h2>
            <p>
              Alles, was Sie brauchen, um sich einen Eindruck zu verschaffen —
              oder direkt in der Klasse zu starten.
            </p>
          </ScrollReveal>
          <div className="dl-grid">
            {DOWNLOADS.map((d) => (
              <a key={d.title} className="dl-card reveal" href="#">
                <span className="dl-icon">{d.icon}</span>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
                <span className="dl-meta">{d.meta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="anfrage" className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>
              Wir melden uns innerhalb
              <br />
              von 3 Werktagen.
            </h2>
            <p>
              Schreiben Sie uns grob, um welches Format &amp; welche Klasse es
              geht — Rest besprechen wir gemeinsam.
            </p>
          </ScrollReveal>
          <ScrollReveal className="form-block">
            <div className="form-intro">
              <span className="eyebrow">Direkt anfragen</span>
              <h2
                style={{
                  color: "var(--u-magenta)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                Los geht&apos;s.
              </h2>
              <p>
                Oder schreiben Sie uns eine Mail — E-Mail geht meist am
                schnellsten:{" "}
                <a href="mailto:info@u20poetryslam.at">
                  info@u20poetryslam.at
                </a>
                .
              </p>
              <p className="hand-note">— versprochen.</p>
            </div>
            <TeacherForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
