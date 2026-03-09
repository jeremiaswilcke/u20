import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { RichTextRenderer } from "@/components/wp/RichTextRenderer"
import { fetchWP } from "@/lib/wp/api"
import { WWDPageData } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "schreib\u2019 KLASSE! \u2013 Workshops",
  description: "Workshop-Programm des U20 Poetry Slam Wien für Schulen und Jugendliche. Kreatives Schreiben trifft Performance.",
}

async function getWorkshopData() {
  try {
    const pages = await fetchWP<WWDPageData[]>('/wwd/v1/pages?slug=schreib-klasse', { next: { revalidate: 60 } })
    return pages[0] || null
  } catch {
    return null
  }
}

export default async function SchreibKlassePage() {
  const pageData = await getWorkshopData()

  const heroTitle = pageData?.meta?._wwd_hero_hero_title || "schreib\u2019 KLASSE!"
  const heroDesc = pageData?.meta?._wwd_hero_hero_description || "Wir kommen an eure Schule. Kreatives Schreiben trifft Performance \u2013 mit echten Slam-Poet*innen."

  const infoContent = pageData?.meta?._wwd_info_content || "Das Workshop-Programm <strong>schreib\u2019 KLASSE!</strong> bringt Poetry Slam direkt ins Klassenzimmer. In mehrstündigen Workshops arbeiten professionelle Slam-Poet*innen gemeinsam mit Schüler*innen an eigenen Texten \u2013 von der Idee bis zur Bühne.<br/><br/>Dabei steht nicht nur das Schreiben im Fokus, sondern auch der Mut, die eigene Stimme zu erheben. Am Ende jedes Workshops gibt es eine kleine Aufführung, bei der die Teilnehmer*innen ihre Texte vor Publikum präsentieren."
  const infoImage = pageData?.meta?._wwd_info_image || null

  const requirements = pageData?.meta?._wwd_requirements_items || [
    { title: "Alter", value: "14\u201320 Jahre" },
    { title: "Dauer", value: "3\u20135 Unterrichtseinheiten" },
    { title: "Gruppengröße", value: "Max. 30 Schüler*innen" },
    { title: "Kosten", value: "Auf Anfrage" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-u20-purple via-u20-pink to-u20-orange -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)] -z-10" />

        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-heading text-white mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              {heroDesc}
            </p>
          </div>
        </Container>
      </section>

      {/* Workshop Info */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="text-u20-orange font-medium text-sm uppercase tracking-wider mb-3">Unser Programm</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-u20-gray-dark mb-6">Was ist schreib&apos; KLASSE!?</h2>
              <RichTextRenderer html={infoContent} />
            </ScrollReveal>
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50">
                {infoImage ? (
                  <Image
                    src={infoImage}
                    alt="schreib' KLASSE! Workshop"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-u20-orange/10 to-u20-pink/10 flex items-center justify-center">
                    <span className="font-heading text-u20-orange/20 text-4xl">Workshop</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-slate-50">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-u20-gray-dark mb-14">Details & Anforderungen</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {requirements.map((item: { title: string; value: string }, i: number) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sm text-u20-orange font-medium uppercase tracking-wider mb-3">{item.title}</p>
                  <p className="text-xl font-bold text-u20-gray-dark font-heading">{item.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <Container className="text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-u20-gray-dark mb-4">Interesse?</h2>
            <p className="text-u20-gray text-lg mb-8 leading-relaxed">
              Wir freuen uns über Anfragen von Schulen, Jugendzentren und Bildungseinrichtungen.
            </p>
            <a
              href="mailto:hallo@u20poetryslam.at"
              className="inline-flex items-center justify-center h-12 rounded-full px-8 bg-u20-orange text-white hover:bg-u20-orange-dark text-base font-medium transition-all shadow-lg shadow-u20-orange/25"
            >
              Kontakt aufnehmen
            </a>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
