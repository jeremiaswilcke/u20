import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "outline" | "ghost" | "link" | "accent" | "white"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-u20-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-u20-orange text-white hover:bg-u20-orange-dark shadow-lg shadow-u20-orange/25 hover:shadow-xl hover:shadow-u20-orange/30": variant === "default",
                        "bg-u20-pink text-white hover:bg-u20-pink-dark shadow-lg shadow-u20-pink/25": variant === "accent",
                        "border-2 border-u20-gray/20 bg-transparent hover:bg-u20-gray/5 text-u20-gray": variant === "outline",
                        "hover:bg-u20-gray/5 text-u20-gray": variant === "ghost",
                        "text-u20-orange underline-offset-4 hover:underline": variant === "link",
                        "bg-white text-u20-gray hover:bg-white/90 shadow-lg": variant === "white",
                        "h-10 px-6 py-2": size === "default",
                        "h-9 px-4": size === "sm",
                        "h-12 px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
