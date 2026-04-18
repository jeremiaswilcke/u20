import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-u">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo />
            <p>
              Poetry Slam für alle unter 20 in Wien. Monatlich im DSCHUNGEL
              Wien — Bühne, Bewerb, Workshop, Community.
            </p>
          </div>

          <div>
            <h4>Formate</h4>
            <ul>
              <li>
                <Link href="/veranstaltungen">U20 Poetry Slam</Link>
              </li>
              <li>
                <Link href="/schreib-klasse">schreib&apos; KLASSE!</Link>
              </li>
              <li>
                <Link href="/lehrer">Für Lehrer:innen</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Infos</h4>
            <ul>
              <li>
                <Link href="/team">Unser Team</Link>
              </li>
              <li>
                <Link href="/medien">Medien</Link>
              </li>
              <li>
                <Link href="/news">Neuigkeiten</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href="mailto:info@u20poetryslam.at">
                  info@u20poetryslam.at
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/u20slamwien"
                  target="_blank"
                  rel="noreferrer"
                >
                  @u20slamwien
                </a>
              </li>
              <li>
                <a
                  href="https://www.dschungelwien.at/u20-poetry-slam"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dschungel Wien
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} U20 Poetry Slam Wien — Alle Rechte
            vorbehalten
          </span>
          <span>
            <Link href="/impressum">Impressum</Link>
            {" · "}
            <Link href="/datenschutz">Datenschutz</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
