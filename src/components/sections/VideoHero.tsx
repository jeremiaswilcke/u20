"use client"

import { Container } from "../layout/Container"

interface VideoHeroProps {
  title: string
  description?: string
  videoUrl?: string
  posterUrl?: string
  children?: React.ReactNode
}

export function VideoHero({ title, description, videoUrl, posterUrl, children }: VideoHeroProps) {
  const fallbackVideo = "/hero-bg.mp4"

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl || undefined}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl || fallbackVideo} type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32">
        <div className="max-w-2xl">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10 max-w-xl">
              {description}
            </p>
          )}

          {children && (
            <div className="flex flex-wrap gap-4">
              {children}
            </div>
          )}
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
