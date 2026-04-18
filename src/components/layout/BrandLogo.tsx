import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  href?: string;
}

export function BrandLogo({ className, href = "/" }: BrandLogoProps) {
  return (
    <Link
      className={`brand ${className ?? ""}`.trim()}
      href={href}
      aria-label="U20 Poetry Slam Wien"
    >
      <span className="b-u20">U20</span>
      <span className="b-mic" aria-hidden="true">
        <svg viewBox="0 0 32 36">
          <g
            fill="none"
            stroke="#E11A7C"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="16" cy="11" r="9" />
            <path d="M16 20v9" />
            <path d="M9 29h14" />
            <circle cx="16" cy="11" r="3" fill="#E11A7C" />
          </g>
        </svg>
      </span>
      <span className="b-stack">
        <span className="b-poetryslam">PoetrySlam</span>
        <span className="b-wien">Wien</span>
      </span>
    </Link>
  );
}
