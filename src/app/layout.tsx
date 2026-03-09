import type { Metadata } from "next";
import { Righteous, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "U20 Poetry Slam Wien",
    template: "%s | U20 Poetry Slam Wien",
  },
  description:
    "Poetry Slam von und mit der jungen Generation in Wien. Kreativ, laut, lebendig und auf den Punkt.",
  openGraph: {
    title: "U20 Poetry Slam Wien",
    description: "Poetry Slam von und mit der jungen Generation in Wien.",
    type: "website",
    locale: "de_AT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${righteous.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
