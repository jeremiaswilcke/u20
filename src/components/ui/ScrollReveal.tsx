"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right"
}

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("opacity-100", "translate-y-0", "translate-x-0")
            el.classList.remove(
              "opacity-0",
              direction === "up" ? "translate-y-8" : "",
              direction === "left" ? "translate-x-8" : "",
              direction === "right" ? "-translate-x-8" : ""
            )
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out opacity-0",
        direction === "up" && "translate-y-8",
        direction === "left" && "translate-x-8",
        direction === "right" && "-translate-x-8",
        className
      )}
    >
      {children}
    </div>
  )
}
