"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "article" | "span" | "li" | "ol" | "ul";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  as = "div",
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return React.createElement(
    as,
    {
      ref,
      className: cn("reveal", className),
      ...props,
    },
    children
  );
}
