import Link from "next/link"
import { Card, CardContent } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { MapPin, Clock } from "lucide-react"

interface EventCardProps {
    id: number
    title: string
    startDate: string
    venue?: string
    excerpt?: string
    slug: string
    isFeatured?: boolean
}

export function EventCard({
    title,
    startDate,
    venue,
    excerpt,
    slug,
    isFeatured
}: EventCardProps) {
    const dateObj = new Date(startDate)
    const day = dateObj.toLocaleDateString("de-AT", { day: "2-digit" })
    const month = dateObj.toLocaleDateString("de-AT", { month: "short" })
    const time = dateObj.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })

    const cleanExcerpt = excerpt ? excerpt.replace(/(<([^>]+)>)/gi, "") : ""

    return (
        <Link href={`/veranstaltungen/${slug}`} className="block group">
            <Card className={`h-full flex flex-col md:flex-row overflow-hidden ${isFeatured ? 'ring-2 ring-u20-orange' : ''}`}>

                {/* Date block */}
                <div className="bg-u20-orange/5 text-u20-orange md:w-32 flex flex-col items-center justify-center py-6 px-4 border-b md:border-b-0 md:border-r border-slate-100 group-hover:bg-u20-orange group-hover:text-white transition-colors duration-300">
                    <span className="text-4xl font-bold font-heading">{day}.</span>
                    <span className="text-lg font-medium">{month}</span>
                </div>

                {/* Content block */}
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-u20-gray-dark font-heading group-hover:text-u20-orange transition-colors">
                            {title}
                        </h3>
                        {isFeatured && <Badge variant="accent">Tipp</Badge>}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-u20-gray-light mb-3">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {time} Uhr
                        </span>
                        {venue && (
                            <span className="flex items-center gap-1.5 line-clamp-1">
                                <MapPin className="w-4 h-4" />
                                {venue}
                            </span>
                        )}
                    </div>

                    {cleanExcerpt && (
                        <p className="text-u20-gray line-clamp-2 text-sm">
                            {cleanExcerpt}
                        </p>
                    )}
                </CardContent>

            </Card>
        </Link>
    )
}
