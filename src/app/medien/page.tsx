import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Medien",
  description:
    "Fotos, Videos, Pressestimmen und Presse-Kit zum U20 Poetry Slam Wien. Redaktionelle Nutzung frei bei Quellenangabe.",
};

const GALLERY = [
  { img: "/images/finale-2025.jpg", overlay: "Mikro · Spot", cap: "U20 Slam · Feb 2025 · Finale" },
  { img: "/images/publikum.jpg", overlay: "Publikum · Bühne 1", cap: "WNB Slam · Feb 2024" },
  { img: "/images/alle-teilnehmenden.png", overlay: "Workshop · schreib' KLASSE!", cap: "Alle Teilnehmenden" },
  { img: "/images/niklas-berger.jpg", overlay: "Niklas Berger", cap: "U20 WN-Slam · Mär 2024" },
  { img: "/images/meisterschaft-2024.jpg", overlay: "WNB-Landesmeisterschaft", cap: "U20 Meisterschaften · Apr 2024 · Weixelbraun", wide: true },
  { img: "/images/stars-2024.jpg", overlay: "Stars des Abends", cap: "WN-Slam · Mär 2024" },
];

const VIDEOS = [
  {
    pc1: "#E11A7C", pc2: "#1a1412",
    label: "Finale 2025",
    title: 'Lena K. — \u201EWenn Worte zurückrudern\u201C',
    desc: "Der Gewinner-Text der Landesmeisterschaft. Aufgenommen live im Dschungel Wien, 14. Feb. 2025.",
    duration: "4:12",
    meta: ["4:12", "HD", "DE"],
    feature: true,
  },
  {
    pc1: "#F39019", pc2: "#3D2A5A",
    title: "Was ist Poetry Slam? (Kurz-Doku)",
    desc: "Drei Minuten Erklärung für Eltern, Lehrer:innen, Neugierige. Geschnitten 2024.",
    duration: "2:58",
    meta: ["2:58", "Doku"],
  },
  {
    pc1: "#2F5D3E", pc2: "#F6D94A",
    title: "schreib' KLASSE! Blick hinter die Kulissen",
    desc: "Ein Workshop in 1:45. Ungeschnitten ehrlich.",
    duration: "1:45",
    meta: ["1:45", "Doku"],
  },
  {
    pc1: "#E11A7C", pc2: "#F39019",
    title: 'Ali, 18 — \u201EHeimat, ich kenn dich nicht\u201C',
    desc: "Platz 2 bei der WNB 2025. Eins der meistgesehenen Videos.",
    duration: "3:24",
    meta: ["3:24", "Slam-Text"],
  },
];

const PRESS = [
  {
    quote: "\u201EDie Bühne, die der junge Wiener Literaturbetrieb gerade am meisten braucht.\u201C",
    source: "— Wiener Zeitung, 03.2024",
  },
  {
    quote: "\u201EEin Abend, an dem man als Erwachsener lernt, zuzuhören.\u201C",
    source: "— Der Standard, 10.2023",
  },
  {
    quote: "\u201EIrgendwo zwischen Lesung, Konzert und Therapie — und absolut großartig.\u201C",
    source: "— FM4 Homebase, 09.2024",
  },
  {
    quote: "\u201EAdina Wilcke gibt Teenager:innen eine Mikrofonhand — und sie greifen zu.\u201C",
    source: "— Falter, 05.2024",
  },
];

const DOWNLOADS = [
  {
    icon: "📦",
    title: "Komplettes Presse-Kit",
    desc: "Logo-Pack (SVG, PNG), Pressetexte, hochauflösende Fotos, Kurzbios.",
    meta: "ZIP · 38 MB",
  },
  {
    icon: "🎨",
    title: "Logo-Pack",
    desc: "SVG & PNG in sechs Varianten — auf hell, dunkel, einfarbig.",
    meta: "ZIP · 1,2 MB",
  },
  {
    icon: "📝",
    title: "Pressetext (lang/kurz)",
    desc: "Zwei Versionen in DE — 600 Wörter und 120 Wörter, direkt verwendbar.",
    meta: "DOCX · 42 KB",
  },
  {
    icon: "📸",
    title: "Pressefotos",
    desc: "12 druckreife Fotos, mindestens 4000 px, mit Credits.",
    meta: "ZIP · 34 MB",
  },
];

export default function MedienPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Medien
          </div>
          <h1>Medien.</h1>
          <p className="lede">
            Fotos, Videos, Presseberichte, Logos zum Download, O-Töne. Wenn Sie
            für eine Zeitung, einen Sender oder eine Schulzeitung recherchieren
            — hier ist Ihr Startpunkt.
          </p>
        </div>
      </section>

      {/* TYPE PILLS */}
      <div className="date-strip">
        <div className="container-u date-strip-inner">
          <span className="label">Medien-Typ</span>
          <a className="pill active" href="#fotos">Fotos</a>
          <a className="pill" href="#videos">Videos</a>
          <a className="pill" href="#presse">Presse</a>
          <a className="pill" href="#downloads">Download-Paket</a>
        </div>
      </div>

      {/* GALLERY */}
      <section id="fotos" className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Fotostrecke.</h2>
            <p>
              Aus den letzten Slams und Workshops. Alle Fotos © Petra
              Weixelbraun. Für redaktionelle Zwecke frei bei
              Quellenangabe.
            </p>
          </ScrollReveal>
          <div className="gallery">
            {GALLERY.map((g, i) => (
              <figure
                key={i}
                className={`g-tile reveal ${g.wide ? "wide" : ""}`.trim()}
              >
                <div className="ph" style={{ background: "none" }}>
                  <img src={g.img} alt={g.overlay} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                  <div className="ph-overlay">{g.overlay}</div>
                </div>
                <figcaption>{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Videos.</h2>
            <p>
              Ausgewählte Auftritte und Doku-Schnipsel. Mehr auf unserem{" "}
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                YouTube-Kanal
              </a>
              .
            </p>
          </ScrollReveal>
          <div className="video-grid">
            {VIDEOS.map((v, i) => (
              <article
                key={i}
                className={`vid-card reveal ${v.feature ? "feature" : ""}`.trim()}
              >
                <div
                  className="vid-thumb"
                  style={{
                    ["--pc1" as never]: v.pc1,
                    ["--pc2" as never]: v.pc2,
                  }}
                >
                  <span className="play-btn">▶</span>
                  <span className="vid-duration">{v.duration}</span>
                </div>
                <div className="vid-body">
                  {v.label && <span className="vid-label">{v.label}</span>}
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <div className="vid-meta">
                    {v.meta.map((m, j) => (
                      <span key={j}>{m}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section id="presse" className="u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Was die Presse schreibt.</h2>
            <p>
              Eine kleine Auswahl. Für volle Artikel bitte E-Mail an{" "}
              <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
            </p>
          </ScrollReveal>
          <div className="press-grid">
            {PRESS.map((p, i) => (
              <figure key={i} className="press-card reveal">
                <blockquote>{p.quote}</blockquote>
                <figcaption>{p.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="downloads" className="bg-soft u-section">
        <div className="container-u">
          <ScrollReveal className="section-title-wrap">
            <h2>Presse-Kit.</h2>
            <p>
              Für Redaktionen und Veranstalter:innen. Alles in einem Ordner —
              oder einzeln.
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
    </>
  );
}
