import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { RichTextRenderer } from "@/components/wp/RichTextRenderer"
import { fetchWP } from "@/lib/wp/api"
import { WWDPageData } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "schreib' KLASSE! – Workshops",
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

  const heroTitle = pageData?.meta?._wwd_hero_hero_title || "schreib' KLASSE!"
  const heroDesc = pageData?.meta?._wwd_hero_hero_description || "Wir kommen an eure Schule. Kreatives Schreiben trifft Performance – mit echten Slam-Poet*innen."
  const infoContent = pageData?.meta?._wwd_info_content || "Das Workshop-Programm <strong>schreib' KLASSE!</strong> bringt Poetry Slam direkt ins Klassenzimmer. In mehrstündigen Workshops arbeiten professionelle Slam-Poet*innen gemeinsam mit Schüler*innen an eigenen Texten – von der Idee bis zur Bühne.<br/><br/>Dabei steht nicht nur das Schreiben im Fokus, sondern auch der Mut, die eigene Stimme zu erheben. Am Ende jedes Workshops gibt es eine kleine Aufführung, bei der die Teilnehmer*innen ihre Texte vor Publikum präsentieren."
  const infoImage = pageData?.meta?._wwd_info_image || null

  const requirements = pageData?.meta?._wwd_requirements_items || [
    { title: "Alter", value: "14–20 Jahre" },
    { title: "Dauer", value: "3–5 Unterrichtseinheiten" },
    { title: "Gruppengröße", value: "Max. 30 Schüler*innen" },
    { title: "Kosten", value: "Auf Anfrage (Förderungen möglich)" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-u20-500 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-u20-600 to-u20-400 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />

        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl text-u20-50 leading-relaxed max-w-2xl">
              {heroDesc}
            </p>
          </div>
        </Container>
      </section>

      {/* Workshop Info */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-sans mb-6">Was ist schreib&apos; KLASSE!?</h2>
              <RichTextRenderer html={infoContent} />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              {infoImage ? (
                <Image
                  src={infoImage}
                  alt="schreib' KLASSE! Workshop"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-sans text-2xl">
                  Workshop Foto
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold font-sans text-center mb-12">Details & Anforderungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {requirements.map((item: { title: string; value: string }, i: number) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-100">
                <p className="text-sm text-u20-primary font-medium uppercase tracking-wider mb-2">{item.title}</p>
                <p className="text-xl font-bold text-slate-900 font-sans">{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <Container className="text-center max-w-2xl">
          <h2 className="text-3xl font-bold font-sans mb-4">Interesse?</h2>
          <p className="text-slate-600 text-lg mb-8">
            Wir freuen uns über Anfragen von Schulen, Jugendzentren und Bildungseinrichtungen.
            Schreib uns einfach eine E-Mail.
          </p>
          <a
            href="mailto:hallo@u20poetryslam.at"
            className="inline-flex items-center justify-center h-11 rounded-md px-8 bg-u20-primary text-white hover:bg-u20-600 text-sm font-medium transition-colors"
          >
            Kontakt aufnehmen
          </a>
        </Container>
      </section>
    </>
  )
}
