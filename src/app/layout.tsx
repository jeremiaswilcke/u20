import type { Metadata } from "next";
import { Archivo, Archivo_Black, Caveat, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "U20 Poetry Slam Wien",
    template: "%s | U20 Poetry Slam Wien",
  },
  description:
    "Poetry Slam für alle unter 20 in Wien. Monatlich im DSCHUNGEL Wien — Bühne, Bewerb, Workshop. Für Slammer:innen, Publikum und Schulen.",
  openGraph: {
    title: "U20 Poetry Slam Wien",
    description:
      "Poetry Slam für alle unter 20 in Wien. Monatlich im DSCHUNGEL Wien.",
    type: "website",
    locale: "de_AT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    archivo.variable,
    archivoBlack.variable,
    caveat.variable,
    spaceMono.variable,
  ].join(" ");

  return (
    <html lang="de-AT" className="scroll-smooth">
      <body
        className={`${fontVars} font-sans antialiased flex flex-col min-h-screen bg-u-bg text-u-ink`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
