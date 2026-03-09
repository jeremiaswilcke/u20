import { Container } from "@/components/layout/Container"
import { VideoHero } from "@/components/sections/VideoHero"
import { EventCard } from "@/components/sections/EventCard"
import { NewsCard } from "@/components/sections/NewsCard"
import { TestimonialSlider } from "@/components/sections/TestimonialSlider"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
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

  const heroTitle = pageData?.meta?._wwd_hero_items?.[0]?.hero_title || "Poetry Slam\nin Wien."
  const heroDesc = pageData?.meta?._wwd_hero_items?.[0]?.hero_description || "Wir bringen junge Texte auf die Bühne. Laut, leise, lyrisch, prosa – und auf den Punkt."
  const cta1Text = pageData?.meta?._wwd_hero_items?.[0]?.primary_cta_text || "Zu den Slams"
  const cta1Link = pageData?.meta?._wwd_hero_items?.[0]?.primary_cta_link || "/veranstaltungen"
  const heroVideoUrl = pageData?.meta?._wwd_hero_items?.[0]?.hero_video || undefined

  const workshopTitle = pageData?.meta?._wwd_workshop_title || "schreib\u2019 KLASSE!"
  const workshopDesc = pageData?.meta?._wwd_workshop_description || "Wir kommen an Schulen und zeigen Jugendlichen den Einstieg ins kreative Schreiben und auf die Bühne."

  return (
    <>
      {/* VIDEO HERO */}
      <VideoHero
        title={heroTitle}
        description={heroDesc}
        videoUrl={heroVideoUrl}
      >
        <Button asChild size="lg">
          <Link href={cta1Link}>{cta1Text}</Link>
        </Button>
        <Button asChild size="lg" variant="white">
          <Link href="/kontakt">Mitmachen</Link>
        </Button>
      </VideoHero>

      {/* EVENTS PREVIEW */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-u20-orange font-medium text-sm uppercase tracking-wider mb-2">Veranstaltungen</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-u20-gray-dark">Nächste Slams</h2>
                <p className="text-u20-gray mt-3">Komm vorbei oder steh selbst auf der Bühne.</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/veranstaltungen">Alle ansehen →</Link>
              </Button>
            </div>
          </ScrollReveal>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 100}>
                  <EventCard
                    id={event.id}
                    title={event.title}
                    startDate={event.start_date}
                    venue={event.venue?.venue}
                    excerpt={event.description}
                    slug={event.slug}
                    isFeatured={i === 0}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="p-16 text-center bg-slate-50 rounded-2xl">
                <p className="text-u20-gray-light text-lg">Derzeit keine anstehenden U20-Termine. Schau bald wieder vorbei!</p>
              </div>
            </ScrollReveal>
          )}

          <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
            <Link href="/veranstaltungen">Alle ansehen</Link>
          </Button>
        </Container>
      </section>

      {/* WORKSHOP CALLOUT */}
      <section className="py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-u20-purple via-u20-pink to-u20-orange" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />

        <Container className="relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-6 text-white">
              {workshopTitle}
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              {workshopDesc}
            </p>
            <Button asChild size="lg" variant="white">
              <Link href="/schreib-klasse">Infos für Schulen & Lehrer</Link>
            </Button>
          </ScrollReveal>
        </Container>
      </section>

      {/* NEWS PREVIEW */}
      <section className="py-24 bg-slate-50">
        <Container>
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-u20-pink font-medium text-sm uppercase tracking-wider mb-2">Aktuelles</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-u20-gray-dark">Neues vom Poetry Slam Nachwuchs</h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/news">Alle News →</Link>
              </Button>
            </div>
          </ScrollReveal>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((post, i) => {
                const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                return (
                  <ScrollReveal key={post.id} delay={i * 100}>
                    <NewsCard
                      id={post.id}
                      title={post.title.rendered}
                      date={post.date}
                      excerpt={post.excerpt.rendered}
                      slug={post.slug}
                      imageUrl={imageUrl}
                    />
                  </ScrollReveal>
                )
              })}
            </div>
          ) : (
            <ScrollReveal>
              <div className="p-16 text-center bg-white rounded-2xl border border-slate-100">
                <p className="text-u20-gray-light text-lg">Derzeit keine Neuigkeiten.</p>
              </div>
            </ScrollReveal>
          )}
        </Container>
      </section>

      {/* LEHRERSTIMMEN / TESTIMONIALS */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-u20-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-u20-pink/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center mb-4">
              <p className="text-u20-purple font-medium text-sm uppercase tracking-wider mb-2">Stimmen aus Schulen</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-u20-gray-dark">Was Lehrer*innen sagen</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialSlider />
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
