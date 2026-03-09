import type { Metadata } from "next"
import { Suspense } from "react"
import { Mail, MapPin, Instagram } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { ContactForm } from "@/components/sections/ContactForm"
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

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form — takes more space */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <Suspense fallback={<div className="bg-white rounded-3xl p-10 border border-slate-100 animate-pulse h-96" />}>
                  <ContactForm />
                </Suspense>
              </ScrollReveal>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="sticky top-28 space-y-8">
                  {/* Contact Details */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100">
                    <h3 className="text-xl font-bold font-heading text-u20-gray-dark mb-6">Direkt erreichen</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-u20-orange/10 text-u20-orange flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-u20-gray-dark text-sm mb-1">E-Mail</p>
                          <a href={`mailto:${email}`} className="text-u20-orange hover:underline text-sm">
                            {email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-u20-pink/10 text-u20-pink flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-u20-gray-dark text-sm mb-1">Adresse</p>
                          <p className="text-u20-gray text-sm whitespace-pre-line">{address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-u20-purple/10 text-u20-purple flex items-center justify-center flex-shrink-0">
                          <Instagram className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-u20-gray-dark text-sm mb-1">Social Media</p>
                          <p className="text-u20-gray text-sm">Folg uns auf Instagram!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Cards */}
                  <div className="bg-gradient-to-br from-u20-orange to-u20-pink rounded-3xl p-8 text-white">
                    <h3 className="text-xl font-bold font-heading mb-3">Du willst auftreten?</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Bei unseren U20 Poetry Slams gibt es regelmäßig offene Startplätze.
                      14\u201320 Jahre, eigene Texte, max. 5 Minuten. Wähle oben &quot;Auftreten&quot; im Formular!
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-u20-purple to-u20-pink rounded-3xl p-8 text-white">
                    <h3 className="text-xl font-bold font-heading mb-3">Für Schulen</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      Infos zu schreib&apos; KLASSE! findest du auf der{" "}
                      <a href="/schreib-klasse" className="underline text-white hover:text-white/90">
                        Workshop-Seite
                      </a>.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}
