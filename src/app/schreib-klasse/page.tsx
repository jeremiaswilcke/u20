import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqItem } from "@/components/sections/FaqItem";

export const metadata: Metadata = {
  title: "schreib' KLASSE!",
  description:
    "Der Schreibworkshop vor dem Slam. Zwei bis drei Stunden, kleine Gruppe, kein Druck — und ein Text, den du danach auf die Bühne bringen könntest.",
};

const STEPS = [
  {
    num: "01",
    title: "Ankommen.",
    desc: "Kennenlernrunde, Getränk in die Hand, Blätter verteilen. Wir fragen nicht, ob du schon mal geschrieben hast — wir legen los.",
  },
  {
    num: "02",
    title: "Impulse.",
    desc: "Wir geben dir Schreibaufträge, die wirken: ein Objekt, ein Geruch, ein Satzanfang. Daraus entstehen Texte — oft überraschendere als du denkst.",
  },
  {
    num: "03",
    title: "Vortragen.",
    desc: "Nur wer will. Wir üben laut lesen, atmen, Blickkontakt — keine Schauspiel-Tricks, nur deine echten Worte.",
  },
  {
    num: "04",
    title: "Feedback.",
    desc: "Wohlwollend, konkret, nie gemein. Wir sagen dir, was funktioniert — und du entscheidest, was du daraus machst.",
  },
  {
    num: "05",
    title: "Bühne — wenn du willst.",
    desc: "Beim Slam direkt danach kannst du deinen Text vortragen. Kannst aber auch einfach zuschauen. Beides ist cool.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Ich hab den Text in 40 Minuten geschrieben. Im Slam danach hab ich Platz 3 gemacht. Was zur Hölle.",
    who: "Teilnehmerin, 16 · Wien",
  },
  {
    quote: "Bin nur hin, weil ein Freund mich mitgeschleppt hat. Jetzt geh ich jeden Monat.",
    who: "Ali, 18 · Wiener Neustadt",
  },
  {
    quote:
      "Ich dachte, Poetry Slam wär was für Erwachsene. War es nicht. Es war für mich.",
    who: "Sophie, 14 · St. Pölten",
  },
];

export default function SchreibKlassePage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · schreib&apos; KLASSE!
          </div>
          <h1>schreib&apos; KLASSE!</h1>
          <p className="lede">
            Der Workshop vor dem Slam. Du schreibst dort den Text, den du
            danach auf die Bühne bringen könntest — oder auch einfach nur für
            dich behalten. Keine Bewertung, kein Druck, kein Lehrer-Blick über
            die Schulter.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>So läuft&apos;s ab.</h2>
            <p>
              Zwei bis drei Stunden, in der Regel am Slam-Tag. Kleine Gruppe,
              Maximum 15 Teilnehmer:innen.
            </p>
          </ScrollReveal>
          <ol className="steps-grid">
            {STEPS.map((s) => (
              <li key={s.num} className="step-card reveal">
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="bg-soft u-section">
        <div className="container-u about-grid">
          <ScrollReveal>
            <span className="eyebrow">Für wen?</span>
            <p className="about-quote">
              Für dich — wenn du unter 20 bist und irgendwas zu sagen hast.
            </p>
            <div className="about-text">
              <p>
                Du brauchst keine Vorerfahrung. Keinen fertigen Text. Keinen
                Plan. Du musst auch nicht „gut schreiben können" — was das
                überhaupt heißen soll, bleibt eine offene Frage.
              </p>
              <p>
                Was du mitbringen solltest: Offenheit, 2–3 Stunden Zeit und die
                Bereitschaft, ein paar Minuten lang nicht auf dein Handy zu
                schauen.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <span className="eyebrow">Was du lernst</span>
            <ol className="rules-list">
              <li>
                <div>
                  <strong>Schreibimpulse.</strong>
                  <span>Wie du aus dem Nichts Texte entstehen lässt.</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Struktur.</strong>
                  <span>
                    Wann ein Text seinen Rhythmus findet — und wann er zu viel
                    schnackt.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Stimme.</strong>
                  <span>Wie deine Sprache klingt, wenn du ehrlich bist.</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Bühnen-Basics.</strong>
                  <span>
                    Atmen. Stehen. Pausen. Blick. Keine Schauspielschule,
                    versprochen.
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Mut.</strong>
                  <span>
                    Der entsteht automatisch, irgendwo zwischen 01 und 04.
                  </span>
                </div>
              </li>
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICE CTA */}
      <section className="u-section">
        <div className="container-u">
          <div
            className="workshop-block"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <ScrollReveal className="workshop-content">
              <span className="eyebrow">Jetzt anmelden</span>
              <h2>
                €8 für einen
                <br />
                Nachmittag,
                <br />
                der hält.
              </h2>
              <p className="lead">
                Der U20 Slam danach ist für Workshop-Teilnehmer:innen
                kostenlos — bei manchen Terminen zahlst du nur symbolisch
                €1,–.
              </p>
              <ul className="workshop-list">
                <li>Alle Materialien gestellt</li>
                <li>Getränk inklusive</li>
                <li>Kein Vorwissen nötig</li>
                <li>Slam danach gratis / vergünstigt</li>
              </ul>
              <Link className="btn" href="/#anmeldung">
                Platz sichern →
              </Link>
            </ScrollReveal>
            <ScrollReveal className="workshop-card">
              <span className="small">Nächster Termin</span>
              <div className="price-big">06.05.</div>
              <div className="subtitle">16:00 – 18:00 · Dschungel Wien</div>
              <ul className="feature-list">
                <li>Max. 15 Teilnehmer:innen</li>
                <li>Leitung: Annalena Schuh</li>
                <li>Direkt vor dem U20 Slam</li>
                <li>Anmeldung bis 2 Tage vorher</li>
              </ul>
              <Link className="btn btn-magenta" href="/#anmeldung">
                Anmelden
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Das sagen Teilnehmer:innen.</h2>
            <p>Stimmen aus den letzten Workshops — gekürzt, aber echt.</p>
          </ScrollReveal>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="testi-card reveal">
                <blockquote>{t.quote}</blockquote>
                <figcaption>{t.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Noch Fragen?</h2>
            <p>
              Hier die häufigsten. Ausführlicher im <Link href="/faq">FAQ</Link>.
            </p>
          </ScrollReveal>
          <div className="faq-list">
            <FaqItem question="Muss ich danach auf die Bühne?" defaultOpen>
              Nein. Wirklich nicht. Viele kommen zum Workshop, um zu
              schreiben, und sehen sich den Slam danach einfach nur an.
              Beides okay.
            </FaqItem>
            <FaqItem question="Was, wenn ich noch nie etwas geschrieben habe?">
              Genau für dich ist das hier. Die meisten Teilnehmer:innen haben
              vorher noch nie einen „richtigen" Text geschrieben. Das ist
              Feature, nicht Bug.
            </FaqItem>
            <FaqItem question="Kann ich mit meiner Schulklasse kommen?">
              Ja! Wir machen regelmäßig Klassen-Workshops, teilweise auch
              direkt in der Schule. Details unter{" "}
              <Link href="/lehrer">Für Lehrer:innen</Link>.
            </FaqItem>
            <FaqItem question="Gibt's eine Warteliste, wenn voll?">
              Ja, einfach per Mail an{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
              Wir rücken bei Absagen nach — das kommt öfter vor, als du
              denkst.
            </FaqItem>
          </div>
        </div>
      </section>
    </>
  );
}
