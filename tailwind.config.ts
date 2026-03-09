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
                    50: "#f2f8fd",
                    100: "#e3effa",
                    200: "#c0ddf3",
                    300: "#8ac3ea",
                    400: "#4fa3df",
                    500: "#2b86c7",
                    600: "#1f69a6",
                    700: "#1a5486",
                    800: "#174770",
                    900: "#173c5d",
                    primary: "#2b86c7",
                    accent: "#e11d48",
                },
            },
            fontFamily: {
                sans: ["var(--font-righteous)", "sans-serif"],
                body: ["var(--font-inter)", "system-ui", "sans-serif"],
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
                slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out forwards",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
} satisfies Config;
