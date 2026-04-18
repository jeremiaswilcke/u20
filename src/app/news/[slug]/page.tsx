import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichTextRenderer } from "@/components/wp/RichTextRenderer";
import { decodeHtmlEntities } from "@/lib/utils";
import { fetchWP } from "@/lib/wp/api";
import { WPPost } from "@/lib/wp/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const posts = await fetchWP<WPPost[]>(
      `/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 300 } }
    );
    return posts[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Nicht gefunden" };
  return {
    title: decodeHtmlEntities(post.title.rendered),
    description: post.excerpt.rendered
      .replace(/(<([^>]+)>)/gi, "")
      .slice(0, 160),
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="page-hero">
        <div className="container-u">
          <div className="crumbs">
            <Link href="/">Home</Link> ·{" "}
            <Link href="/news">Neuigkeiten</Link> · {date}
          </div>
          <h1>{decodeHtmlEntities(post.title.rendered)}</h1>
        </div>
      </section>

      <section className="u-section">
        <div className="container-u" style={{ maxWidth: "56rem" }}>
          <RichTextRenderer html={post.content.rendered} />
          <div style={{ marginTop: "2.5rem" }}>
            <Link className="btn btn-ghost" href="/news">
              ← Alle News
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
