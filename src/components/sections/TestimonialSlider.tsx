"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  quote: string
  source: string
  role?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "F\u00fcr viele war es der erste Kontakt mit dieser Form von Literatur, doch bei allen hinterlie\u00df sie einen bleibenden Eindruck. Schon hier konnte die Begeisterung f\u00fcr dieses Genre geweckt werden.",
    source: "hak:zwei, Handelsakademie",
    role: "Salzburg",
  },
  {
    quote: "Da kommt sie gerade zur rechten Zeit, Adina Wilcke. Die Bronze-Gewinnerin bei den \u00d6sterreichischen Meisterschaften des Jahres 2014 stimmt uns mit lockeren Aufw\u00e4rm\u00fcbungen auf einen Vormittag ein, der das Ziel hat, das kreative Potenzial in uns zu entdecken, zu erwecken.",
    source: "Europa-Gymnasium Leoben",
    role: "Steiermark",
  },
  {
    quote: "Als die wahren Stars des Abends wurden jene Mutigen gefeiert, die zum Abschluss ihre gerade erst frisch geschriebenen Poetry Slams performten. Von einem Slam \u00fcber Demokratie aus der Sicht des Parlamentsgeb\u00e4udes bis hin zu Nachdenklichem \u00fcber die Verg\u00e4nglichkeit der Welt war alles dabei.",
    source: "Erzdi\u00f6zese Wien",
    role: "Schulbericht",
  },
]

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const next = useCallback(() => {
    goTo((current + 1) % TESTIMONIALS.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [current, goTo])

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [next])

  const testimonial = TESTIMONIALS[current]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Quote icon */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-u20-orange to-u20-pink flex items-center justify-center">
          <Quote className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Quote content */}
      <div className="min-h-[200px] flex items-center justify-center">
        <div
          key={current}
          className="text-center animate-fade-in"
        >
          <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed text-u20-gray-dark font-light italic mb-8 px-4">
            &bdquo;{testimonial.quote}&ldquo;
          </blockquote>
          <div>
            <p className="font-heading text-lg text-u20-orange font-bold">
              {testimonial.source}
            </p>
            {testimonial.role && (
              <p className="text-u20-gray-light text-sm mt-1">
                {testimonial.role}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-u20-gray-light hover:text-u20-orange hover:border-u20-orange transition-all"
          aria-label="Vorheriges Zitat"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-u20-orange"
                  : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Zitat ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-u20-gray-light hover:text-u20-orange hover:border-u20-orange transition-all"
          aria-label="Nächstes Zitat"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
