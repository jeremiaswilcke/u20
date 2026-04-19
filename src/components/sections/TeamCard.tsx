interface TeamCardProps {
  name: string;
  role: string;
  description?: string;
  image?: string;
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

export function TeamCard({ name, role, description, image }: TeamCardProps) {
  return (
    <article className="team-card">
      <div className="team-photo">
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span className="initials">{getInitials(name)}</span>
        )}
      </div>
      <div className="team-info">
        <h3>{name}</h3>
        <div className="role">{role}</div>
        {description && <p className="bio">{description}</p>}
      </div>
    </article>
  );
}
