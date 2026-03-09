import type { Metadata } from "next"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { EventCard } from "@/components/sections/EventCard"
import { fetchWP } from "@/lib/wp/api"
import { WpEvent } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "Veranstaltungen",
  description: "Alle kommenden U20 Poetry Slams und Events in Wien.",
}

async function getUpcomingEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      '/tribe/events/v1/events?per_page=20&start_date=' + new Date().toISOString(),
      { next: { revalidate: 300 } }
    )
    return res?.events || []
  } catch {
    return []
  }
}

async function getPastEvents() {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      '/tribe/events/v1/events?per_page=6&end_date=' + new Date().toISOString() + '&order=desc',
      { next: { revalidate: 300 } }
    )
    return res?.events || []
  } catch {
    return []
  }
}

export default async function VeranstaltungenPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()])

  return (
    <>
      <HeroSection
        title="Veranstaltungen"
        description="Alle kommenden U20 Poetry Slams, Open Lists und Sonderformate auf einen Blick."
        align="center"
      />

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-2xl font-bold font-sans mb-8">Kommende Events</h2>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event, i) => (
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
            <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-slate-500 text-lg">Derzeit keine anstehenden Termine. Schau bald wieder vorbei!</p>
            </div>
          )}
        </Container>
      </section>

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-16 bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold font-sans mb-8 text-slate-400">Vergangene Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
              {past.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  startDate={event.start_date}
                  venue={event.venue?.venue}
                  excerpt={event.description}
                  slug={event.slug}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
