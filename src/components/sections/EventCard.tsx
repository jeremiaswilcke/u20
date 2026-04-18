import Link from "next/link";
import { decodeHtmlEntities, stripHtml } from "@/lib/utils";

interface EventCardProps {
  title: string;
  startDate: string;
  venue?: string;
  excerpt?: string;
  slug: string;
  price?: string;
}

const MONTHS = [
  "JAN", "FEB", "MÄR", "APR", "MAI", "JUN",
  "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ",
];

export function EventCard({
  title,
  startDate,
  venue,
  excerpt,
  slug,
  price = "€ 8,–",
}: EventCardProps) {
  const date = new Date(startDate);
  const day = String(date.getDate()).padStart(2, "0");
  const mon = MONTHS[date.getMonth()];
  const time = date.toLocaleTimeString("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const decodedTitle = decodeHtmlEntities(title);
  const cleanExcerpt = excerpt ? stripHtml(excerpt) : "";

  return (
    <article className="event-card">
      <div className="event-photo">
        <div className="ph-pattern" />
        <div className="ph-glyph">{day}</div>
        <div className="event-date-badge">
          <span className="day">{day}</span>
          <span className="mon">{mon}</span>
        </div>
      </div>
      <div className="event-body">
        <div className="event-meta">
          <span>{time} Uhr</span>
          {venue && <span>{decodeHtmlEntities(venue)}</span>}
        </div>
        <h3 className="event-title">{decodedTitle}</h3>
        {cleanExcerpt && (
          <p className="event-desc">{cleanExcerpt}</p>
        )}
        <div className="event-foot">
          <span className="event-price">{price}</span>
          <Link className="event-link" href={`/veranstaltungen/${slug}`}>
            Mehr Info
          </Link>
        </div>
      </div>
    </article>
  );
}
