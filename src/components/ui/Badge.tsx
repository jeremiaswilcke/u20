import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "accent"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-u20-primary text-white hover:bg-u20-600": variant === "default",
                    "border-transparent bg-slate-100 text-foreground hover:bg-slate-200": variant === "secondary",
                    "text-foreground": variant === "outline",
                    "border-transparent bg-u20-accent text-white hover:bg-rose-700": variant === "accent",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
