import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Decode HTML entities from WordPress API responses
 */
export function decodeHtmlEntities(text: string): string {
    if (!text) return ""
    return text
        .replace(/&#(\d+);/g, (_match, dec) => String.fromCharCode(dec))
        .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&rsquo;/g, "\u2019")
        .replace(/&lsquo;/g, "\u2018")
        .replace(/&rdquo;/g, "\u201D")
        .replace(/&ldquo;/g, "\u201C")
        .replace(/&ndash;/g, "\u2013")
        .replace(/&mdash;/g, "\u2014")
}

/**
 * Strip HTML tags and decode entities
 */
export function stripHtml(html: string): string {
    return decodeHtmlEntities(html.replace(/(<([^>]+)>)/gi, ""))
}
