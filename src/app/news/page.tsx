import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsCard } from "@/components/sections/NewsCard";
import { fetchWP } from "@/lib/wp/api";
import { WPPost } from "@/lib/wp/types";

export const metadata: Metadata = {
  title: "Neuigkeiten",
  description:
    "Nachberichte, Recap-Videos und alles, was zwischen den Slams passiert.",
};

async function getAllNews() {
  try {
    return await fetchWP<WPPost[]>(
      "/wp/v2/posts?per_page=12&_embed",
      { next: { revalidate: 300 } }
    );
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> · Neuigkeiten
          </div>
          <h1>Neuigkeiten.</h1>
          <p className="lede">
            Was bei uns passiert — Rückblicke, Ankündigungen und alles rund um
            den U20 Poetry Slam Wien.
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u">
          {news.length > 0 ? (
            <ScrollReveal className="news-grid" as="div">
              <>
                {news.map((post) => (
                  <NewsCard
                    key={post.id}
                    title={post.title.rendered}
                    date={post.date}
                    excerpt={post.excerpt.rendered}
                    slug={post.slug}
                  />
                ))}
              </>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div
                style={{
                  padding: "4rem",
                  textAlign: "center",
                  background: "var(--u-paper)",
                  border: "1px solid var(--u-line)",
                  borderRadius: "var(--u-radius-lg)",
                }}
              >
                <p style={{ color: "var(--u-mute)", fontSize: "1.1rem" }}>
                  Derzeit keine Neuigkeiten. Schau bald wieder vorbei!
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
