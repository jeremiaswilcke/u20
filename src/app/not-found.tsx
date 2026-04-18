import Link from "next/link";

export default function NotFound() {
  return (
    <section className="u-section">
      <div
        className="container-u"
        style={{ textAlign: "center", maxWidth: "36rem" }}
      >
        <p
          style={{
            fontFamily: "var(--u-font-display)",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            color: "var(--u-magenta)",
            lineHeight: 1,
            margin: "0 0 1rem",
          }}
        >
          404
        </p>
        <h1>Seite nicht gefunden.</h1>
        <p
          style={{
            color: "var(--u-ink-soft)",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Die Seite, die du suchst, existiert nicht oder wurde verschoben.
        </p>
        <Link className="btn" href="/">
          Zurück zur Startseite
        </Link>
      </div>
    </section>
  );
}
