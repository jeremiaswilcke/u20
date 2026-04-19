import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsCard } from "@/components/sections/NewsCard";
import { fetchWP } from "@/lib/wp/api";
import { WPPost } from "@/lib/wp/types";
import { fetchInstagramPosts, captionToTitle, captionToExcerpt } from "@/lib/instagram";

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

interface UnifiedPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl?: string;
  externalUrl?: string;
}

export default async function NewsPage() {
  const [wpNews, igPosts] = await Promise.all([
    getAllNews(),
    fetchInstagramPosts(12),
  ]);

  // WP-Posts normalisieren
  const wpItems: UnifiedPost[] = (wpNews || []).map((post) => ({
    id: `wp-${post.id}`,
    title: post.title.rendered,
    date: post.date,
    excerpt: post.excerpt.rendered,
    slug: post.slug,
    category: "Aktuelles",
    imageUrl: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  }));

  // IG-Posts als Blog-Beiträge normalisieren
  const igItems: UnifiedPost[] = igPosts.map((post) => ({
    id: `ig-${post.id}`,
    title: captionToTitle(post.caption),
    date: post.timestamp,
    excerpt: captionToExcerpt(post.caption),
    slug: "",
    category: "Instagram",
    imageUrl: post.imageUrl,
    externalUrl: post.permalink,
  }));

  // Zusammenführen und chronologisch sortieren
  const allPosts = [...wpItems, ...igItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            den U20 Poetry Slam Wien. Posts von{" "}
            <a
              href="https://www.instagram.com/u20slamwien"
              target="_blank"
              rel="noreferrer"
            >
              @u20slamwien
            </a>{" "}
            erscheinen hier automatisch.
          </p>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u">
          {allPosts.length > 0 ? (
            <ScrollReveal className="news-grid" as="div">
              <>
                {allPosts.map((post) => (
                  <NewsCard
                    key={post.id}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    category={post.category}
                    imageUrl={post.imageUrl}
                    externalUrl={post.externalUrl}
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
