import Image from "next/image"
import { Card, CardContent } from "../ui/Card"

interface TeamCardProps {
    id: number
    name: string
    role: string
    description?: string
    imageUrl?: string
}

export function TeamCard({ name, role, description, imageUrl }: TeamCardProps) {
    return (
        <Card className="h-full text-center flex flex-col items-center p-8 group">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 ring-slate-50 group-hover:ring-u20-orange/20 transition-all duration-300">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-u20-orange/20 to-u20-pink/20 flex items-center justify-center">
                        <span className="font-heading text-u20-orange text-3xl">{name.charAt(0)}</span>
                    </div>
                )}
            </div>

            <CardContent className="p-0 flex flex-col flex-1 w-full text-center">
                <h3 className="text-2xl font-bold text-u20-gray-dark mb-1 font-heading">
                    {name}
                </h3>
                <p className="text-u20-orange font-medium mb-4 text-sm tracking-wide uppercase">
                    {role}
                </p>
                {description && (
                    <p className="text-u20-gray text-sm leading-relaxed mt-auto">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
