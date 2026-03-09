import type { Metadata } from "next"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { NewsCard } from "@/components/sections/NewsCard"
import { fetchWP } from "@/lib/wp/api"
import { WPPost } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "News",
  description: "Neuigkeiten und Aktuelles vom U20 Poetry Slam Wien.",
}

async function getAllNews() {
  try {
    return await fetchWP<WPPost[]>('/wp/v2/posts?per_page=12&_embed', { next: { revalidate: 300 } })
  } catch {
    return []
  }
}

export default async function NewsPage() {
  const news = await getAllNews()

  return (
    <>
      <HeroSection
        title="Neuigkeiten"
        description="Was bei uns passiert – Rückblicke, Ankündigungen und alles rund um den U20 Poetry Slam Wien."
        align="center"
      />

      <section className="py-16 bg-white">
        <Container>
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((post) => {
                const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                return (
                  <NewsCard
                    key={post.id}
                    id={post.id}
                    title={post.title.rendered}
                    date={post.date}
                    excerpt={post.excerpt.rendered}
                    slug={post.slug}
                    imageUrl={imageUrl}
                  />
                )
              })}
            </div>
          ) : (
            <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-slate-500 text-lg">Derzeit keine Neuigkeiten. Schau bald wieder vorbei!</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
