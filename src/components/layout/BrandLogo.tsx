import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  href?: string;
  invert?: boolean;
}

export function BrandLogo({ className, href = "/", invert }: BrandLogoProps) {
  return (
    <Link
      className={`brand ${className ?? ""}`.trim()}
      href={href}
      aria-label="U20 Poetry Slam Wien"
    >
      <img
        src="/u20logo.png"
        alt="U20 Poetry Slam Wien"
        className="brand-logo"
        style={invert ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}
