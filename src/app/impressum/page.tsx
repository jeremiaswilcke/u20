import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Offenlegung des U20 Poetry Slam Wien gemäß § 5 ECG und § 25 MedienG.",
};

export default function ImpressumPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Impressum
          </div>
          <h1>Impressum.</h1>
          <p className="lede">
            Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz
            (MedienG). Stand: {new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })}.
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u" style={{ maxWidth: "52rem" }}>
          <Block title="Medieninhaber &amp; Betreiber">
            <p>
              <strong>U20 Poetry Slam Wien</strong>
              <br />
              {/* TODO: Rechtsform ergänzen — z.B. "ZVR-Zahl 123456789" falls Verein, oder "Einzelunternehmen Adina Wilcke", oder Trägerverein */}
              <em>[Rechtsform/Trägerverein bitte ergänzen]</em>
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ] Wien
              <br />
              Österreich
            </p>
          </Block>

          <Block title="Kontakt">
            <p>
              E-Mail:{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>
              <br />
              Web: <a href="https://u20poetryslam.at">u20poetryslam.at</a>
              <br />
              {/* TODO: Telefonnummer ergänzen */}
              Telefon: [Auf Anfrage]
            </p>
          </Block>

          <Block title="Unternehmensgegenstand">
            <p>
              Durchführung und Organisation von Poetry-Slam-Veranstaltungen
              und Schreibwerkstätten für Personen unter 20 Jahren, mit
              Schwerpunkt auf dem Raum Wien, Niederösterreich und Burgenland.
            </p>
          </Block>

          <Block title="Offenlegung gemäß § 25 MedienG">
            <p>
              <strong>Blattlinie / Grundlegende Richtung:</strong> Die Website{" "}
              <a href="https://u20poetryslam.at">u20poetryslam.at</a> dient der
              Information über Veranstaltungen, Workshops und die Arbeit des
              U20 Poetry Slam Wien. Inhalte werden journalistisch-redaktionell
              erstellt. Es werden keine parteipolitischen Inhalte vertreten.
            </p>
            <p>
              <strong>Medieninhaber:in, Herausgeber:in, Redaktion:</strong>
              {" "}
              wie oben genannt.
            </p>
          </Block>

          <Block title="Urheberrecht">
            <p>
              Alle Inhalte dieser Website — Texte, Bilder, Grafiken, Video
              und Audio — unterliegen dem Urheberrecht. Weiterverbreitung,
              Veröffentlichung und Vervielfältigung bedürfen der
              schriftlichen Zustimmung. Pressefotos sind für redaktionelle
              Zwecke bei Quellenangabe (© Petra Weixelbraun · Mira Karner) frei
              nutzbar.
            </p>
          </Block>

          <Block title="Haftungsausschluss">
            <p>
              Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
              erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird
              dennoch keine Gewähr übernommen.
            </p>
            <p>
              Für Inhalte externer Links, auf die von dieser Website verwiesen
              wird, sind ausschließlich deren Betreiber:innen verantwortlich.
              Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte
              erkennbar.
            </p>
          </Block>

          <Block title="Online-Streitbeilegung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Block>

          <div style={{ marginTop: "3rem" }}>
            <Link className="btn btn-ghost" href="/">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
          color: "var(--u-magenta)",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "var(--u-ink-soft)",
          fontSize: "1rem",
          lineHeight: 1.65,
        }}
      >
        {children}
      </div>
    </div>
  );
}
