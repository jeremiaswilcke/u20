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
    const cleanExcerpt = excerpt.replace(/(<([^>]+)>)/gi, "")

    return (
        <Link href={`/news/${slug}`} className="block group">
            <Card className="h-full">
                <div className="relative w-full h-52 bg-slate-50 overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-u20-orange/10 to-u20-pink/10 flex items-center justify-center">
                            <span className="font-heading text-u20-orange/30 text-2xl">U20</span>
                        </div>
                    )}
                </div>
                <CardContent className="p-6">
                    <CardDescription className="mb-2 text-u20-orange font-medium tracking-wide text-xs uppercase">
                        {new Date(date).toLocaleDateString("de-AT", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })}
                    </CardDescription>
                    <CardTitle className="mb-3 group-hover:text-u20-orange transition-colors line-clamp-2 text-xl">
                        {title}
                    </CardTitle>
                    <p className="text-u20-gray line-clamp-3 text-sm leading-relaxed">
                        {cleanExcerpt}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
