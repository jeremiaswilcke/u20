import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                u20: {
                    orange: "#FF9900",
                    "orange-light": "#FFB84D",
                    "orange-dark": "#E08700",
                    pink: "#D6165F",
                    "pink-light": "#E84A85",
                    "pink-dark": "#B01250",
                    purple: "#800080",
                    "purple-light": "#A030A0",
                    "purple-dark": "#600060",
                    gray: "#4D4D4D",
                    "gray-light": "#6B6B6B",
                    "gray-dark": "#333333",
                },
            },
            fontFamily: {
                heading: ["var(--font-righteous)", "sans-serif"],
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "4rem",
                    xl: "5rem",
                },
            },
            keyframes: {
                fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                slideUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
                slideLeft: { "0%": { opacity: "0", transform: "translateX(30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.7s ease-out forwards",
                "slide-left": "slideLeft 0.7s ease-out forwards",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
} satisfies Config;
