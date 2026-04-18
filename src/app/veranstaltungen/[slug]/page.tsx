import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichTextRenderer } from "@/components/wp/RichTextRenderer";
import { decodeHtmlEntities } from "@/lib/utils";
import { fetchWP } from "@/lib/wp/api";
import { WpEvent } from "@/lib/wp/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  try {
    const res = await fetchWP<{ events: WpEvent[] }>(
      `/tribe/events/v1/events?slug=${slug}`,
      { next: { revalidate: 300 } }
    );
    return res?.events?.[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Nicht gefunden" };
  return {
    title: decodeHtmlEntities(event.title),
    description:
      event.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 160) ||
      `${event.title} – U20 Poetry Slam Wien`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const start = new Date(event.start_date);
  const end = new Date(event.end_date);
  const isPast = end < new Date();

  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> ·{" "}
            <Link href="/veranstaltungen">Veranstaltungen</Link> ·{" "}
            {decodeHtmlEntities(event.title)}
          </div>
          <h1>{decodeHtmlEntities(event.title)}</h1>
          <p className="lede">
            {isPast ? "Dieser Termin ist vorbei." : null}{" "}
            {start.toLocaleDateString("de-AT", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            ·{" "}
            {start.toLocaleTimeString("de-AT", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr{event.venue?.venue ? ` · ${decodeHtmlEntities(event.venue.venue)}` : ""}
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u" style={{ maxWidth: "56rem" }}>
          {event.description && (
            <RichTextRenderer html={event.description} />
          )}
          <div style={{ marginTop: "2.5rem" }}>
            <Link className="btn btn-ghost" href="/veranstaltungen">
              ← Alle Termine
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
