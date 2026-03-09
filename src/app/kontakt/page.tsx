import type { Metadata } from "next"
import { Mail, MapPin, Instagram } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { fetchWP } from "@/lib/wp/api"
import { WWDPageData } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktiere den U20 Poetry Slam Wien \u2013 für Auftritte, Kooperationen oder Fragen.",
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
      <HeroSection title={introTitle} description={introDesc} align="center" />

      <section className="py-24 bg-white">
        <Container className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <ScrollReveal>
              <h2 className="text-2xl font-bold font-heading text-u20-gray-dark mb-8">Kontaktdaten</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-u20-orange/10 text-u20-orange flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-u20-gray-dark mb-1">E-Mail</p>
                    <a href={`mailto:${email}`} className="text-u20-orange hover:underline">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-u20-pink/10 text-u20-pink flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-u20-gray-dark mb-1">Adresse</p>
                    <p className="text-u20-gray whitespace-pre-line">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-u20-purple/10 text-u20-purple flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-u20-gray-dark mb-1">Social Media</p>
                    <p className="text-u20-gray">Folg uns auf Instagram für Updates und Eindrücke.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-xl font-bold font-heading text-u20-gray-dark mb-4">Du willst auftreten?</h3>
                <p className="text-u20-gray mb-6 leading-relaxed">
                  Bei unseren U20 Poetry Slams gibt es regelmäßig offene Startplätze.
                  Wenn du zwischen 14 und 20 Jahre alt bist und eigene Texte hast,
                  meld dich einfach bei uns!
                </p>
                <a
                  href={`mailto:${email}?subject=Ich möchte auftreten!`}
                  className="inline-flex items-center justify-center h-11 rounded-full px-8 bg-u20-orange text-white hover:bg-u20-orange-dark text-sm font-medium transition-all shadow-lg shadow-u20-orange/25"
                >
                  Jetzt anmelden
                </a>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-xl font-bold font-heading text-u20-gray-dark mb-4">Für Schulen & Lehrer*innen</h3>
                  <p className="text-u20-gray leading-relaxed">
                    Informationen zu unserem Workshop-Programm &quot;schreib&apos; KLASSE!&quot;
                    findest du auf der{" "}
                    <a href="/schreib-klasse" className="text-u20-orange hover:underline font-medium">
                      Workshop-Seite
                    </a>.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </Container>
      </section>
    </>
  )
}
