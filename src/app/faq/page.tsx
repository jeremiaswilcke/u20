import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqItem } from "@/components/sections/FaqItem";

export const metadata: Metadata = {
  title: "Fragen & Antworten",
  description:
    "Alles, was wir zum U20 Poetry Slam Wien immer wieder gefragt werden — für Slammer:innen, Publikum, Workshop-Teilnehmer:innen und Lehrkräfte.",
};

export default function FaqPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · FAQ
          </div>
          <h1>Fragen &amp; Antworten.</h1>
          <p className="lede">
            Alles, was Menschen uns immer wieder fragen. Was fehlt, einfach
            mailen:{" "}
            <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
          </p>
        </div>
      </section>

      {/* CATEGORY NAV */}
      <div className="date-strip">
        <div className="container-u date-strip-inner">
          <span className="label">Kategorien</span>
          <a className="pill" href="#slammen">
            Als Slammer:in
          </a>
          <a className="pill" href="#publikum">
            Als Publikum
          </a>
          <a className="pill" href="#workshop">
            Workshop
          </a>
          <a className="pill" href="#schule">
            Schule &amp; Lehrkräfte
          </a>
          <a className="pill" href="#organisation">
            Organisation
          </a>
        </div>
      </div>

      {/* SLAMMEN */}
      <section id="slammen" className="u-section">
        <div className="container-u">
          <ScrollReveal className="faq-cat-head">
            <span className="eyebrow">01 · Als Slammer:in</span>
            <h2>Ich will auftreten.</h2>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Wie alt muss ich sein, um mitzumachen?" defaultOpen>
              Unter 20. Das ist&apos;s. Untergrenze gibt&apos;s keine — die
              jüngsten Slammer:innen waren 12.
            </FaqItem>
            <FaqItem question="Was muss mein Text erfüllen?">
              Selbst geschrieben, maximal 5 Minuten (meist 3), keine Kostüme,
              keine Requisiten, keine Musik — nur du und deine Worte. Keine
              Beleidigung, kein Hass — sonst ist alles erlaubt.
            </FaqItem>
            <FaqItem question="Wie melde ich mich an?">
              Auf der Startseite unter „Slammer-Anmeldung" oder per Mail an{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
              Anmeldeschluss ist ca. eine Woche vor dem Slam.
            </FaqItem>
            <FaqItem question="Bekomme ich Feedback?">
              Wenn du willst — ja. Wir haben ein Mentoring-Buddy-System und
              vernetzen dich mit einer:m erfahrenen Slammer:in. Einfach in der
              Anmeldung anhaken.
            </FaqItem>
            <FaqItem question="Gibt's was zu gewinnen?">
              Beim regulären Slam: Ehre, ein kleines Publikum-Geschenk,
              Applaus. Bei der Landesmeisterschaft: Plätze beim Bundesfinale.
              Das wahre Gewinnen ist aber, dass du&apos;s gemacht hast.
            </FaqItem>
            <FaqItem question="Was, wenn ich Panik kriege?">
              Kommt vor, oft sogar. Du kannst jederzeit absagen. Vor dem Slam
              kannst du auch einfach kurz nochmal nachdenken — wir zwingen
              niemanden auf die Bühne.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* PUBLIKUM */}
      <section id="publikum" className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="faq-cat-head">
            <span className="eyebrow">02 · Als Publikum</span>
            <h2>Ich will zuschauen.</h2>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Wie lange dauert ein Slam?" defaultOpen>
              Ca. 2 Stunden mit Pause. Zwei Runden, dann Finale. Danach noch
              Drinks &amp; Reden, solange du magst.
            </FaqItem>
            <FaqItem question="Muss ich jung sein, um hinzugehen?">
              Nein! Das Publikum ist bunt gemischt. Eltern, Lehrkräfte,
              Freund:innen, Fans — alle willkommen.
            </FaqItem>
            <FaqItem question="Was kostet der Eintritt?">
              €8,– regulär. Für Workshop-Teilnehmer:innen gratis / vergünstigt.
              Tickets gibt&apos;s über den Dschungel Wien.
            </FaqItem>
            <FaqItem question="Was muss ich machen als Publikum?">
              Zuhören, lachen, klatschen, weinen wenn dir danach ist. Bei
              ausgewählten Slams werden Publikumsjurys gelost — du könntest
              dabei sein.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* WORKSHOP */}
      <section id="workshop" className="u-section">
        <div className="container-u">
          <ScrollReveal className="faq-cat-head">
            <span className="eyebrow">03 · Workshop</span>
            <h2>schreib&apos; KLASSE!</h2>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Muss ich danach auf die Bühne?">
              Nein. Viele kommen nur zum Schreiben. Beides okay.
            </FaqItem>
            <FaqItem question="Brauche ich Vorerfahrung?">
              Keine. Die meisten Teilnehmer:innen schreiben das erste Mal bei
              uns einen Text.
            </FaqItem>
            <FaqItem question="Was kostet der Workshop?">
              €8,– für ca. 2–3 Stunden. Der Slam danach ist für
              Workshop-Teilnehmer:innen kostenlos oder stark vergünstigt.
            </FaqItem>
            <FaqItem question="Wie groß ist die Gruppe?">
              Maximal 15 Teilnehmer:innen. Wir wollen, dass jede:r drankommt.
            </FaqItem>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link className="btn" href="/schreib-klasse">
              Mehr zum Workshop →
            </Link>
          </div>
        </div>
      </section>

      {/* SCHULE */}
      <section id="schule" className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="faq-cat-head">
            <span className="eyebrow">04 · Schule &amp; Lehrkräfte</span>
            <h2>Wir wollen als Klasse.</h2>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Kommt ihr in unsere Schule?">
              Ja. Ab 3 Schulstunden aufwärts — bis hin zur Projektwoche.
              Details unter <Link href="/lehrer">Für Lehrer:innen</Link>.
            </FaqItem>
            <FaqItem question="Für welche Schulstufen geeignet?">
              Hauptsächlich 8.–13. Stufe. Auf Anfrage auch jünger (ab ca. 6.
              Stufe) und ältere Gruppen.
            </FaqItem>
            <FaqItem question="Was kostet ein Klassen-Workshop?">
              Halbtagswerkstatt (3–4 Stunden): pauschal €280 für die ganze
              Klasse. Andere Formate auf Anfrage — Förderungen oft möglich.
            </FaqItem>
            <FaqItem question="Gibt's Unterrichtsmaterial?">
              Ja. Konzept-PDF, 10 Schreibimpulse, Beispielvideo — auf der{" "}
              <Link href="/lehrer">Lehrer:innen-Seite</Link>.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* ORGANISATION */}
      <section id="organisation" className="u-section">
        <div className="container-u">
          <ScrollReveal className="faq-cat-head">
            <span className="eyebrow">05 · Organisation</span>
            <h2>Drumherum.</h2>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Ist der Dschungel Wien barrierefrei?">
              Ja. Lift bis Bühne 1, rollstuhlgerechte WCs, Begleitperson
              gratis. Bei Bedarf bitte kurz Bescheid geben — wir reservieren
              Plätze.
            </FaqItem>
            <FaqItem question="Gibt's Essen & Trinken vor Ort?">
              Bar im Foyer, geöffnet 30 Min. vor Beginn. Getränke &amp; kleine
              Snacks.
            </FaqItem>
            <FaqItem question="Wird aufgenommen?">
              Wir fotografieren jeden Slam. Auf Wunsch geben wir dir kein Foto
              oder anonymisieren. Video nur mit expliziter Zustimmung.
            </FaqItem>
            <FaqItem question="Wer steckt hinter dem U20 Slam?">
              Adina Wilcke (Gründerin), Gabo Moyano, BraVe, Annalena Schuh
              &amp; Team. Details: <Link href="/team">Unser Team</Link>.
            </FaqItem>
            <FaqItem question="Wie kann ich sonst helfen?">
              Spenden, Weitersagen, als Volunteer mitwirken. Einfach mailen —
              wir suchen regelmäßig Verstärkung.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="u-section"
        style={{
          background: "var(--u-ink)",
          color: "var(--u-paper)",
        }}
      >
        <div
          className="container-u"
          style={{ textAlign: "center", maxWidth: "52rem" }}
        >
          <ScrollReveal>
            <span
              className="eyebrow"
              style={{ color: "var(--u-orange)" }}
            >
              Deine Frage ist nicht dabei?
            </span>
            <h2 style={{ color: "var(--u-paper)" }}>
              Schreib uns einfach.
              <br />
              Wir antworten.
            </h2>
            <p style={{ color: "rgba(255,251,242,0.8)" }}>
              Meistens innerhalb eines Werktags. Manchmal schneller.
            </p>
            <a
              className="btn btn-magenta"
              href="mailto:info@u20poetryslam.at"
            >
              info@u20poetryslam.at
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
