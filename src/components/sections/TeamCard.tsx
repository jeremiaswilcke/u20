interface TeamCardProps {
  name: string;
  role: string;
  description?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamCard({ name, role, description }: TeamCardProps) {
  return (
    <article className="team-card">
      <div className="team-photo">
        <span className="initials">{getInitials(name)}</span>
        <span className="ph-cap">Foto: {name}</span>
      </div>
      <div className="team-info">
        <h3>{name}</h3>
        <div className="role">{role}</div>
        {description && <p className="bio">{description}</p>}
      </div>
    </article>
  );
}
