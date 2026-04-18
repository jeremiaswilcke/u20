import Link from "next/link";
import { decodeHtmlEntities, stripHtml } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category?: string;
}

export function NewsCard({
  title,
  date,
  excerpt,
  slug,
  category = "Aktuelles",
}: NewsCardProps) {
  const decodedTitle = decodeHtmlEntities(title);
  const cleanExcerpt = stripHtml(excerpt);
  const formattedDate = new Date(date).toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="news-card">
      <div className="news-photo">
        <div className="ph-pattern" />
        <div className="news-date-badge">{formattedDate}</div>
      </div>
      <div className="news-body">
        <div className="news-cat">{category}</div>
        <h3 className="news-title">{decodedTitle}</h3>
        <p className="news-snippet">{cleanExcerpt}</p>
        <Link className="news-link" href={`/news/${slug}`}>
          Weiterlesen
        </Link>
      </div>
    </article>
  );
}
