import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "accent" | "purple"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                {
                    "border-transparent bg-u20-orange text-white": variant === "default",
                    "border-transparent bg-slate-100 text-u20-gray": variant === "secondary",
                    "border-u20-gray/20 text-u20-gray": variant === "outline",
                    "border-transparent bg-u20-pink text-white": variant === "accent",
                    "border-transparent bg-u20-purple text-white": variant === "purple",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
