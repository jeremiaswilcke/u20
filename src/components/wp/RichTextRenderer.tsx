interface RichTextRendererProps {
  html: string;
  className?: string;
}

export function RichTextRenderer({ html, className = "" }: RichTextRendererProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-display prose-a:text-[color:var(--u-magenta)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-[var(--u-radius-lg)] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
