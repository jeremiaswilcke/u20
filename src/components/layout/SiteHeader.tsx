"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Veranstaltungen", href: "/veranstaltungen" },
  { label: "schreib' KLASSE!", href: "/schreib-klasse" },
  { label: "Für Lehrer:innen", href: "/lehrer" },
  { label: "Unser Team", href: "/team" },
  { label: "Medien", href: "/medien" },
  { label: "FAQ", href: "/faq" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}
    >
      <div className="container-u nav-inner">
        <BrandLogo />
        <nav className="nav-links" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="nav-cta" href="/#anmeldung">
          Jetzt anmelden
        </Link>
        <button
          className="nav-toggle"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Menü
        </button>
      </div>
    </header>
  );
}
