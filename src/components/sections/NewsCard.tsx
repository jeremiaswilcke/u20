import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "../ui/Card"

interface NewsCardProps {
    id: number
    title: string
    date: string
    excerpt: string
    imageUrl?: string
    slug: string
}

export function NewsCard({ title, date, excerpt, imageUrl, slug }: NewsCardProps) {
    // Strip HTML from excerpt if it comes raw from WP
    const cleanExcerpt = excerpt.replace(/(<([^>]+)>)/gi, "")

    return (
        <Link href={`/news/${slug}`} className="block group">
            <Card className="h-full border-transparent shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-sans text-xl">
                            U20 News
                        </div>
                    )}
                </div>
                <CardContent className="p-6">
                    <CardDescription className="mb-2 text-u20-primary font-medium tracking-wide">
                        {new Date(date).toLocaleDateString("de-AT", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })}
                    </CardDescription>
                    <CardTitle className="mb-3 group-hover:text-u20-primary transition-colors line-clamp-2 text-xl">
                        {title}
                    </CardTitle>
                    <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed">
                        {cleanExcerpt}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
