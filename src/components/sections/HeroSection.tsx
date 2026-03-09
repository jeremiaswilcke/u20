import * as React from "react"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
    children?: React.ReactNode // For buttons/CTAs
    align?: "left" | "center"
}

export function HeroSection({
    title,
    description,
    children,
    align = "left",
    className,
    ...props
}: HeroSectionProps) {
    return (
        <section
            className={cn(
                "relative py-20 lg:py-32 overflow-hidden bg-white border-b border-slate-100",
                className
            )}
            {...props}
        >
            {/* Decorative Blob (Optional subtle design touch) */}
            <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-u20-50 rounded-l-full opacity-50 blur-3xl -z-10" />

            <Container>
                <div
                    className={cn(
                        "max-w-3xl flex flex-col gap-6",
                        align === "center" ? "mx-auto text-center items-center" : ""
                    )}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl text-balance">
                            {description}
                        </p>
                    )}

                    {children && (
                        <div
                            className={cn(
                                "mt-4 flex flex-wrap gap-4",
                                align === "center" ? "justify-center" : "justify-start"
                            )}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    )
}
