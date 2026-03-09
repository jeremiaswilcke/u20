import type { Metadata } from "next"
import { Container } from "@/components/layout/Container"
import { HeroSection } from "@/components/sections/HeroSection"
import { TeamCard } from "@/components/sections/TeamCard"
import { fetchWP } from "@/lib/wp/api"
import { WWDPageData } from "@/lib/wp/types"

export const metadata: Metadata = {
  title: "Team",
  description: "Das Team hinter dem U20 Poetry Slam Wien.",
}

interface TeamMember {
  id: number
  title: { rendered: string }
  meta: {
    _wwd_role?: string
    _wwd_description?: string
    _wwd_image?: string
    _wwd_email?: string
  }
}

async function getTeamPageData() {
  try {
    const pages = await fetchWP<WWDPageData[]>('/wwd/v1/pages?slug=team', { next: { revalidate: 60 } })
    return pages[0] || null
  } catch {
    return null
  }
}

async function getTeamMembers() {
  try {
    return await fetchWP<TeamMember[]>('/wwd/v1/cpt/team-members', { next: { revalidate: 60 } })
  } catch {
    return []
  }
}

export default async function TeamPage() {
  const [pageData, members] = await Promise.all([getTeamPageData(), getTeamMembers()])

  const heroTitle = pageData?.meta?._wwd_hero_hero_title || "Unser Team"
  const heroDesc = pageData?.meta?._wwd_hero_hero_description || "Die Menschen hinter dem U20 Poetry Slam Wien – Poet*innen, Organisator*innen und Kreativköpfe."

  // Fallback team members for when API/CPT is not set up yet
  const displayMembers = members.length > 0
    ? members.map(m => ({
        id: m.id,
        name: m.title.rendered,
        role: m.meta._wwd_role || "",
        description: m.meta._wwd_description || "",
        imageUrl: m.meta._wwd_image || undefined,
      }))
    : [
        { id: 1, name: "Team wird geladen", role: "Bitte WWD Plugin einrichten", description: "Teammitglieder werden über das WordPress Backend gepflegt.", imageUrl: undefined },
      ]

  return (
    <>
      <HeroSection
        title={heroTitle}
        description={heroDesc}
        align="center"
      />

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {displayMembers.map((member) => (
              <TeamCard
                key={member.id}
                id={member.id}
                name={member.name}
                role={member.role}
                description={member.description}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
