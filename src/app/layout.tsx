import type { Metadata } from "next";
import { Righteous, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
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
    righteous.variable,
    inter.variable,
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
