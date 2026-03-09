/**
 * Core WP Fetch Utility
 */
export async function fetchWP<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://u20poetryslam.at"

    // Ensure endpoint starts with /
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    const url = `${WP_URL}/wp-json${path}`

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        })

        if (!res.ok) {
            throw new Error(`WordPress API Error: ${res.statusText}`)
        }

        return res.json() as Promise<T>
    } catch (error) {
        console.error(`Failed to fetch from WP API: ${url}`, error)
        throw error // Bubble up to handle in components (e.g., show fallback/error state)
    }
}
