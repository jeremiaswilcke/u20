import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { EventCard } from "@/components/sections/EventCard"
import { NewsCard } from "@/components/sections/NewsCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { fetchWP } from "@/lib/wp/api"
import { WPPost, WpEvent, WWDPageData } from "@/lib/wp/types"

async function getHomeData() {
  try {
    const wwd = await fetchWP<WWDPageData[]>('/wwd/v1/pages?slug=home', { next: { revalidate: 60 } })
    return wwd[0] || null
  } catch {
    return null
  }
}

async function getLatestNews() {
  try {
    return await fetchWP<WPPost[]>('/wp/v2/posts?per_page=3&_embed', { next: { revalidate: 300 } })
  } catch {
    return []
  }
}

async function getUpcomingEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>('/tribe/events/v1/events?per_page=3&start_date=' + new Date().toISOString(), { next: { revalidate: 300 } })
    return res?.events || []
  } catch {
    return []
  }
}

export default async function Home() {
  const [pageData, news, events] = await Promise.all([
    getHomeData(),
    getLatestNews(),
    getUpcomingEvents()
  ])

  const heroTitle = pageData?.meta?._wwd_hero_items?.[0]?.hero_title || "Poetry Slam in Wien."
  const heroDesc = pageData?.meta?._wwd_hero_items?.[0]?.hero_description || "Wir bringen junge Texte auf die Bühne. Laut, leise, lyrisch, prosa – und auf den Punkt."
  const cta1Text = pageData?.meta?._wwd_hero_items?.[0]?.primary_cta_text || "Zu den Slams"
  const cta1Link = pageData?.meta?._wwd_hero_items?.[0]?.primary_cta_link || "/veranstaltungen"

  const workshopTitle = pageData?.meta?._wwd_workshop_title || "schreib' KLASSE! – Workshops"
  const workshopDesc = pageData?.meta?._wwd_workshop_description || "Wir kommen an Schulen und zeigen Jugendlichen den Einstieg ins kreative Schreiben und auf die Bühne."

  return (
    <>
      {/* HERO */}
      <HeroSection title={heroTitle} description={heroDesc} align="left">
        <Button asChild size="lg">
          <Link href={cta1Link}>{cta1Text}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/kontakt">Mitmachen</Link>
        </Button>
      </HeroSection>

      {/* EVENTS PREVIEW */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold font-sans">Nächste Slams</h2>
              <p className="text-slate-600 mt-2">Komm vorbei oder steh selbst auf der Bühne.</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/veranstaltungen">Alle ansehen</Link>
            </Button>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  startDate={event.start_date}
                  venue={event.venue?.venue}
                  excerpt={event.description}
                  slug={event.slug}
                  isFeatured={i === 0}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-lg">
              <p className="text-slate-500">Derzeit keine anstehenden U20-Termine. Schau bald wieder vorbei!</p>
            </div>
          )}

          <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
            <Link href="/veranstaltungen">Alle ansehen</Link>
          </Button>
        </Container>
      </section>

      {/* WORKSHOP CALLOUT */}
      <section className="py-24 bg-u20-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-u20-700/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

        <Container className="relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-6">
            {workshopTitle}
          </h2>
          <p className="text-xl text-u20-50 leading-relaxed mb-10">
            {workshopDesc}
          </p>
          <Button asChild size="lg" className="bg-white text-u20-900 hover:bg-slate-100">
            <Link href="/schreib-klasse">Infos für Schulen & Lehrer</Link>
          </Button>
        </Container>
      </section>

      {/* NEWS PREVIEW */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold font-sans">Neues aus dem Verein</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/news">Alle News</Link>
            </Button>
          </div>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((post) => {
                const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                return (
                  <NewsCard
                    key={post.id}
                    id={post.id}
                    title={post.title.rendered}
                    date={post.date}
                    excerpt={post.excerpt.rendered}
                    slug={post.slug}
                    imageUrl={imageUrl}
                  />
                )
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-slate-500">Derzeit keine Neuigkeiten.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
