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
                u: {
                    magenta: "#E11A7C",
                    "magenta-2": "#C71468",
                    orange: "#F39019",
                    "orange-2": "#E07E0C",
                    yellow: "#F6D94A",
                    purple: "#7A2A86",
                    ink: "#1A1A1A",
                    "ink-soft": "#3A3A3A",
                    paper: "#FFFBF2",
                    "paper-2": "#F6F1E5",
                    bg: "#FFFFFF",
                    mute: "rgba(26,26,26,0.6)",
                    line: "rgba(26,26,26,0.14)",
                },
            },
            fontFamily: {
                display: ["var(--font-archivo-black)", "Arial Black", "system-ui", "sans-serif"],
                sans: ["var(--font-archivo)", "system-ui", "-apple-system", "sans-serif"],
                hand: ["var(--font-caveat)", "cursive"],
                mono: ["var(--font-space-mono)", "Courier New", "monospace"],
            },
            borderRadius: {
                u: "14px",
                "u-lg": "22px",
            },
            boxShadow: {
                "u-sm": "0 6px 18px -8px rgba(26,26,26,0.25)",
                "u-md": "0 16px 40px -16px rgba(26,26,26,0.28)",
            },
            maxWidth: {
                "u-container": "78rem",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1.25rem",
                    sm: "2rem",
                    lg: "2.5rem",
                },
                screens: {
                    "2xl": "78rem",
                },
            },
            keyframes: {
                fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                slideUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
                slideLeft: { "0%": { opacity: "0", transform: "translateX(30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
                uPulse: {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
                    "50%": { transform: "scale(1.03)", opacity: "1" },
                },
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.7s ease-out forwards",
                "slide-left": "slideLeft 0.7s ease-out forwards",
                "u-pulse": "uPulse 6s ease-in-out infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
} satisfies Config;
