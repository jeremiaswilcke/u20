import type { IGPostNormalized } from "@/lib/instagram";

interface InstagramGridProps {
  posts: IGPostNormalized[];
}

export function InstagramGrid({ posts }: InstagramGridProps) {
  if (posts.length === 0) return null;

  return (
    <div className="ig-grid">
      {posts.map((post) => (
        <a
          key={post.id}
          className="ig-tile-real"
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          aria-label={post.caption.slice(0, 60) || "Instagram Post"}
        >
          <img
            src={post.imageUrl}
            alt={post.caption.slice(0, 100) || "U20 Poetry Slam Wien"}
            loading="lazy"
          />
          <div className="ig-overlay">
            {post.mediaType === "VIDEO" && (
              <span className="ig-video-badge">▶</span>
            )}
            {post.mediaType === "CAROUSEL_ALBUM" && (
              <span className="ig-carousel-badge">⊞</span>
            )}
            <span className="ig-caption">
              {post.caption.slice(0, 80) || ""}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
