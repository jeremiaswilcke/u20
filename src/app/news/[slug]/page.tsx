import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { RichTextRenderer } from "@/components/wp/RichTextRenderer"
import { Button } from "@/components/ui/Button"
import { fetchWP } from "@/lib/wp/api"
import { WPPost } from "@/lib/wp/types"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  try {
    const posts = await fetchWP<WPPost[]>(`/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 300 } })
    return posts[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Nicht gefunden" }
  return {
    title: post.title.rendered.replace(/(<([^>]+)>)/gi, ""),
    description: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").slice(0, 160),
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered

  return (
    <section className="py-16 bg-white">
      <Container className="max-w-3xl">
        <Button asChild variant="ghost" className="mb-8 -ml-3 text-u20-gray-light">
          <Link href="/news">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu News
          </Link>
        </Button>

        <p className="text-u20-orange font-medium mb-4 text-sm uppercase tracking-wider">
          {new Date(post.date).toLocaleDateString("de-AT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-heading text-u20-gray-dark">
          {post.title.rendered}
        </h1>

        {imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <RichTextRenderer html={post.content.rendered} />
      </Container>
    </section>
  )
}
