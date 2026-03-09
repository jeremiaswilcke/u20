import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { RichTextRenderer } from "@/components/wp/RichTextRenderer"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { fetchWP } from "@/lib/wp/api"
import { WpEvent } from "@/lib/wp/types"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

async function getEvent(slug: string) {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      `/tribe/events/v1/events?slug=${slug}`,
      { next: { revalidate: 300 } }
    )
    return res?.events?.[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: "Nicht gefunden" }
  return {
    title: event.title,
    description: event.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 160) || `${event.title} \u2013 U20 Poetry Slam Wien`,
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) notFound()

  const startDate = new Date(event.start_date)
  const endDate = new Date(event.end_date)
  const isPast = endDate < new Date()

  return (
    <section className="py-16 bg-white">
      <Container className="max-w-3xl">
        <Button asChild variant="ghost" className="mb-8 -ml-3 text-u20-gray-light">
          <Link href="/veranstaltungen">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu Veranstaltungen
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-4">
          {isPast && <Badge variant="secondary">Vergangen</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-heading text-u20-gray-dark">
          {event.title}
        </h1>

        {/* Event Meta */}
        <div className="flex flex-wrap gap-6 mb-10 text-u20-gray">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-u20-orange" />
            <span className="font-medium">
              {startDate.toLocaleDateString("de-AT", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-u20-orange" />
            <span className="font-medium">
              {startDate.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })} Uhr
            </span>
          </div>
          {event.venue?.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-u20-orange" />
              <span className="font-medium">
                {event.venue.venue}
                {event.venue.city && `, ${event.venue.city}`}
              </span>
            </div>
          )}
        </div>

        {event.image?.url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={event.image.url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {event.description && (
          <RichTextRenderer html={event.description} />
        )}
      </Container>
    </section>
  )
}
