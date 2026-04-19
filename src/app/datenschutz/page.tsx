import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung des U20 Poetry Slam Wien nach DSGVO und DSG. Welche Daten wir verarbeiten, warum und wie lange.",
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Datenschutz
          </div>
          <h1>Datenschutz.</h1>
          <p className="lede">
            Informationen zur Verarbeitung personenbezogener Daten gemäß
            DSGVO (EU) 2016/679 und österreichischem Datenschutzgesetz.
            Stand: {new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })}.
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u" style={{ maxWidth: "52rem" }}>
          <Block title="Verantwortlicher">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              <strong>U20 Poetry Slam Wien</strong>
              <br />
              {/* TODO: Rechtsform, vollständige Adresse, ggf. Vereinsvorsitz */}
              <em>[Trägerverein / Rechtsform bitte ergänzen]</em>
              <br />
              [Straße, PLZ Wien, Österreich]
              <br />
              E-Mail:{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>
            </p>
            <p>
              Details zum Betreiber findest du im{" "}
              <Link href="/impressum">Impressum</Link>.
            </p>
          </Block>

          <Block title="Welche Daten wir verarbeiten — und warum">
            <p>
              Wir verarbeiten personenbezogene Daten nur, wenn du sie uns aktiv
              zur Verfügung stellst (z.B. im Kontaktformular) oder wenn dein
              Besuch technisch zwangsläufig Daten hinterlässt (Server-Logs).
            </p>

            <h3>1. Kontaktformular</h3>
            <p>
              Wenn du das Formular auf der Startseite, der Lehrer:innen-Seite
              oder der Kontaktseite ausfüllst, verarbeiten wir:
            </p>
            <ul style={listStyle}>
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Deine Nachricht</li>
              <li>Art der Anfrage (z.B. „Anmeldung Slam", „Workshop", …)</li>
            </ul>
            <p>
              <strong>Zweck:</strong> Beantwortung deiner Anfrage.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahme / Vertragsanbahnung) bzw. lit. a
              (Einwilligung durch Absenden des Formulars).
              <br />
              <strong>Speicherdauer:</strong> Solange die Beantwortung deiner
              Anfrage es erfordert, spätestens nach 24 Monaten werden die
              Nachrichten gelöscht, sofern keine gesetzlichen
              Aufbewahrungspflichten bestehen.
            </p>

            <h3>2. Server-Logs</h3>
            <p>
              Bei jedem Seitenaufruf werden technisch unvermeidbar Daten vom
              Hosting-Anbieter gespeichert: IP-Adresse (gekürzt bzw.
              anonymisiert), Datum und Uhrzeit, aufgerufene URL, Referrer,
              Browser-Typ.
            </p>
            <p>
              <strong>Zweck:</strong> technischer Betrieb, Sicherheit,
              Fehlerdiagnose.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse am sicheren Betrieb).
              <br />
              <strong>Speicherdauer:</strong> max. 14 Tage.
            </p>
          </Block>

          <Block title="Auftragsverarbeiter &amp; externe Dienste">
            <p>
              Wir setzen sorgfältig ausgewählte Dienstleister ein:
            </p>

            <h3>E-Mail-Versand — Resend</h3>
            <p>
              Formular-Nachrichten werden über den Transaktions-E-Mail-Dienst
              Resend (Resend Inc., USA; EU-Rechenzentren verfügbar)
              versendet. Es besteht ein Auftragsverarbeitungsvertrag (AVV)
              gemäß Art. 28 DSGVO.
            </p>

            <h3>Hosting / CDN</h3>
            <p>
              {/* TODO: den tatsächlichen Hosting-Anbieter ergänzen, sobald deployt (z.B. Vercel, Netlify, Cloudflare) */}
              <em>
                [Hosting-Anbieter bitte ergänzen, z.B. Vercel Inc., USA, mit
                EU-Standardvertragsklauseln]
              </em>
            </p>

            <h3>WordPress (u20poetryslam.at)</h3>
            <p>
              Einige Inhalte (Events, Neuigkeiten, Team) werden von einem
              WordPress-Backend auf u20poetryslam.at geladen. Diese
              Abrufe erfolgen Server-zu-Server — deine IP-Adresse wird dabei
              nicht an WordPress übermittelt.
            </p>

            <h3>Schriften (Google Fonts)</h3>
            <p>
              Wir verwenden Righteous und Inter.
              Diese Schriften werden lokal mit der Seite ausgeliefert
              (Self-Hosting via <code>next/font</code>). Es findet{" "}
              <strong>keine Verbindung zu Google-Servern</strong> aus deinem
              Browser statt.
            </p>

            <h3>Instagram / Dschungel Wien / YouTube (externe Links)</h3>
            <p>
              Auf der Website sind externe Links gesetzt (z.B. zu Instagram,
              zum Dschungel Wien, zu YouTube). Erst beim Klick auf einen
              solchen Link verlässt du unsere Seite und es gelten die
              Datenschutzbestimmungen der jeweiligen Anbieter. Wir binden{" "}
              <strong>keine externen Inhalte direkt ein</strong> (keine
              iFrames, keine Social-Media-Plugins).
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              Diese Website setzt aktuell <strong>keine Cookies</strong> für
              Tracking, Werbung oder Reichweitenmessung. Wir verwenden auch
              keine Analyse-Tools wie Google Analytics oder Ähnliches.
            </p>
          </Block>

          <Block title="Deine Rechte">
            <p>Nach der DSGVO hast du das Recht auf:</p>
            <ul style={listStyle}>
              <li>
                <strong>Auskunft</strong> (Art. 15) — welche Daten wir über
                dich gespeichert haben.
              </li>
              <li>
                <strong>Berichtigung</strong> (Art. 16) — unrichtige Daten
                korrigieren zu lassen.
              </li>
              <li>
                <strong>Löschung</strong> (Art. 17) — „Recht auf Vergessen".
              </li>
              <li>
                <strong>Einschränkung</strong> der Verarbeitung (Art. 18).
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20).
              </li>
              <li>
                <strong>Widerspruch</strong> (Art. 21) und{" "}
                <strong>Widerruf</strong> deiner Einwilligung (Art. 7 Abs. 3)
                — jederzeit und ohne Angabe von Gründen, mit Wirkung für die
                Zukunft.
              </li>
            </ul>
            <p>
              Um deine Rechte auszuüben, schreib uns einfach eine E-Mail an{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
              Wir antworten innerhalb der gesetzlichen Fristen.
            </p>
          </Block>

          <Block title="Beschwerderecht">
            <p>
              Wenn du der Meinung bist, dass die Verarbeitung deiner Daten
              gegen die DSGVO verstößt, kannst du dich bei der
              österreichischen Datenschutzbehörde beschweren:
            </p>
            <p>
              <strong>Österreichische Datenschutzbehörde</strong>
              <br />
              Barichgasse 40–42, 1030 Wien
              <br />
              Telefon: +43 1 52 152 25 69
              <br />
              E-Mail:{" "}
              <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>
              <br />
              Web: <a href="https://www.dsb.gv.at">www.dsb.gv.at</a>
            </p>
          </Block>

          <Block title="Änderungen dieser Erklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich Rechtslage
              oder verwendete Dienste ändern. Die jeweils aktuelle Version
              findest du stets unter{" "}
              <a href="https://u20poetryslam.at/datenschutz">
                u20poetryslam.at/datenschutz
              </a>
              .
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

const listStyle: React.CSSProperties = {
  paddingLeft: "1.25rem",
  margin: "0.5rem 0 1rem",
  display: "grid",
  gap: "0.3rem",
};

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
