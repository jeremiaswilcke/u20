interface RichTextRendererProps {
  html: string
  className?: string
}

export function RichTextRenderer({ html, className = "" }: RichTextRendererProps) {
  return (
    <div
      className={`prose prose-slate prose-lg max-w-none prose-headings:font-sans prose-a:text-u20-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
