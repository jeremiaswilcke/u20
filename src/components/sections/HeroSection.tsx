import * as React from "react"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
    children?: React.ReactNode
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
                "relative py-24 lg:py-36 overflow-hidden bg-white",
                className
            )}
            {...props}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-gradient-to-l from-u20-orange/5 to-transparent rounded-l-full -z-10" />
            <div className="absolute bottom-0 left-[-5%] w-[25%] h-[50%] bg-gradient-to-tr from-u20-pink/5 to-transparent rounded-full -z-10" />

            <Container>
                <div
                    className={cn(
                        "max-w-3xl flex flex-col gap-6",
                        align === "center" ? "mx-auto text-center items-center" : ""
                    )}
                >
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-u20-gray-dark">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-lg md:text-xl text-u20-gray-light leading-relaxed max-w-2xl text-balance">
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
