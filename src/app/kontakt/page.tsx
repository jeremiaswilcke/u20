import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SignupForm } from "@/components/sections/SignupForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Direkt-Kontakt zum U20 Poetry Slam Wien — für Auftritte, Workshops, Presse oder einfach Fragen.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Kontakt
          </div>
          <h1>Schreib&apos; uns.</h1>
          <p className="lede">
            Du willst auf die Bühne, einen Workshop besuchen, mit uns
            zusammenarbeiten oder hast einfach eine Frage? Wir hören zu —
            unverbindlich und vertraulich.
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u">
          <ScrollReveal className="form-block">
            <div className="form-intro">
              <span className="eyebrow">Direkt-Kontakt</span>
              <h2
                style={{
                  color: "var(--u-magenta)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                Wir sind für dich da.
              </h2>
              <p>
                Schreib uns kurz, worum&apos;s geht — wir antworten meistens
                innerhalb von ein paar Tagen. Versprochen.
              </p>
              <p>
                Oder direkt per Mail an{" "}
                <a href="mailto:info@u20poetryslam.at">info@u20poetryslam.at</a>.
              </p>
              <p className="hand-note">
                Auch wenn du dich nur traust, mal Hallo zu sagen.
              </p>
            </div>
            <SignupForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
