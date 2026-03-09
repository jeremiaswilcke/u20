"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Container } from "./Container"
import { Button } from "../ui/Button"

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "schreib' KLASSE!", href: "/schreib-klasse" },
    { label: "Veranstaltungen", href: "/veranstaltungen" },
    { label: "News", href: "/news" },
    { label: "Team", href: "/team" },
    { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    // Subtler border when scrolled (optional enhancement)
    const [scrolled, setScrolled] = React.useState(false)
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200 ${scrolled ? "border-b border-slate-200 shadow-sm" : ""
                }`}
        >
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/u20logo.png"
                                alt="U20 Poetry Slam Wien Logo"
                                width={150}
                                height={50}
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-u20-primary ${pathname === item.href
                                        ? "text-u20-primary"
                                        : "text-slate-600"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Button asChild variant="default" size="sm" className="ml-4">
                            <Link href="/kontakt">Mitmachen</Link>
                        </Button>
                    </nav>

                    {/* Mobile Nav Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-u20-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </Container>

            {/* Mobile Nav Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-b border-slate-200 bg-white">
                    <Container className="py-4 flex flex-col gap-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium py-2 transition-colors ${pathname === item.href
                                        ? "text-u20-primary"
                                        : "text-slate-600 hover:text-u20-primary"
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
                    </Container>
                </div>
            )}
        </header>
    )
}
