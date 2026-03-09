"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "../ui/Button"

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "schreib\u2019 KLASSE!", href: "/schreib-klasse" },
    { label: "Veranstaltungen", href: "/veranstaltungen" },
    { label: "News", href: "/news" },
    { label: "Team", href: "/team" },
    { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 transition-all duration-300 ${
                scrolled ? "shadow-md" : ""
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo — generous spacing */}
                    <Link href="/" className="flex-shrink-0 mr-8 lg:mr-12">
                        <Image
                            src="/u20logo.png"
                            alt="U20 Poetry Slam Wien"
                            width={180}
                            height={60}
                            className="object-contain h-14 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 flex-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                                    pathname === item.href
                                        ? "text-u20-orange bg-u20-orange/10"
                                        : "text-u20-gray hover:text-u20-orange hover:bg-u20-orange/5"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center ml-6">
                        <Button asChild variant="default" size="sm">
                            <Link href="/kontakt">Mitmachen</Link>
                        </Button>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <button
                        className="lg:hidden p-2 text-u20-gray hover:text-u20-orange transition-colors rounded-full hover:bg-u20-orange/5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium py-3 px-4 rounded-xl transition-all ${
                                    pathname === item.href
                                        ? "text-u20-orange bg-u20-orange/10"
                                        : "text-u20-gray hover:text-u20-orange hover:bg-u20-orange/5"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Button asChild variant="default" className="mt-4 w-full">
                            <Link
                                href="/kontakt"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Mitmachen
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
