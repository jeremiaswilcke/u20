import type { Metadata } from "next"
import { Mail, MapPin, Instagram } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { fetchWP } from "@/lib/wp/api"
import { WWDPageData } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktiere den U20 Poetry Slam Wien – für Auftritte, Kooperationen oder Fragen.",
}

async function getKontaktData() {
  try {
    const pages = await fetchWP<WWDPageData[]>('/wwd/v1/pages?slug=kontakt', { next: { revalidate: 60 } })
    return pages[0] || null
  } catch {
    return null
  }
}

export default async function KontaktPage() {
  const pageData = await getKontaktData()

  const introTitle = pageData?.meta?._wwd_intro_title || "Schreib uns!"
  const introDesc = pageData?.meta?._wwd_intro_description || "Du willst auftreten, hast eine Frage oder möchtest mit uns zusammenarbeiten? Wir freuen uns auf deine Nachricht."
  const email = pageData?.meta?._wwd_intro_email || "hallo@u20poetryslam.at"
  const address = pageData?.meta?._wwd_intro_address || "U20 Poetry Slam Wien\nWien, Österreich"

  return (
    <>
      <HeroSection
        title={introTitle}
        description={introDesc}
        align="center"
      />

      <section className="py-20 bg-white">
        <Container className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold font-sans mb-6">Kontaktdaten</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-u20-50 text-u20-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">E-Mail</p>
                    <a href={`mailto:${email}`} className="text-u20-primary hover:underline">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-u20-50 text-u20-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Adresse</p>
                    <p className="text-slate-600 whitespace-pre-line">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-u20-50 text-u20-primary flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Social Media</p>
                    <p className="text-slate-600">Folg uns auf Instagram für Updates und Eindrücke.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA / Info Box */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold font-sans mb-4">Du willst auftreten?</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Bei unseren U20 Poetry Slams gibt es regelmäßig offene Startplätze.
                Wenn du zwischen 14 und 20 Jahre alt bist und eigene Texte hast,
                meld dich einfach bei uns!
              </p>
              <a
                href={`mailto:${email}?subject=Ich möchte auftreten!`}
                className="inline-flex items-center justify-center h-11 rounded-md px-8 bg-u20-primary text-white hover:bg-u20-600 text-sm font-medium transition-colors"
              >
                Jetzt anmelden
              </a>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xl font-bold font-sans mb-4">Für Schulen & Lehrer*innen</h3>
                <p className="text-slate-600 leading-relaxed">
                  Informationen zu unserem Workshop-Programm &quot;schreib&apos; KLASSE!&quot;
                  findest du auf der{" "}
                  <a href="/schreib-klasse" className="text-u20-primary hover:underline font-medium">
                    Workshop-Seite
                  </a>.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}
