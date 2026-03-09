import Link from "next/link"
import Image from "next/image"
import { Container } from "./Container"

export function SiteFooter() {
    return (
        <footer className="bg-u20-gray-dark text-slate-300 py-16 md:py-20 mt-auto">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

                    {/* Logo & Intro */}
                    <div className="md:col-span-1 flex flex-col">
                        <Link href="/" className="mb-6 inline-block bg-white p-3 rounded-xl max-w-[180px]">
                            <Image
                                src="/u20logo.png"
                                alt="U20 Poetry Slam Wien"
                                width={160}
                                height={55}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Poetry Slam von und mit der jungen Generation in Wien. Kreativ, laut, lebendig und auf den Punkt.
                        </p>
                    </div>

                    {/* Links: Formate */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-5 text-lg">Formate</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/schreib-klasse" className="hover:text-u20-orange transition-colors">schreib&apos; KLASSE!</Link>
                            </li>
                            <li>
                                <Link href="/veranstaltungen" className="hover:text-u20-orange transition-colors">U20 Poetry Slams</Link>
                            </li>
                            <li>
                                <Link href="/veranstaltungen" className="hover:text-u20-orange transition-colors">Open List</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Infos */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-5 text-lg">Infos</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/news" className="hover:text-u20-orange transition-colors">Neuigkeiten</Link>
                            </li>
                            <li>
                                <Link href="/team" className="hover:text-u20-orange transition-colors">Über uns / Team</Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="hover:text-u20-orange transition-colors">Kontakt</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-5 text-lg">Kontakt</h4>
                        <p className="text-sm mb-4">
                            Hast du Fragen oder möchtest du auftreten?
                        </p>
                        <a
                            href="mailto:hallo@u20poetryslam.at"
                            className="text-u20-orange hover:text-u20-orange-light transition-colors font-medium"
                        >
                            hallo@u20poetryslam.at
                        </a>

                        <div className="mt-8 flex gap-3">
                            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-u20-orange hover:text-white transition-all text-sm font-medium">
                                <span className="sr-only">Instagram</span>
                                IG
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-u20-pink hover:text-white transition-all text-sm font-medium">
                                <span className="sr-only">Facebook</span>
                                FB
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-sm flex flex-col md:flex-row justify-between items-center text-slate-500">
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
