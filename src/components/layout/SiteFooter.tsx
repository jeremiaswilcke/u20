import Link from "next/link"
import Image from "next/image"
import { Container } from "./Container"

export function SiteFooter() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 mt-auto">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

                    {/* Logo & Intro */}
                    <div className="md:col-span-1 flex flex-col">
                        <Link href="/" className="mb-6 inline-block bg-white p-2 rounded-md max-w-[170px]">
                            <Image
                                src="/u20logo.png"
                                alt="U20 Poetry Slam Wien Logo"
                                width={150}
                                height={50}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm text-slate-400">
                            Poetry Slam von und mit der jungen Generation in Wien. Kreativ, laut, lebendig und auf den Punkt.
                        </p>
                    </div>

                    {/* Links: Formate */}
                    <div>
                        <h4 className="text-white font-sans font-semibold mb-4 text-lg">Formate</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/schreib-klasse" className="hover:text-white transition-colors">schreib&apos; KLASSE!</Link>
                            </li>
                            <li>
                                <Link href="/veranstaltungen" className="hover:text-white transition-colors">U20 Poetry Slams</Link>
                            </li>
                            <li>
                                <Link href="/veranstaltungen" className="hover:text-white transition-colors">Open List</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Infos */}
                    <div>
                        <h4 className="text-white font-sans font-semibold mb-4 text-lg">Infos</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/news" className="hover:text-white transition-colors">Neuigkeiten</Link>
                            </li>
                            <li>
                                <Link href="/team" className="hover:text-white transition-colors">Über uns / Team</Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-white font-sans font-semibold mb-4 text-lg">Kontakt</h4>
                        <p className="text-sm mb-4">
                            Hast du Fragen oder möchtest du auftreten?
                        </p>
                        <a
                            href="mailto:hallo@u20poetryslam.at"
                            className="text-u20-primary hover:text-u20-300 transition-colors font-medium"
                        >
                            hallo@u20poetryslam.at
                        </a>

                        {/* Very basic socials placeholder */}
                        <div className="mt-8 flex gap-4">
                            <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-u20-primary hover:text-white transition-colors">
                                {/* IG Icon placeholder */}
                                <span className="sr-only">Instagram</span>
                                IG
                            </a>
                            <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-u20-primary hover:text-white transition-colors">
                                {/* FB Icon placeholder */}
                                <span className="sr-only">Facebook</span>
                                FB
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center text-slate-500">
                    <p>© {new Date().getFullYear()} U20 Poetry Slam Wien. Alle Rechte vorbehalten.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                        <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
